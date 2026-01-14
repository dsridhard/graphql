
module.exports=`
type LoginReponse{
 token:String!
 user:User!
}
extend type Mutation{
login(email:String!,password:String!):LoginReponse!
}
`