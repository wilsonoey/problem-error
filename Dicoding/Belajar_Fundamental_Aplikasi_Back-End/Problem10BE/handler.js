const { customAlphabet, nanoid } = require('nanoid');
const {
  clienterror,
  notfound,
  servererror,
  successwithdata,
  success,
  successcreated,
  successcreatedwithdata,
  authenticationerror,
  authorizationerror,
  successwithdataANDcount,
} = require('./response');
const bcrypt = require('bcryptjs');
const connection = require('./connection');
const TokenManager = require('./tokenmanager');
const partAuth = require('./authuser');
const variable = require('./variable');
const Path = require('path');
const Fs = require('fs').promises;
const fs = require('fs');
const { senderror } = require('./senderror');
let fsString;

async function loginUser(request, h) {
  try {
    const { emailuser, passworduser } = request.payload;
    const query = 'SELECT * FROM userskad WHERE emailuser = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, emailuser, async function(error, results) {
        if (error) reject(error);
        if (results.length > 0) {
          const user = results[0];
          const isValid = await bcrypt.compare(passworduser, user.passworduser);
          if (isValid) {
            const accessToken = TokenManager.generateAccessToken({
              iduser: user.iduser,
              emailuser: user.emailuser,
              passworduser: user.passworduser,
            });
            const refreshToken = TokenManager.generateRefreshToken({
              iduser: user.iduser,
              emailuser: user.emailuser,
              passworduser: user.passworduser,
            });
            await partAuth.addToken(refreshToken);
            resolve(h.response(
              successcreatedwithdata('Login berhasil', {accessToken, refreshToken})
            ).code(201));
          } else resolve(h.response(authenticationerror('Password Salah')).code(401));
        } else {
          resolve(h.response(
            clienterror('Email tidak ditemukan. Silakan registrasi terlebih dahulu.')
          ).code(400));
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "loginUser");
  }
}

async function registerUser(request, h) {
  try {
    const addOtherPayload = { ...request.payload };
    const id = customAlphabet('1234567890', 15);
    const hashPassword = await bcrypt.hash(addOtherPayload.passworduser, 10);
    const createdat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = {
      iduser: id(),
      ...request.payload,
      passworduser: hashPassword,
      createdatuser: createdat,
      updatedatuser: createdat,
    };
    const querychecker = 'SELECT * FROM userskad WHERE phoneuser = ? OR emailuser = ? OR username = ?';
    return new Promise((resolve, reject) => {
      connection.query(querychecker, [
        addOtherPayload.phoneuser, addOtherPayload.emailuser, addOtherPayload.username,
      ], async function(errorchecker, resultschecker) {
        const userchecker = resultschecker[0];
        if (errorchecker) { reject(errorchecker) } else {
          if (resultschecker.length > 0) {
            if (userchecker.phoneuser == addOtherPayload.phoneuser) {
              resolve(h.response(
                clienterror('Nomor ponsel sudah ada. Silakan hubungi admin untuk bantuan.')
              ).code(400));
            } else if (userchecker.emailuser == addOtherPayload.emailuser) {
              resolve(h.response(
                clienterror('Email sudah ada. Silakan hubungi admin untuk bantuan.')
              ).code(400));
            } else if (userchecker.username == addOtherPayload.username) {
              resolve(h.response(
                clienterror('Username sudah ada. Gunakan username yang lain.')
              ).code(400));
            } 
          } else if (resultschecker.length === 0) {
            if ((addOtherPayload.username || addOtherPayload.emailuser) == null) {
              resolve(h.response(
                clienterror('Username atau email tidak boleh kosong.')
              ).code(400));
			} else {
              const query = 'INSERT INTO userskad SET ?';
              connection.query(query, data, () => {
                resolve(h.response(
                  successcreated(`User berhasil ditambahkan dengan iduser ${data.iduser}`)
                ).code(201));
              });
			}
            
          }
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "registerUser");
  }
}

async function getuserme(request, h) {
  try {
    const verificator = request.auth.credentials;
    const query = 'SELECT * FROM userskad WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, verificator.iduser, (error, results) => error ? reject(error) : (
        results.length === 0 ? resolve(
          h.response(notfound('User tidak ditemukan')).code(404)
        ) : resolve(h.response(
          successwithdata('User berhasil ditampilkan', results[0])
        ).code(200))
      ));
    });
  } catch (error) {
    senderror(request, h, error, "getuserme");
  }
}

