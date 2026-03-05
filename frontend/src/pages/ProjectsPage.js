import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async () => {
    await createProject(name, description);
    setName("");
    setDescription("");
    loadProjects();
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="flex gap-2 mb-6">
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={addProject}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.map((p) => (

          <div key={p.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold">{p.name}</h2>

            <p className="text-gray-500">{p.description}</p>

            <button
              onClick={() => navigate(`/tasks/${p.id}`)}
              className="mt-4 bg-green-500 text-white px-3 py-1 rounded"
            >
              Open
            </button>

          </div>

        ))}
      </div>

    </Layout>
  );
}