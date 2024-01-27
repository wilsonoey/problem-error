const BASE_URL = 'https://wilsonoey.helioho.st';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
}

async function login({ emailuser, passworduser }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emailuser, passworduser }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function register({ username, emailuser, passworduser, avataruser, roleuser, statususer }) {
  const response = await fetch(`${BASE_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, emailuser, passworduser, avataruser, roleuser, statususer }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function updateProfile(iduser, { avataruser, username, completename }) {
  const response = await fetchWithToken(`${BASE_URL}/user/${iduser}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avataruser, username, completename }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function deleteProfile() {
  const response = await fetchWithToken(`${BASE_URL}/user`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };

}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/user/profile`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addService({
  nameservice,
  avatarservice,
  descriptionservice,
  categoryservice,
  areaservice,
  contactservice,
  statusservice,
}) {
  const response = await fetchWithToken(`${BASE_URL}/user/service/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameservice,
      avatarservice,
      descriptionservice,
      categoryservice,
      areaservice,
      contactservice,
      statusservice,
    }),
  });

  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function getServices() {
  const response = await fetch(`${BASE_URL}/service`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}

async function getMyServices() {
  const response = await fetchWithToken(`${BASE_URL}/dashboard`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}

async function getServicebyID(idservice) {
  const response = await fetchWithToken(`${BASE_URL}/service/${idservice}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}

async function editservice( idservice, {
  nameservice,
  avatarservice,
  descriptionservice,
  categoryservice,
  areaservice,
  contactservice,
}) {
  const response = await fetchWithToken(`${BASE_URL}/user/service/${idservice}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameservice,
      avatarservice,
      descriptionservice,
      categoryservice,
      areaservice,
      contactservice,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

async function deleteService(idservice) {
  const response = await fetchWithToken(`${BASE_URL}/user/service/${idservice}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

export { 
  getAccessToken,
  putAccessToken,
  login,
  register,
  updateProfile,
  deleteProfile,
  getUserLogged,
  addService,
  getServices,
  getMyServices,
  getServicebyID,
  editservice,
  deleteService 
}