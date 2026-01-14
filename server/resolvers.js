const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {generateToken,verifyToken} = require('./auth');
const resolvers ={
    Query:{
        users:async()=>{
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        
        },
        tasks:async(_,__,context)=>{
            if(!context.user){
                throw new Error('Authentication required');
            }
            const [rows] = await db.query('SELECT * FROM tasks');
            return rows;
        },
        user:async(_,__,context)=>{
            if(!context.user){
                throw new Error('Authentication required');
            }
            const [rows] = await db.query('SELECT * FROM users WHERE id=?',[context.user.id])
            return rows[0];
        },
        task:async(_,__,context)=>{
             if(!context.user){
                throw new Error('Authentication required');
            }
            const [rows] = await db.query('SELECT * FROM tasks WHERE id=?',[context.user.id])
            return rows;
        }
    
    },
    Mutation:{
        login:async(_,{email,password})=>{
            const [rows] = await db.query('SELECT * FROM users WHERE email=?',[email]);
            if(rows.length===0){
                throw new Error('Invalid email or password');
            }
            const user = rows[0];
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                throw new Error('Invalid email or password');
            }
            const token = generateToken(user);
            return {token,user:{id:user.id,name:user.name,email:user.email}};
        },

        createUser:async(_,{name,email,password})=>{
            const hashedPassword = await bcrypt.hash(password,10);
            const [result] = await db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)',[name,email,hashedPassword]);
            return {id:result.insertId,name,email};

        },
        updateUser:async(_,{id,name,email})=>{
            const [result] = await db.query('UPDATE users SET name=?,email=? WHERE id=?',[name,email,id]);
            return {id,name,email};
        },
        deleteUser:async(_,{id})=>{
            const [result] = await db.query('DELETE FROM users WHERE id=?',[id]);
            return "User deleted successfully";
        },
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
module.exports=resolvers;