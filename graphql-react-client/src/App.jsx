import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "./graphql/users";
export default function App(){
  const {loading, error, data} = useQuery(GET_USERS)
if(error) return <h3>Error:{error.message}</h3>
if(loading) return <h3>Loading...</h3>
return (
  <div style={{padding:"20px"}}>
    <h2>Users List</h2>
    {
      data.users.map(user=>(
        <div key={user.id} style={{marginBottom:"10px"}}>
          <p><b>Name:</b>{user.name}</p>
          <p><b>Email:</b>{user.email}</p>
        </div>  ))
    }
  </div>
)
}