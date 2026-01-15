module.exports = `
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: String!
    ): User
    updateUser(
      id: ID!
      name: String!
      email: String!
      password: String!
      role: String!
    ): User
    deleteUser(id: ID!): User
  }
`;