async function editUser(request, h) {
  try {
    const verificator = request.auth.credentials;
    const addOtherPayload = { ...request.payload };
    const hashPassword = await bcrypt.hash(addOtherPayload.passworduser, 10);
    const updatedat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = {
      ...request.payload,
      passworduser: hashPassword,
      updatedatuser: updatedat,
    };
    const checkiduser = 'SELECT * FROM userskad WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.query(checkiduser, verificator.iduser, async (erroriduser, resultsiduser) => {
        const userchecker = resultsiduser[0];
        if (resultsiduser.length === 0) {
          resolve(h.response(notfound('User tidak ditemukan')).code(404));
        } else {
          let searchquery = 'SELECT * FROM userskad WHERE';
          const queryvalues = [];
          let lengthquery = 0;
          for (const [keyquery, valuequery] of Object.entries(data)) {
            if (['username', 'emailuser', 'phoneuser'].includes(keyquery) &&
            valuequery !== null && valuequery !== undefined) {
              if (lengthquery > 0) {
                searchquery += ' OR';
              }
              searchquery += ` \`${keyquery}\` = ?`;
              queryvalues.push(valuequery);
              lengthquery++;
            };
          };
          connection.query(searchquery, queryvalues, async (errorsearch, resultssearch) => {
            if (resultssearch.length === 0) {
              let updateQuery = 'UPDATE userskad SET';
              const values = [];
              let lengthupdate = 0;
              for (const [key, value] of Object.entries(data)) {
                if (value !== null && value !== undefined) {
                  if (lengthupdate > 0) {
                    updateQuery += ',';
                  }
                  updateQuery += ` \`${key}\` = ?`;
                  values.push(value);
                  lengthupdate++;
                }
              }
              updateQuery += ' WHERE iduser = ?';
              values.push(verificator.iduser);
              if ((data.passworduser !== verificator.passworduser)
                  || (data.emailuser !== verificator.emailuser)) {
                await partAuth.deleteToken(verify);
                connection.query(updateQuery, values, async (error, results) => {
                  if (error) { reject(error) } else {
                    const accessToken = TokenManager.generateAccessToken({
                      iduser: userchecker.iduser,
                      emailuser: addOtherPayload.emailuser,
                      passworduser: addOtherPayload.passworduser,
                    });
                    const refreshToken = TokenManager.generateRefreshToken({
                      iduser: userchecker.iduser,
                      emailuser: addOtherPayload.emailuser,
                      passworduser: addOtherPayload.passworduser,
                    });
                    await partAuth.addToken(refreshToken);
                    resolve(h.response(
                      successcreatedwithdata('User dan token berhasil diupdate', {accessToken, refreshToken})
                    ).code(200));
                  }
                });
              } else if (((data.passworduser === verificator.passworduser)
                          && (data.emailuser === verificator.emailuser))
                          || ((data.passworduser === verificator.passworduser)
                          || (data.emailuser === verificator.emailuser))) {
                connection.query(updateQuery, values, (error) => error ? reject(error) : (
                  resolve(h.response(success('User berhasil diupdate')).code(200))
                ));
              }
            } else if (resultssearch.length > 0) {
              if (resultssearch[0].phoneuser == addOtherPayload.phoneuser) {
                resolve(h.response(
                  clienterror('Nomor ponsel sudah ada. Silakan hubungi admin untuk bantuan.')
                ).code(400));
              } else if (resultssearch[0].emailuser == addOtherPayload.emailuser) {
                resolve(h.response(
                  clienterror('Email sudah ada. Silakan hubungi admin untuk bantuan.')
                ).code(400));
              } else if (resultssearch[0].username == addOtherPayload.username) {
                resolve(h.response(clienterror('Gunakan username yang lain.')).code(400));
              } 
            }
          });
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "editUser");
  }
}

async function deleteUser(request, h) {
  try {
    const verificator = request.auth.credentials;
    const query = 'DELETE FROM userskad WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, verificator.iduser, (error, results) => (error ? reject(error) : (
        results.affectedRows === 0 ? resolve(h.response(
          notfound('User tidak ditemukan')
        ).code(404)) : resolve(h.response(success('User berhasil dihapus')).code(200))
      )));
    });
  } catch (error) {
    senderror(request, h, error, "deleteUser");
  }
}

