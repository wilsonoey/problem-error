const AddedReply = require('../../Domains/replies/entities/AddedReply');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(replyData) {
    const { commentId, content, owner } = replyData;
    const id = `reply-${this._idGenerator()}`;
    console.log(replyData);

    const query = {
      text: 'INSERT INTO comment_replies VALUES($1, $2, $3, $4) RETURNING id, content, owner as owner',
      values: [id, content, owner, commentId],
    };

    const result = await this._pool.query(query);

    return new AddedReply({ ...result.rows[0] });
  }

  async verifyAvailableReplyById(replyId) {
    const query = {
      text: 'SELECT id FROM comment_replies WHERE id = $1 AND is_delete = false',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('balasan tidak tersedia');
    }
  }

  async verifyReplyByOwner(replyId, owner) {
    const query = {
      text: 'SELECT id FROM comment_replies WHERE id = $1 AND owner = $2',
      values: [replyId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('balasan ini bukan milik anda');
    }
  }

  async getRepliesByThreadId(threadId) {
    const query = {
      text: `SELECT cr.id, cr.content, cr.date, u.username, cr.comment_id, cr.is_delete
              FROM comment_replies cr JOIN users u ON cr.owner = u.id WHERE cr.thread_id = $1
              ORDER BY cr.date ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows.map((row) => ({
      ...row,
      date: row.date.toISOString(),
    }));
  }

  async softDeleteReplyById(replyId) {
    const query = {
      text: 'UPDATE comment_replies SET is_delete = TRUE WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('balasan tidak tersedia');
    }
  }
}

module.exports = ReplyRepositoryPostgres;
