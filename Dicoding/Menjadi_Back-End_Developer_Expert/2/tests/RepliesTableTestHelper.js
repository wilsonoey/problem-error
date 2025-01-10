const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async addReply({
    id = 'reply-123', commentId = 'comment-123', content = 'Example Reply', owner = 'user-123',
  }) {
    const query = {
      text: 'INSERT INTO comment_replies VALUES($1, $2, $3, $4)',
      values: [id, content, owner, commentId],
    };

    await pool.query(query);
  },

  async findReplyById(replyId) {
    const query = {
      text: 'SELECT * FROM comment_replies WHERE id = $1',
      values: [replyId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment_replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;