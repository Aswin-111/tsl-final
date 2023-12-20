/* eslint-disable react/prop-types */

import AudioPlay from './AudioPlay'
import RegistrationForm from './RegistrationForm'
import Footer from "./Footer"
// import ConfirmationPopup from './ConfirmationPopup';
import { useState } from 'react';

const SlidingContainer = (props) => {
  const [usersCount,setUsersCount] = useState(0)

  console.log(props);

  return (
   <>

   
    {/* Sliding Container  */}

    <div className={ props.isClicked && "login-container show-login" } >
    
        {/* <div className = "parent-container container-fluid m-0 p-0"> */}

        <div className="row g-0 m-0 p-0">

            {/* Left column with image */}
            <div className="col-md-4 slide-column-img"></div>   


            {/* Right column with audio player, form and footer */}
            <div className="col-md-8 m-0 p-0 columns slide-column-form-container">
                   
                {/* Audio Progress Bar and Heading */}

                <AudioPlay language={props.language} />     

                <div className="parent-heading">Satyam vada | Dharmam chara</div>

                {/* Form parent container */}

                <RegistrationForm setUsersCount={setUsersCount}/>

                <Footer usersCount = {usersCount}/>
            </div>
        </div>


    </div>
    
    </>
  )
}

export default SlidingContainer