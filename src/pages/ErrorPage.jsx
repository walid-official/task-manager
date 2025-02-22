import React from 'react';
import { NavLink } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-[#e5e5e5] min-h-screen'>
           <div className=" flex flex-col justify-center items-center h-screen">
            <img className='lg:w-[55%] w-full mx-auto' src="https://aemorph.com/wp-content/uploads/404-page-best-practices.jpg" alt="" />
            <div className="flex justify-center">
                <NavLink to="/" className='bg-gradient-to-r from-[#007bff] to-[#007bff] px-8 py-3 rounded-full cursor-pointer text-white text-xl font-medium'>Go Back Home</NavLink>
           </div>
           </div>
           
        </div>
    );
};

export default ErrorPage;