import { useState } from 'react';

import SlidingContainer from '../components/SlidingContainer';
import ConfirmationPopup from "../components/ConfirmationPopup";
import UserStatusPopup from "../components/UserStatusPopup";
import OtpPopup from "../components/OtpPopup";
import SuccessCard from "../components/SuccessCard";


const UserRegistration = () => {


  const [language, setLanguage] = useState(["English"]);
  const [isClicked, setIsClicked] = useState(false);


  function proceedClicked() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <div className="hero-main-container">
        <select className="home-language-select-button" 
          onChange={(e) =>{ 
             const lang= e.target.value;
             setLanguage(lang);
            }} 
          name="language"
          value={language} 
          id='language' 
          style={{"backgroundColor": "#081e59"}} 
        >Select a Language 
          <option value="" disabled>Select a language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
        </select>

        <button className="proceed-button" onClick={proceedClicked}>Proceed</button>

        {isClicked && <SlidingContainer language={language} isClicked={isClicked} /> }
        
        
        {/* <ConfirmationPopup /> */}
        {/* <UserStatusPopup /> */}
        {/* <OtpPopup /> */}
        {/* <SuccessCard/> */}


      </div>

    </>
  )
}

export default UserRegistration;
