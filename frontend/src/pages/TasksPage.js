import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask } from "../api/api";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function TasksPage() {

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    const data = await getTasks(projectId);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const addTask = async () => {
    await createTask(projectId, title, description);
    setTitle("");
    setDescription("");
    loadTasks();
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {/* CREATE TASK FORM */}

      <div className="flex gap-2 mb-6">

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add Task
        </button>

      </div>


      {/* TASK CARDS */}
      
      <div className="grid grid-cols-2 gap-6">

        {tasks.map((task) => (

          <div key={task.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">{task.title}</h2>

            <p className="text-gray-500">{task.description}</p>


            {/* STATUS DROPDOWN */}

            <select
              value={task.status}
              onChange={async (e) => {

                await updateTask(task.id, {
                  status: e.target.value
                });

                loadTasks();

              }}
              className="border mt-3 p-1 rounded"
            >

              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>

            </select>

          </div>

        ))}

      </div>

    </Layout>
  );
}