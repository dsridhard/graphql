const typeDefs=`
type User{
 id:ID!    
 name:String!
 email:String!
}
type Task{
id:ID!
title:String!
description:String!
status:String!
user_id:ID!
}
type LoginResponse{
token:String!
user:User!
}
 type Query{
    users:[User]
    tasks:[Task]
    user(id:ID!):User
    task(id:ID!):Task
}
  type Mutation{
    createUser(name:String!,email:String!,password:String!):User
    updateUser(id:ID!,name:String!,email:String!,password:String!):User
    deleteUser(id:ID!):String
    login(email:String!,password:String!):LoginResponse
    createTask(title:String!,description:String!,status:String!,user_id:ID!):Task
    updateTask(id:ID!,title:String!,description:String!,status:String!):Task
    deleteTask(id:ID!):String

  }
   
 `;
module.exports=typeDefs;