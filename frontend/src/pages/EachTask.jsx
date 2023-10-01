import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';

const EachTask = () => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  // eslint-disable-next-line no-unused-vars
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  // eslint-disable-next-line no-unused-vars
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "View Task"}</h2>
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <Textarea type="description" name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} />
                {fieldError("description")}
              </div>

              <div className="flex justify-center">
                <Link
                  to={`/tasks/edit/${taskId}`}
                  className="bg-orange-500 text-white px-4 py-2 font-medium hover:bg-orange-600 rounded-lg mr-4"
                >
                  Edit Task
                </Link>
                <Link to="/" className="bg-orange-500 text-white px-4 py-2 font-medium hover:bg-orange-600 rounded-lg">
                  Go Back
                </Link>
              </div>
            </>
          )}
        </form>
      </MainLayout>
    </>
  )
}

export default EachTask;