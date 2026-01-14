import { useQuery, useMutation } from "@apollo/client/react";
import { GET_TASKS, CREATE_TASK, DELETE_TASK } from "../graphql/tasks";
import { useState } from "react";

export default function Tasks() {
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreate = async () => {
    if (!title || !status) return;
    await createTask({ variables: { title, description, status } });
    setTitle("");
    setDescription("");
    setStatus("");
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tasks</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleCreate}>Add Task</button>
      </div>

      {data.tasks.map((task) => (
        <div key={task.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
          <p><b>Title:</b> {task.title}</p>
          <p><b>Description:</b> {task.description}</p>
          <p><b>Status:</b> {task.status}</p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}