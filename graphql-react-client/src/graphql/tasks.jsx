import { gql } from "@apollo/client";

export const GET_TASKS = gql`
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

//export new task
export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: String!
    $user_id: ID!
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      user_id: $user_id
    ) {
      id
      title
      description
      status
    }
  }
`;
//update task
export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $status: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      id
      title
      description
      status
    }
  }
`;

//delete task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