async function logoutuser(request, h) {
  try {
    const verify = request.state.refreshToken;
    if (verify === undefined) {
      return h.response(
        clienterror('Token tidak ditemukan. Silakan login terlebih dahulu')
      ).code(400);
    } else {
      return await partAuth.deleteToken(verify).then((results) => {
        if (results.affectedRows > 0) {
          return h.response(success('Logout berhasil')).code(200);
        } else {
          return h.response(clienterror('Logout gagal')).code(400);
        }
      });
    }
  } catch (error) {
    senderror(request, h, error, "logoutUser");
  }
}

async function dashboarduser(request, h) {
  try {
    // const verify = request.state.refreshToken;
    // const verificator = TokenManager.verifyRefreshToken(verify);
    const verificator = request.auth.credentials;
    const selectuser = 'SELECT userskad.username, userskad.avataruser, serviceskad.* FROM userskad';
    const query = `${selectuser} LEFT JOIN serviceskad ON userskad.iduser = serviceskad.iduser WHERE userskad.iduser = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, verificator.iduser, async(error, results) => {
        if (results && results.length > 0) {
          const myServices = {
            iduser: results[0].iduser,
            avataruser: results[0].avataruser,
            username: results[0].username,
            services: results.map((row) => ({
              idservice: row.idservice,
              nameservice: row.nameservice,
              avatarservice: row.avatarservice,
              descriptionservice: row.descriptionservice,
              categoryservice: row.categoryservice,
              areaservice: row.areaservice,
              contactservice: row.contactservice,
              statusservice: row.statusservice,
              createdatservice: row.createdatservice,
              updatedatservice: row.updatedatservice,
            })),
          };
          resolve(h.response(successwithdataANDcount(
            results.length, 'Dashboard berhasil ditampilkan', myServices
          )).code(200));
        } else {
          resolve(h.response(notfound('Dashboard tidak ditemukan')).code(404));
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "dashboarduser");
  }
}

async function addservicebyuser(request, h) {
  try {
    // const verify = request.state.refreshToken;
    // const verificator = TokenManager.verifyRefreshToken(verify);
    const verificator = request.auth.credentials;
    const selectediduserchecker = 'SELECT * FROM userskad WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectediduserchecker, verificator.iduser, async(errorchecker, resultschecker) => {
        if (errorchecker) reject(errorchecker);
        const user = resultschecker[0];
        const idservice = nanoid(50);
        const createdat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const data = {
          idservice: idservice,
          iduser: verificator.iduser,
          ...request.payload,
          createdatservice: createdat,
          updatedatservice: createdat,
        };
        const query = 'INSERT INTO serviceskad SET ?';
        if (verificator.iduser === undefined) {
          resolve(h.response(
            authorizationerror('User tidak memiliki akses untuk menambahkan layanan jasa')
          ).code(403));
        } else {
          connection.query(query, data, (error, results) => error ? reject(error) : (
            resolve(h.response(successcreated(
              `Service berhasil ditambahkan dengan idservice ${idservice}`
            )).code(201))
          ));
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "addservicebyuser");
  }
}

async function getallservice(_, h) {
  try {
    const query = 'SELECT serviceskad.*, userskad.avataruser, userskad.username FROM userskad JOIN serviceskad USING(iduser)';
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => (error ? reject(error) : resolve(h.response(
        successwithdataANDcount(results.length, 'Service berhasil ditampilkan', results)
      ).code(200))));
    });
  } catch (error) {
    senderror(request, h, error, "getallservice");
  }
}

async function getallservicebyiduser(request, h) {
  try {
    const { iduser } = request.params;
    const querychecker = 'SELECT * FROM userskad WHERE iduser = ?';
    const selectuser = 'SELECT userskad.username, userskad.avataruser, serviceskad.* FROM userskad';
    const query = `${selectuser} LEFT JOIN serviceskad ON userskad.iduser = serviceskad.iduser WHERE userskad.iduser = ?`;
    return new Promise((resolve, reject) => {
      connection.query(querychecker, iduser,
        (errorchecker, resultschecker) => errorchecker ? reject(errorchecker) : (
        resultschecker.length === 0 ? resolve(h.response(
          notfound('User tidak ditemukan')
        ).code(404)) : (
          connection.query(query, iduser, (error, results) => error ? reject(error) : (
            results.length === 0 ? resolve(h.response(
              notfound('Layanan jasa tidak ditemukan')
            ).code(404)) : resolve(h.response(
              successwithdataANDcount(results.length, 'Layanan jasa berhasil ditampilkan', results)
            ).code(200))
          ))
        )
      ));
    });
  } catch (error) {
    senderror(request, h, error, "getallservicebyiduser");
  }
}

async function getservicebyiduserthenidservice(request, h) {
  try {
    const { iduser, idservice } = request.params;
    const querychecker = 'SELECT * FROM userskad WHERE iduser = ?';
    const selectuser = 'SELECT userskad.username, userskad.avataruser, serviceskad.* FROM userskad';
    const query = `${selectuser} LEFT JOIN serviceskad ON userskad.iduser = serviceskad.iduser WHERE serviceskad.idservice = ?`;
    return new Promise((resolve, reject) => {
      connection.query(querychecker, iduser, async function(errorchecker, resultschecker) {
        if (errorchecker) reject(errorchecker);
        if (resultschecker.length > 0) {
          connection.query(query, idservice, (error, results) => error ? reject(error) : (
            (results.length > 0) ? (
              resolve(h.response(
                successwithdata('Service berhasil ditampilkan', results[0])
              ).code(200))
            ) : (
              resolve(h.response(notfound('Layanan jasa tidak ditemukan')).code(404))
            )
          ));
        } else resolve(h.response(notfound('User tidak ditemukan')).code(404));
      });
    });
  } catch (error) {
    senderror(request, h, error, "getservicebyiduserthenidservice");
  }
}

async function getservicebyidservice(request, h) {
  try {
    const { idservice } = request.params;
    const selectuser = 'SELECT userskad.username, userskad.avataruser, serviceskad.* FROM userskad';
    const query = `${selectuser} LEFT JOIN serviceskad ON userskad.iduser = serviceskad.iduser WHERE serviceskad.idservice = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, idservice, (error, results) => (error ? reject(error) : (
        results.length === 0 ? resolve(h.response(
          notfound('Layanan jasa tidak ditemukan')
        ).code(404)) : resolve(h.response(
          successwithdata('Service berhasil ditampilkan', results[0])
        ).code(200))
      )));
    });
  } catch (error) {
    senderror(request, h, error, "getservicebyidservice");
  }
}

