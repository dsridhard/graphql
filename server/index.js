const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const baseTypeDefs = require('./graphql/base.typeDefs');
const userTypeDefs = require('./graphql/user/user.typeDefs');
const taskTypeDefs = require('./graphql/task/task.typeDefs');
const authTypeDefs = require('./graphql/auth/auth.typeDefs');

const userResolvers = require('./graphql/user/user.resolvers');
const taskResolvers = require('./graphql/task/task.resolvers');
const authResolvers = require('./graphql/auth/auth.resolvers');

const { verifyToken } = require('./auth');

const server = new ApolloServer({
  typeDefs: [baseTypeDefs, userTypeDefs, taskTypeDefs, authTypeDefs],
  resolvers: [userResolvers, taskResolvers, authResolvers],
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

      const user = token ? verifyToken(token) : null;

      return { user };
    },
  });

  console.log(`🚀 GraphQL Server running at ${url}`);
})();

module.exports = { server };