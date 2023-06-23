import React from 'react'
import authService from './auth/authServices'

const Profile = () => {

  const user = authService.getCurrentUser();

  return (
    <div className=' text-center mt-3' >
        <div className='card  ' style={{width:"300px"}}>
          Name :  {user.username}
        </div>
      
    </div>
  )
}

export default Profile
