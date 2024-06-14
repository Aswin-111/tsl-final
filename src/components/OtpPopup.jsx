import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
 
const OtpPopup = ({ details, setSuccessToggle, setSuccessPageData, otp, setInvalidOtp, otpstatus, toggleResend, resendState, setEdit, allPopupState, setAllPopupState }) => {
  const [timer, setTimer] = useState(``);
  const [otpState, setOtpState] = useState(false)
  const [showCloseBtn, setShowCloseBtn] = useState(false)
 
  let countDown = new Date(Date.now() + 1.03 * 60 * 1000);
 
  function resendOtp() {
    axios.post(`${import.meta.env.VITE_BASE_URL}/user/registerUser`, details)
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          setOtpState(!otpState)
        }
      })
  }
 
  useEffect(() => {
    
    
    
    
    



    console.log(details,'details')
    let update = setInterval(function () {
      toggleResend(true);
      let now = new Date().getTime();
      let diff = countDown - now;
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
 
      setTimer(
        `0${minutes} : ${
          String(seconds).length >= 2 ? String(seconds) : "0" + seconds
        }`
      );
 
      if (diff < 0) {
        setShowCloseBtn(true)
        this.resendEnabled = true;
        this.message = "OTP expired! Click resend";
        clearInterval(update);
        toggleResend(false)
        setTimer("00 : 00")
      } else {
        setShowCloseBtn(false)
      }
    }, 1000);
 
    return () => {
      clearInterval(update);
    };
  }, [otpState]);
 
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));
 
  const focusNext = (index, event) => {
    const value = event.target.value;
 
    // Handle backspace
    if (event.key === "Backspace" && index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
      inputRefs[index - 1].current.value = ""; // Clear the value of the previous field
    } else if (value !== "" && index < 3) {
      // Move to the next field
      inputRefs[index + 1].current.focus();
    }
  };
 
  const submitOtp = () => {
    let fullotp = inputRefs.map((input) => input.current.value).join("");
    console.log(fullotp, details);
 
    const completed_data = {
      first_name: details.firstName,
      last_name: details.secondName,
      email: details.email,
      DOB: details.dob,
      gender: details.gender,
      country: details.country,
      phone: String(details.phone),
      reference: details.reference,
      languages: details.languages.join(","),
      remark: details.specialRemarks,
      OTP: fullotp,
      ref_id:details.ref_id
    };
 
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/user/verify_otp`,
        completed_data
      )
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          const data = res.data.data;
          setSuccessPageData(data)
          setEdit(false)
          otp(false)
          setSuccessToggle(true)
          console.log(data, 'done');
        }
      }).catch((err) => {
        inputRefs.forEach((input) => input.current.value = "")
        setEdit(false)
        setInvalidOtp(true)
      })
  };
 
  function handleCloseOtpPopup() {
    setEdit(false);
    otp(false);
    setAllPopupState(false);
  }
return (
    <div className="popup-container-wrapper otp">
      <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
        <div className="row pop-up">
          <div className="col-12 pop-head otp-pop-head d-flex justify-content-center align-items-center">
            Enter your OTP
            {showCloseBtn && <div className="otpCloseButton" role="button" onClick={() => { handleCloseOtpPopup(); setAllPopupState(false) }}>x</div>}
          </div>
 
          <div className="col-12 mt-2 mb-2 pop-content otp-pop-content d-flex flex-column justify-content-center align-items-center">
            <div className="otp-field-container d-flex align-items-center justify-content-center mb-2">
              {Array.from({ length: 4 }, (_, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  className="otp-input-field m-2"
                  maxLength="1"
                  onChange={(event) => focusNext(index, event)}
                  onKeyDown={(event) => focusNext(index, event)}
                  type="tel"
                  style={{ border: otpstatus ? "2px solid red" : "2px solid black", textAlign: "center" }}
                />
              ))}
            </div>
 
            <div className="otp-timer color-red">
              <span style={{ color: "green" }}>{timer}</span>
            </div>
            {otpstatus && <span className="color-red">Invalid Otp</span>}
          </div>
 
          <div className="col-12 pop-btn otp-pop-btn d-flex justify-content-around">
            <button onClick={resendOtp} style={{ background: resendState && "gray" }} className="otp-resend ok-otp" disabled={resendState}>Resend</button>
            <button className="otp-submit edit" onClick={submitOtp}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OtpPopup;





