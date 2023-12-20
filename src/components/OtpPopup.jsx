/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const OtpPopup = ({ details, setSuccessToggle, setSuccessPageData, otp, setInvalidOtp, otpstatus, toggleResend, resendState, setEdit}) => {
  const [timer, setTimer] = useState(``);
  const [otpState, setOtpState] = useState(false)
  let countDown = new Date(Date.now() + 1.03 * 60 * 1000);



function resendOtp(){
  axios.post('http://192.168.1.61:3000/api/user/registerUser', details)
  .then((res) => {
 console.log(res)
    if(res.data.message){
      setOtpState(!otpState)

    }
  })
}
  useEffect(() => {

    console.log(details.phone,'phone')
    let update = setInterval(function () {
      // get the today's date and time 
      toggleResend(true)
      let now = new Date().getTime();

      //find the difference b/w countDown and now
      let diff = countDown - now;

      //now we are calculating time in days, hrs, minutes, and seconds.

      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      //now output the result in an element with id ="time"

      setTimer(
        `0${minutes} : ${
          String(seconds).length >= 2 ? String(seconds) : "0" + seconds
        }`
      );
      console.log(
        `0 ${minutes}: ${
          String(seconds).length >= 2 ? String(seconds) : "0" + seconds
        }`
      );
      if (diff < 0) {
        this.resendEnabled = true;
        this.message = "OTP expired! Click resend";
        clearInterval(update);
      toggleResend(false)
      setTimer("00 : 00")
      }
    }, 1000);
    return () => {
      clearInterval(update);
    };
  }, [otpState]);
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const focusNext = (index, event) => {
    if (index < 3 && event.target.value !== "") {
      inputRefs[index + 1].current.focus();
    }
  };

  const submitOtp = () => {
    let fullotp = inputRefs.map((input) => input.current.value).join("");

    console.log(fullotp, details);
    // dob: "19-3-2022,";
    // email: "superman@gmail.com";
    // firstName: "superman";
    // languages: (2)[("English", "Malayalam")];
    // phone: 2345543223;
    // reference: "reference";
    // secondName: "g";
    // specialRemarks: "sh";

    const completed_data = {
      first_name: details.firstName,
      last_name: details.secondName,
      email: details.email,

      DOB: details.dob,

      gender: details.gender,
      country: details.country,
      phone: String(details.phone),
      reference: details.reference,
      languages: details.languages.join(""),
      remark: details.specialRemarks,

      OTP: fullotp,
    };

    axios
      .post(
        "http://192.168.1.61:3000/api/user/verify_otp",
        completed_data
      )
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          // DOB: "6-3-2022,";
          // email: "superman@gmail.com";
          // first_name: "superman";
          // id: 1;
          // languages: "EnglishMalayalam";
          // last_name: "g";
          // otp: "";
          // otpTimestamp: "2023-12-10T18:42:58.000Z";
          // phone: 2232323223;
          // reference: "reference";
          // remark: "ss";
          // userId: 4000;
          // verify: "true";
          console.log(res,'done')
          const data = res.data.data;
          setSuccessPageData(data)
          setEdit(false)
          otp(false)
          setSuccessToggle(true)
          console.log(data,'done');
        }
      }).catch((err)=>{
        
        inputRefs.forEach((input) => input.current.value = "")
        setEdit(false)
        setInvalidOtp(true)
      })
  };

  //  function handleCloseOtpPopup() {
  //   setEdit(false);
  //   otp(false);
  //  }





  return (
    <div className="popup-container-wrapper otp">
      <div className="w-100 h-100 container-fluid d-flex justify-content-center align-items-center">
        <div className="row pop-up">
          <div className="col-12 pop-head otp-pop-head d-flex justify-content-center align-items-center">
            Enter your OTP
            {/* <div className="otpCloseButton" role="button" onClick={handleCloseOtpPopup}>x</div> */}
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
                  type="text" 
                  style={{ border: otpstatus ? "2px solid red" : "2px solid black", textAlign: "left" }}
                />
              ))}
            </div>

            <div className="otp-timer color-red">
              {/* Timer logic goes here */}
              <span style={{ color: "green" }}>{timer}</span>
            </div>
            {otpstatus && <span className="color-red">Invalid Otp</span>}
          </div>

          <div className="col-12 pop-btn otp-pop-btn d-flex justify-content-around">
         
           
            


            <button onClick={resendOtp} style={{background:resendState && "gray"}} className="otp-resend ok-otp" disabled = {resendState}>Resend</button>
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
