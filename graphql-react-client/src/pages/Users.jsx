import { useQuery } from "@apollo/client/react";
import GET_USERS from "../graphql/users";
import { Link } from "react-router-dom";
export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/tasks">Tasks</Link>
      <h2>Users</h2>
      {data.users.map((user) => (
        <div key={user.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      ))}
    </div>
  );
}
