import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { error } from '../../constants/errorText';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { Puff } from 'react-loader-spinner'
import { path } from '../../constants/path';
import { Button, Input } from 'antd';
import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../config/firebase.config';





const Otp = () => {
    const [windowHeight , setWindowHeight] = useState(window.innerHeight);
    const [windowWidth , setWindowWidth] = useState(window.innerWidth)
    const [timeLeft, setTimeLeft] = useState(60);


    const [isSent , setIsSent] = useState(false);
    const [isGenerate , setIsGenerate] = useState(false);

    const [mobile , setMobile] = useState("");
    const [otp , setOTP] = useState("");
    const [isError, setIsError] = useState(false);
    const [isOTP, setIsOTP] = useState(false);

    const [loader, setLoader] = useState(false);


  

    useEffect(() => {
        if(isSent){
            if (timeLeft <= 0) return;
            const intervalId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(intervalId);
        
        }
           
      }, [timeLeft,isSent]);
    
      const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  
    const navigate = useNavigate();

    const onChange = (text) => {
        console.log('onChange:', text);
        setOTP(text);
      };

      const clear=()=>{
        console.log('onChge:', );
        setOTP("");
      }
      const sharedProps = {
        clear,
        onChange,
       
      };

    const handleSize =()=>{
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        handleSize();
        addEventListener('resize',handleSize);

        return ()=> removeEventListener('resize',handleSize)
    },[windowWidth])
  
    const clearFields = () => {
      setMobile("");
      setOTP("");
    }

   

    const renderRecaptchaVerifier = () => {
      if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier( auth,'recaptcha-container', {
              'size': 'normal',
              'callback': (response) => {
                  console.log("Captcha verified:", response);
                  otpGenerateHandler();  // Proceed with OTP generation after reCAPTCHA verification
              },
              'expired-callback': () => {
                  console.log("Captcha expired. Please retry.");
              }
          },);
      }
  };

  const otpGenerateHandler =async () => {
      if (!mobile || mobile.length !== 10) {
          setIsError(true);
          return;
      }      

      renderRecaptchaVerifier();

      const phoneNumber = `+91${mobile}`;

      const appVerifier = window.recaptchaVerifier;
      
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              console.log("OTP sent: ", confirmationResult);
              setIsSent(true);
              setIsGenerate(true);
          })
          .catch((error) => {
              console.error("Error sending OTP: ", error);
              showErrorMessage(error)
          });
  };

  const otpVerification = async () => {
      if (!otp || otp.length !== 6) {
          setIsOTP(true);
          return;
      }

      try {
          const confirmationResult = window.confirmationResult;
          await confirmationResult.confirm(otp); 
          showSuccessMessage("Login successful.")
          navigate(path.home); 
      } catch (error) {
          console.error("OTP verification failed: ", error);
          showErrorMessage(error)
      }
  };

  
   
   

  return (
    
    <div>
    <div id="recaptcha-container"></div>
    <div style={{ width:windowWidth, height: windowHeight }} className="row-center">
        <div
          style={{
            height: 600,
            width:windowWidth < 1500? (windowWidth * 1.2) / 1.5 : (windowWidth * 1.2) / 2,
            backgroundColor: '#fff',
            boxShadow: '5px 1px 15px 0 gray',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ width: '50%', height: '100%' }} className='row-center'>
            <img
              src={require('../../assets/images/icons/otp.jpeg')}
              style={{
                height: '70%',
                width: '90%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ width: '50%', height: '100%' }}>
            <div style={{ height: '35%', width: '100%' }} className="row-center">
              <div style={{ width: '33%', height: '70%' }}>
                <img
                  src={require('../../assets/images/logo/LOGO.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
            <div style={{ height: '5%', width: '100%',marginBottom:10}} className="row-bottom">
              <div style={{ fontWeight: '500', color: '#000', fontSize: '18px' }}>
                {
                    isSent ?
                    "OTP is sent to your register mobile number.":
                    "Enter your register mobile number for OTP generation."
                }
                 
                </div>
            </div>
            <div style={{ height: '57%', width: '100%', paddingTop: 20 }} className="row-top">
              <div style={{ width: '75%' }}>
                {
                    isSent?
                    <div>
                    <Input
                      className="input-field"
                      type="number" name="otp"
                      maxLength={6}
                      placeholder=""
                      style={{letterSpacing:"20px",textAlign:"center"}}
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                   
  
    {
                      isOTP && (!otp || otp.length !== 6) ?
                        <div className="error-text">{error.otp}</div> :
                        null
                    }
                    </div>:
                    <div>
                    <Input
                      className="input-field"
                      type="number" name="mobile"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
  
                    {
                      isError && (!mobile || mobile.length !== 10) ?
                        <div className="error-text">{error.mobile}</div> :
                        null
                    }
  
                  </div>

                }
                
               
                <Button type='primary' block  onClick={
                  ()=>{
                    isSent ?
                    otpVerification():
                    otpGenerateHandler()
                  }
                 
                  }>
                  {loader ?
                    <div className='row-center'>
                      <Puff
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="puff-loading"
                      />
                    </div> :(
                     isSent ? 
                     "Verify OTP":
                    "Generate OTP")}
                </Button>
{
  isGenerate?
  <p>{timeLeft === 0 ? <Link style={{textDecoration:"none"}} to="" onClick={()=>{setTimeLeft(60);setTimeout(()=>setIsSent(true),100);}} >Resend OTP</Link>  :"Resend OTP in " + formatTime(timeLeft) +" min."}</p>
:null
}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Otp;