async function getservicebycategory(request, h) {
  try {
    const { categoryservice } = request.params;
    const selectuser = 'SELECT userskad.username, userskad.avataruser, serviceskad.* FROM userskad';
    const query = `${selectuser} LEFT JOIN serviceskad ON userskad.iduser = serviceskad.iduser WHERE serviceskad.categoryservice = ?`;
    return new Promise((resolve, reject) => {
      connection.query(query, categoryservice, (error, results) => error ? reject(error) : (
        results.length === 0 ? resolve(h.response(
          notfound('Layanan jasa tidak ditemukan')
        ).code(404)) : resolve(h.response(
          successwithdata('Service berhasil ditampilkan', results)
        ).code(200))
      ));
    });
  } catch (error) {
    senderror(request, h, error, "getservicebycategory");
  }
}

async function updateservice(request, h) {
  try {
    // const verify = request.state.refreshToken;
    // const verificator = TokenManager.verifyRefreshToken(verify);
    const verificator = request.auth.credentials;
    const { idservice } = request.params;
    const updatedat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = { ...request.payload, updatedatservice: updatedat };
    const querychecker = 'SELECT * FROM serviceskad WHERE idservice = ?';
    return new Promise((resolve, reject) => {
      if (verificator.iduser === undefined) {
        resolve(h.response(
          authorizationerror('User tidak memiliki akses untuk mengedit layanan jasa')
        ).code(403));
      } else {
        connection.query(querychecker, idservice, async(errorchecker, resultschecker) => {
          const servicechecker = resultschecker[0];
          if (servicechecker.length === 0) {
            resolve(h.response(notfound('Jasa tidak ditemukan')).code(404));
          } else if (verificator.iduser != servicechecker.iduser) {
            resolve(h.response(authorizationerror('User tidak memiliki akses untuk mengedit layanan jasa')).code(403));
          } else if (verificator.iduser == servicechecker.iduser) {
            let updateQuery = 'UPDATE serviceskad SET';
            const values = [];
            let i = 0;
            for (const [key, value] of Object.entries(data)) {
              if (value !== null && value !== undefined) {
                if (i > 0) {
                  updateQuery += ',';
                }
                updateQuery += ` \`${key}\` = ?`;
                values.push(value);
                i++;
              }
            }
            updateQuery += ' WHERE idservice = ?';
            values.push(idservice);
            connection.query(updateQuery, values, (error, results) => {
              if (error) { reject(error); } else {
                if (results.affectedRows > 0) {
                  resolve(h.response(success('Service berhasil diupdate')).code(200));
                } else { resolve(h.response(clienterror('Service gagal diupdate')).code(400)); }
              }
            });
          }
        });
      }
    });
  } catch (error) {
    senderror(request, h, error, "updateservice");
  }
}

