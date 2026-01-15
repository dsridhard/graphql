module.exports = `
type Task {
  id: ID!
  title: String!
  description: String
  status: String!
  user_id: ID!
}

extend type Query {
  tasks: [Task!]!
}

extend type Mutation {
  createTask(
    title: String!
    description: String
    status: String
  ): Task!
  updateTask(
    id: ID!
    title: String
    description: String
    status: String
  ): Task!
  deleteTask(id: ID!): String!
}
`;
