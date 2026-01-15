const db = require("../../db")
const bcrypt = require("bcryptjs")

module.exports={
    Query:{
        users:async()=>{
            const [rows] = await db.query("SELECT id,name,email FROM users")
            return rows
        
        },
        user:async(_,{id})=>{
            const [rows] = await db.query("SELECT id,name,email FROM users WHERE id=?",[id])
            return rows[0]
            
        }
    
    },
    Mutation:{
        createUser:async(_,{name,email,password})=>{
            const [rows] = await db.query("SELECT * FROM users WHERE email=?",[email])
            if(rows[0]) return null
            const hashedPassword = await bcrypt.hash(password,10)
            const [result] = await db.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",[name,email,hashedPassword])
            const [rows2] = await db.query("SELECT * FROM users WHERE id=?",[result.insertId])
            return rows2[0]
        },
        updateUser:async(_,{id,name,email,password})=>{
            const [rows] = await db.query("SELECT * FROM users WHERE id=?",[id])
            if(!rows[0]) return null
            const hashedPassword = await bcrypt.hash(password,10)
            await db.query("UPDATE users SET name=?,email=?,password=? WHERE id=?",[name,email,hashedPassword,id])
            const [rows2] = await db.query("SELECT * FROM users WHERE id=?",[id])
            return rows2[0]

        },
        deleteUser:async(_,{id})=>{
            const [rows] = await db.query("SELECT * FROM users WHERE id=?",[id])
            if(!rows[0]) return null
            await db.query("DELETE FROM users WHERE id=?",[id])
            return rows[0]
            
        },
       
    }

}