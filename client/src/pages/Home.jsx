import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import TaskImg from '../assests/task.png';
import clock from '../assests/clock.png';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='text-black h-[40vh] py-8 text-center'>
            <img src={TaskImg} className="mx-auto h-80 w-80" alt="Task" />
            <h1 className='text-2xl'>Welcome to Your Personal Task Organizer</h1>
            <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
              <span className='transition-[margin]'>Enhance Your Productivity with Task Manager</span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-sign-in"></i></span>
            </Link>
          </div>
        ) : (
          <div className='mt-8'>
            <h1 className='text-lg mt-8 mx-8 text-center'>Welcome back, <span className='font-bold'>{authState.user.name}!</span></h1>
            <div className="flex justify-center items-center">
              <img src={clock} alt="timer" className='h-60 w-60 mt-8 mb-8' />
            </div>
            <h1 className='text-lg italic text-center'>"I must govern the clock, not be governed by it. - Golda Meir"</h1>
            <div className='flex items-center justify-center mt-8'>
              <Link to='/tasks' className='block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg mr-5'> <i className="fa-solid fa-tachometer "></i> Dashboard </Link>
              <Link to='/tasks/add' className='block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg mr-5'> <i className="fa-solid fa-plus"></i> Create Task </Link>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  )
}

export default Home