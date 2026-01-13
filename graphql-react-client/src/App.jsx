import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User List</h2>
      {data.users.map(user => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;