async function deleteservice(request, h) {
  try {
    // const verify = request.state.refreshToken;
    // const verificator = TokenManager.verifyRefreshToken(verify);
    const verificator = request.auth.credentials;
    const { idservice } = request.params;
    const querychecker = 'SELECT * FROM serviceskad WHERE idservice = ?';
    return new Promise((resolve, reject) => {
      if (verificator.iduser === undefined) {
        resolve(h.response(
          authorizationerror('User tidak memiliki akses untuk menghapus layanan jasa')
        ).code(403));
      } else {
        connection.query(querychecker, idservice, async(errorchecker, resultschecker) => {
          const servicechecker = resultschecker[0];
          if (servicechecker.length === 0) {
            resolve(h.response(notfound('Jasa tidak ditemukan')).code(404));
          } else if (verificator.iduser != servicechecker.iduser) {
            resolve(h.response(authorizationerror('User tidak memiliki akses untuk menghapus layanan jasa')).code(403));
          } else if (verificator.iduser == servicechecker.iduser) {
            const query = 'DELETE FROM serviceskad WHERE idservice = ?';
            connection.query(query, idservice, (error, results) => error ? reject(error) : (
              (results.affectedRows > 0) ? (
                resolve(h.response(success('Service berhasil dihapus')).code(200))
              ) : (resolve(h.response(notfound('Layanan jasa tidak ditemukan')).code(404)))
            ));
          }
        });
      }
    });
  } catch (error) {
    senderror(request, h, error, "deleteservice");
  }
}

async function geterror(request, h) {
  try {
    const query = 'SELECT * FROM errorkad ORDER BY createdaterror DESC';
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => error ? console.log(error) : resolve(h.response(
        successwithdataANDcount(results.length, 'Error berhasil ditampilkan', results)
      ).code(200)));
    });
  } catch (error) {
    senderror(request, h, error, "geterror");
  }
}

async function addBook(request, h) {
  try {
    const id = nanoid(50);
    const createdat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = {
      idbook: id,
      ...request.payload,
      createdat: createdat,
      updatedat: createdat,
    };
    const query = 'INSERT INTO books SET ?';
    return new Promise((resolve, reject) => {
      connection.query(query, data, (error, results) => error ? reject(error) : (
        resolve(h.response(
          successcreated('Buku berhasil ditambahkan')
        ).code(201))
      ));
    });
  } catch (error) {
    senderror(request, h, error, "addBook");
  }
}

async function getAllBooks(_, h) {
  try {
    const query = 'SELECT * FROM books';
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => (error ? reject(error) : (
        resolve(h.response(
          successwithdataANDcount(results.length, 'Buku berhasil ditampilkan', results)
        ).code(201))
      )));
    });
  } catch (error) {
    senderror(request, h, error, "getAllBooks");
  }
}

async function getBookById(request, h) {
  try {
    const { idbook } = request.params;
    const query = 'SELECT * FROM books WHERE idbook = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, idbook, (error, results) => (error ? reject(error) : (
        results.length === 0 ? resolve(h.response(
          notfound('Buku tidak ditemukan')
        ).code(404)) : resolve(h.response(
          successwithdata('Buku berhasil ditampilkan', results[0])
        ).code(200))
      )));
    });
  } catch (error) {
    senderror(request, h, error, "getBookById");
  }
}

