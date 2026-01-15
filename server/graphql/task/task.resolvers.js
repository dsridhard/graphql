const db = require('../../db');

module.exports = {
  Query: {
    tasks: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const [rows] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ?',
        [context.user.id]
      );
      return rows;
    },
  },

  Mutation: {
    createTask: async (_, { title, description, status }, context) => {
      // ✅ AUTH CHECK
      if (!context.user) {
        console.log("context.user:", context.user);
        
        throw new Error('Unauthorized Access');
      }

      const userId = context.user.id;

      const [result] = await db.query(
        'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)',
        [title, description, status || 'PENDING', userId]
      );

      return {
        id: result.insertId,
        title,
        description,
        status: status || 'PENDING',
        user_id: userId,
      };
    },

    updateTask: async (_, { id, title, description, status }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }

      await db.query(
        'UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?',
        [title, description, status, id, context.user.id]
      );

      return { id, title, description, status };
    },

    deleteTask: async (_, { id }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }

      await db.query(
        'DELETE FROM tasks WHERE id=? AND user_id=?',
        [id, context.user.id]
      );

      return 'Task deleted successfully';
    },
  },
};