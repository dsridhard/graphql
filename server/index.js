const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer}= require('@apollo/server/standalone')
const typeDefs=require('./schema');
const resolvers=require('./resolvers');
const {verifyToken } = require( './auth');
const server = new ApolloServer({
    typeDefs,
    resolvers
});
startStandaloneServer(server,{
    listen:{port:4000},
    
    context:async({req})=>{
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');
        const user = token ? await verifyToken(token) : null;

        return {user};
    },
})