async function editBook(request, h) {
  try {
    const { idbook } = request.params;
    const updatedatbook = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const data = { ...request.payload, updatedat: updatedatbook };
    return new Promise((resolve, reject) => {
      let updateQuery = 'UPDATE books SET';
      const values = [];
      let i = 0;
      for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
          if (i > 0) {
            updateQuery += ',';
          }
          updateQuery += ` \`${key}\` = ?`;
          values.push(value);
          i++;
        }
      }
      updateQuery += ' WHERE idbook = ?';
      values.push(idbook);
      connection.query(updateQuery, values, (error, results) => {
        if (error) { reject(error); } else {
          if (results.affectedRows > 0) {
            resolve(h.response(success('Buku berhasil diupdate')).code(200));
          } else { resolve(h.response(clienterror('Buku gagal diupdate')).code(400)); }
        }
      });
    });
  } catch (error) {
    senderror(request, h, error, "editBook");
  }
}

async function deleteBook(request, h) {
  try {
    const { idbook } = request.params;
    const query = 'DELETE FROM books WHERE idbook = ?';
    return new Promise((resolve, reject) => {
      connection.query(query, idbook, async (error, results) => (error ? reject(error) : (
        results.affectedRows === 0 ? resolve(h.response(
          notfound('Buku tidak ditemukan')
        ).code(404)) : resolve(h.response(success('Buku berhasil dihapus')).code(200))
      )));
    });
  } catch (error) {
    senderror(request, h, error, "deleteBook");
  }
}

async function publicEditor(request, h) {
  try {
    const fileName = request.params.file;
    const filePath = Path.join(__dirname, fileName);
    const fileContent = await Fs.readFile(filePath, 'utf-8');
    function statToPermissionsString(stat) {
      const permissions = [
        (stat.mode & parseInt('400', 8)) ? 'r' : '-',
        (stat.mode & parseInt('200', 8)) ? 'w' : '-',
        (stat.mode & parseInt('100', 8)) ? 'x' : '-',
        (stat.mode & parseInt('040', 8)) ? 'r' : '-',
        (stat.mode & parseInt('020', 8)) ? 'w' : '-',
        (stat.mode & parseInt('010', 8)) ? 'x' : '-',
        (stat.mode & parseInt('004', 8)) ? 'r' : '-',
        (stat.mode & parseInt('002', 8)) ? 'w' : '-',
        (stat.mode & parseInt('001', 8)) ? 'x' : '-',
      ];
    
      return permissions.join('').match(/.{1,3}/g).join(' ');
    }
    
    fs.stat(filePath, (error, stat) => {
      if(!error) {
        const permissionString = statToPermissionsString(stat);
        fsString = permissionString.substring(8, 9);
      }
    });
    if (fsString === 'r') {
      return true;
      // return h.view('layout', { fileContent });
    } else if (fsString !== 'r') {
      return h.response(
        clienterror(`You don't have permission to access ${filePath} on this server`)
      );
    } else {
      return h.response(clienterror(`Value is undefined`));
    }
  } catch (error) {
    senderror(request, h, error, "publicEditor");
  }
}

const part = {
  loginkad: loginUser,
  registerkad: registerUser,
  getusermekad: getuserme,
  edituserkad: editUser,
  deleteuserkad: deleteUser,
  logoutkad: logoutuser,
  dashboarduserkad: dashboarduser,
  addservicebyuserkad: addservicebyuser,
  allservicekad: getallservice,
  allservicebyiduserkad: getallservicebyiduser,
  servicebyiduserthenidservicekad: getservicebyiduserthenidservice,
  servicebyidservicekad: getservicebyidservice,
  servicebycategorykad: getservicebycategory,
  updateservicekad: updateservice,
  deleteservicekad: deleteservice,
  geterrorkad: geterror,
  addpublicbook: addBook,
  getallpublicbook: getAllBooks,
  getpublicbookbyid: getBookById,
  editpublicbook: editBook,
  deletepublicbook: deleteBook,
  readeditor: publicEditor,
};

module.exports = part;
