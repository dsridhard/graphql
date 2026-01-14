const db = require('../../db')
const bcrypt = require('bcryptjs')

const {generateToken,verifyToken} = require('../../auth')
module.exports={
    
    Mutation:{
        login:async(_,{email,password})=>{
            const [rows] = await db.query('SELECT * FROM users WHERE email=?',[email])
            if(rows.length===0){
                throw new Error('Invalid email or password')
            
            }
            const user = rows[0]
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                throw new Error('Invalid email or password')
            }
            const token = generateToken(user)
            return {token,user:{id:user.id,name:user.name,email:user.email}}
        }
           
    }
}