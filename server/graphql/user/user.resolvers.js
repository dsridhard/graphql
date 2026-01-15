const db = require("../../db")
const bcrypt = require("bcryptjs")

module.exports = {
    Query: {
        users: async () => {
            const [rows] = await db.query("SELECT id,name,email FROM users")
            return rows

        },
        user: async (_, { id }) => {
            const [rows] = await db.query("SELECT id,name,email FROM users WHERE id=?", [id])
            return rows[0]

        }

    },
    Mutation: {
        createUser: async (_, { name, email, password, role }) => {
            const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email])
            if (rows[0]) return "User already exists"
            const hashedPassword = await bcrypt.hash(password, 10)
            const [result] = await db.query("INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)", [name, email, hashedPassword, role])
            const [rows2] = await db.query("SELECT * FROM users WHERE id=?", [result.insertId])
            return rows2[0]
        },
        updateUser: async (_, { id, name, email, password }, context) => {
            // 🔐 Auth check
            if (!context.user) {
                throw new Error("Unauthorized Access");
            }

            // 🔐 Role check
            if (context.user.role !== "admin") {
                throw new Error("Only admin can update users");
            }

            // ✅ Check user exists
            const [rows] = await db.query(
                "SELECT * FROM users WHERE id=?",
                [id]
            );

            if (!rows[0]) {
                throw new Error("User not found");
            }

            // ✅ Build dynamic update
            const updates = [];
            const values = [];

            if (name) {
                updates.push("name=?");
                values.push(name);
            }

            if (email) {
                updates.push("email=?");
                values.push(email);
            }

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updates.push("password=?");
                values.push(hashedPassword);
            }

            if (updates.length === 0) {
                throw new Error("Nothing to update");
            }

            values.push(id);

            await db.query(
                `UPDATE users SET ${updates.join(", ")} WHERE id=?`,
                values
            );

            // ✅ Return updated user
            const [updatedUser] = await db.query(
                "SELECT id,name,email,role FROM users WHERE id=?",
                [id]
            );

            return updatedUser[0];
        },
        deleteUser: async (_, { id }, context) => {
      // 🔐 Auth check
      if (!context.user) {
        throw new Error("Unauthorized Access");
      }

      // 🔐 Role check
      if (context.user.role !== "admin") {
        throw new Error("Only admin can delete users");
      }

      // ❌ Prevent self-delete
      if (context.user.id === id) {
        throw new Error("Admin cannot delete himself");
      }

      // ✅ Check if user exists
      const [rows] = await db.query(
        "SELECT id FROM users WHERE id=?",
        [id]
      );

      if (!rows.length) {
        throw new Error("User not found");
      }

      // 🧹 Optional: delete related data first (tasks, etc.)
      await db.query("DELETE FROM tasks WHERE user_id=?", [id]);

      // 🗑 Delete user
      await db.query("DELETE FROM users WHERE id=?", [id]);

      return 'User deleted successfully';
    },

    }

}