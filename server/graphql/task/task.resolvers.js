const db = require('../../db');

module.exports = {
  Query: {
    tasks: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }

      const [rows] = await db.query(
        'SELECT * FROM tasks WHERE user_id=?',
        [context.user.id]
      );
      return rows;
    }
  },

  Mutation: {
    createTask: async (_, { title, description, status }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }

      const [result] = await db.query(
        'INSERT INTO tasks (title,description,status,user_id) VALUES (?,?,?,?)',
        [title, description, status, context.user.id]
      );

      return {
        id: result.insertId,
        title,
        description,
        status,
        user_id: context.user.id
      };
    }
  }
};