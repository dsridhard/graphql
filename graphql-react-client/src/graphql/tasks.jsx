import { gql } from "@apollo/client";

 const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
      user_id
    }
  }
`;
export default GET_TASKS;
// //export new task
//  const CREATE_TASK = gql`
//   mutation CreateTask(
//     $title: String!
//     $description: String!
//     $status: String!
//     $user_id: ID!
//   ) {
//     createTask(
//       title: $title
//       description: $description
//       status: $status
//       user_id: $user_id
//     ) {
//       id
//       title
//       description
//       status
//     }
//   }
// `;
// //update task
//  const UPDATE_TASK = gql`
//   mutation UpdateTask(
//     $id: ID!
//     $title: String
//     $description: String
//     $status: String
//   ) {
//     updateTask(
//       id: $id
//       title: $title
//       description: $description
//       status: $status
//     ) {
//       id
//       title
//       description
//       status
//     }
//   }
// `;

// //delete task
//  const DELETE_TASK = gql`
//   mutation DeleteTask($id: ID!) {
//     deleteTask(id: $id) {
//       id
//     }
//   }
// `;

// export { CREATE_TASK, UPDATE_TASK, DELETE_TASK };
//export