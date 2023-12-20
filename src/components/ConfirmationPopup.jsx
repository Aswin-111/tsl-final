/* eslint-disable react/prop-types */

import axios from 'axios'
const ConfirmationPopup = ({setEdit, details, otp, setUsers, setUserStatusErr}) => {




function submitEvent() {
  console.log('submit');
  axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/registerUser`, details)
    .then((res) => {
      console.log(res,'line 18');
      if (res.data) {
        setUsers(false)
        setEdit(false);
        otp(true);
      }
    })
    .catch((error) => {
      // Handle the error, log or display a message
      console.error('Error during registration:', error.response.data);
      if(error.response.data){
        otp(false)
        setEdit(false)
        setUserStatusErr({flag:`${error.response.data.flag}`,message:`${error.response.data.message}`})
        setUsers(true)
      }
    });
}

  return (
    <div className='popup-container-wrapper'>
          <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
              <div className="row pop-up">
                  <div className="col-12 pop-head d-flex justify-content-center align-items-center">
                    Confirm your Email & Phone number?
                  </div>

                  <div className="col-12 pop-content d-flex flex-column justify-content-center align-items-center">
                     
                     <p>{details.email}</p>
                      <span style={{"color": "red", "font-weight": "bold"}}> & </span>
                      <p>{details.phone}</p>
                      <span>Would you like to edit your email and phone number?</span>
                  </div>

                  <div className="col-12 pop-btn d-flex justify-content-around align-items-center">
                      <button className="ok" onClick = {()=>submitEvent()}>OK</button>
                      <button className="edit"  onClick = {()=>setEdit(false)}>Edit</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ConfirmationPopup