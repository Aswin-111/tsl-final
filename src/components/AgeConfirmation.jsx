import { useEffect } from "react"

const AgeConfirmationPopup = ({setconfirmAge,allPopupState,setAllPopupState}) => {
  useEffect(()=>{
    if(!allPopupState){
      setAllPopupState(true)
    }
    },[])
  return (
    <div className='popup-container-wrapper'>
          <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
              <div className="row pop-up">
                  <div className="col-12 pop-head d-flex justify-content-center align-items-center">
                    Confirm Minority
                  </div>

                  <div className="col-12 pop-content d-flex flex-column justify-content-center align-items-center">
                     
                      <span style={{fontSize: "1rem"}}>Are You Minor?</span>
                  </div>

                  <div className="col-12 pop-btn d-flex justify-content-around align-items-center">
                      <button className="ok" onClick = {()=>{setconfirmAge(false); setAllPopupState(false)}}>Yes</button>
                      <button className="edit"  onClick = {()=>{setconfirmAge(false); setAllPopupState(false)}}>No</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default AgeConfirmationPopup;