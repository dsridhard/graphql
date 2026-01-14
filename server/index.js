const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer}= require('@apollo/server/standalone')
// const typeDefs=require('./schema');
// const resolvers=require('./resolvers');
const PORT = process.env.PORT || 4000;
//TypeDefs
const baseTypeDefs= require('./graphql/base.typeDefs')
const userTypeDefs= require('./graphql/user/user.typeDefs')
const taskTypeDefs= require('./graphql/task/task.typeDefs')
const authTypeDefs= require('./graphql/auth/auth.typeDefs')

//Resolvers
const userResolvers= require('./graphql/user/user.resolvers')
const taskResolvers= require('./graphql/task/task.resolvers')
const authResolvers= require('./graphql/auth/auth.resolvers')

const {verifyToken } = require( './auth');
const server = new ApolloServer({
    typeDefs:[baseTypeDefs,userTypeDefs,taskTypeDefs,authTypeDefs],
    resolvers:[userResolvers,taskResolvers,authResolvers]
});
(async()=>{
    const {url} =await startStandaloneServer(server,{
        listen:{port:4000},
        context:async({req})=>{
            const token = req.headers.authorization || '';
            const user = verifyToken(token);
            return {user};
        }
    });
    console.log(`GraphQL Server running at ${url}`);
})();