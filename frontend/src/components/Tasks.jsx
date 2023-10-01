import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Navbar from './Navbar';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedTime = date.toLocaleTimeString();
    return `${day}-${month}-${year} ${formattedTime}`;
  }

  return (
    <>
      <Navbar />
      <div className="my-2 mx-auto max-w-[800px] py-4">
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="w-full h-[300px] flex items-center justify-center gap-4">
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">+ Add new task</Link>
              </div>
            ) : (
              <table className="w-full border-collapse border border-gray-300 bg-stone-50 rounded-lg">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">S. NO.</th>
                    <th className="border border-gray-300 px-4 py-2">Task Name</th>
                    <th className="border border-gray-300 px-4 py-2">Date & Time</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id}>
                      <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{task.description}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{formatDateTime(task.updatedAt)}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Link to={`/tasks/view/${task._id}`} className="text-green-600 mr-2">
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                        <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(task._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                        <Link to={`/tasks/${task._id}`} className="ml-2 text-blue-600">
                          <i className="fa-solid fa-pen"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks;