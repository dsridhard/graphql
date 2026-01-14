import {gql} from "@apollo/client"

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
    token
    user{
      id
      name
      email
    }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
//export
export const GET_AUTH_USER = gql`
  query GetAuthUser {
    getAuthUser {
      id
      name
      email
    }
  }
`;export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
//export
export const CHECK_AUTH = gql`
  query CheckAuth {
    checkAuth {
      isAuthenticated
      user {
        id
        name
        email
      }
    }
  }
`;
//export
export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;
//export
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
//export
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $password: String) {
    updateUser(id: $id, name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
//export
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
//export
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
//export
export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      user_id
    }
  }
`;
//export
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
//export
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
//export
export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
//export
export const GET_TASKS_BY_USER_ID = gql`
  query GetTasksByUserId($userId: ID!) {
    tasksByUserId(userId: $userId) {
      id
      title
      description
      status
      user_id
    }
  }
`;
//export
export const GET_TASK_BY_STATUS = gql`
  query GetTaskByStatus($status: String!) {
    tasksByStatus(status: $status) {
      id
      title
      description
      status
      user_id
    }
  }
`;
export const GET_TASK_BY_TITLE = gql`
  query GetTaskByTitle($title: String!) {
    tasksByTitle(title: $title) {
      id
      title
      description
      status
      user_id
    }
  }
`;
export const GET_TASK_BY_DESCRIPTION = gql`
  query GetTaskByDescription($description: String!) {
    tasksByDescription(description: $description) {
      id
      title
      description
      status
      user_id
    }
  }
`;
//export
export const GET_TASK_BY_USER_ID_AND_STATUS = gql`
  query GetTaskByUserIdAndStatus($userId: ID!, $status: String!) {
    tasksByUserIdAndStatus(userId: $userId, status: $status) {
      id
      title
      description
      status
      user_id
    }
  }
`;export const GET_TASK_BY_USER_ID_AND_TITLE = gql`
  query GetTaskByUserIdAndTitle($userId: ID!, $title: String!) {
    tasksByUserIdAndTitle(userId: $userId, title: $title) {
      id
      title
      description
      status
      user_id
    }
  }
`;
//export
export const GET_TASK_BY_USER_ID_AND_DESCRIPTION = gql`
  query GetTaskByUserIdAndDescription($userId: ID!, $description: String!) {
    tasksByUserIdAndDescription(userId: $userId, description: $description) {
      id
      title
      description
      status
      user_id
    }
  }
`;
//export
export const GET_TASK_BY_USER_ID_AND_TITLE_AND_STATUS = gql`
  query GetTaskByUserIdAndTitleAndStatus(
    $userId: ID!
    $title: String!
    $status: String!
  ) {
    tasksByUserIdAndTitleAndStatus(
      userId: $userId
      title: $title
      status: $status
    ) {
      id
      title
      description
      status
      user_id
    }
  }
`; 
export const GET_TASK_BY_USER_ID_AND_TITLE_AND_DESCRIPTION = gql`
  query GetTaskByUserIdAndTitleAndDescription(
    $userId: ID!
    $title: String!
    $description: String!
  ) {
    tasksByUserIdAndTitleAndDescription(
      userId: $userId
      title: $title
      description: $description
    ) {
      id
      title
      description
      status
      user_id
    }
  }
`;