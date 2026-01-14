const db = require('../../db');

module.exports = {
  Query: {
     tasks:async(_,__,context)=>{
            if(!context.user){
                throw new Error('Authentication required');
            }
            const [rows] = await db.query('SELECT * FROM tasks');
            return rows;
        },
   
  },

  Mutation: {
    createTask:async(_,{title,description,user_id})=>{
               const [result] = await db.query('INSERT INTO tasks (title,description,user_id) VALUES (?,?,?)',[title,description,user_id]);
               return {id:result.insertId,title,description,status:"PENDING",user_id};
           },
          
           updateTask:async(_,{id,title,description,status})=>{
               const [result] = await db.query('UPDATE tasks SET title=?,description=?,status=? WHERE id=?',[title,description,status,id]);
               return {id,title,description,status};
           },
           deleteTask:async(_,{id})=>{
               const [result] = await db.query('DELETE FROM tasks WHERE id=?',[id]);
               return "Task deleted successfully";
               
           }
  }
};