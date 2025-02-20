import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivetRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          );
    }
    if(user) return children;
};

export default PrivetRouter;