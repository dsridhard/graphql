import {useQuery} from "@apollo/client/react"
import GET_TASKS from "../graphql/tasks";

function Tasks() {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>My Tasks</h2>
      {data.tasks.map((task) => (
        <div key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <small>{task.status}</small>
        </div>
      ))}
    </div>
  );
}

export default Tasks;