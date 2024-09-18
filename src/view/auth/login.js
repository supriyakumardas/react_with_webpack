import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { error } from '../../constants/errorText';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { Puff } from 'react-loader-spinner'
import { path } from '../../constants/path';
import { Button, Input } from 'antd';
import authService from '../../service/authService';



const Login = () => {
    const [windowHeight , setWindowHeight] = useState(window.innerHeight);
    const [windowWidth , setWindowWidth] = useState(window.innerWidth)

    const [mobile , setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loader, setLoader] = useState(false);
  
    const navigate = useNavigate();

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
      setPassword("");
    }
  
    const loginHandler = async () => {
      try {
        if (!mobile || mobile.length !== 10) {
          setIsError(true)
          return;
        }
        if (!password || password.length < 8) {
          setIsError(true)
          return;
        }
        setLoader(true);
        const payload = {}
        payload.mobile = mobile;
        payload.password = password;

        console.log(payload)
  
        const res = await authService.userLogin(payload);
  
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.userId);
          showSuccessMessage(res.data.message)
          setTimeout(() => {
            navigate(path.home);
            clearFields();
            setLoader(false)
          }, 1000);
  
        }
        setLoader(false)

      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message)
        setLoader(false)
      }
    };
  
    const passwordHandler=()=>{
      setShowPassword(!showPassword)
    }
   

  return (
    <>
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
          <div style={{ width: '50%', height: '100%' }}>
            <img
              src={require('../../assets/images/icons/login_icon.jpg')}
              style={{
                height: '80%',
                width: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ width: '50%', height: '100%' }}>
            <div style={{ height: '35%', width: '100%' }} className="row-bottom">
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
            <div style={{ height: '8%', width: '100%' }} className="row-bottom">
              <div style={{ fontWeight: 'bolder', color: '#000', fontSize: '24px' }}>Account Sign In</div>
            </div>
            <div style={{ height: '57%', width: '100%', paddingTop: 20 }} className="row-top">
              <div style={{ width: '75%' }}>
                <div>
                  <Input
                    className="input-field"
                    type="number" name="moble"
                    placeholder="Enter mobile number"
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
                <div>
                  <div style={{display:"flex"}}>
                    <div style={{width:"100%"}}>
                    <Input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                    </div>
                 
                    
                   <div style={{marginLeft:"-30px",marginTop:"10px",zIndex:1}} >
                    { showPassword ?
                    <img 
                    onClick={passwordHandler}
                    src={require("../../assets/images/icons/eye.png")} 
                    style={{height:"15px",width:"20px"}}
                     /> :
                      <img 
                      onClick={passwordHandler}
                   src={ require("../../assets/images/icons/eye-hide.png")} 
                   style={{height:"20px",width:"20px",}}
                    /> }
                 
                 </div>
                
                  </div>
                  
                  {
                    isError && (!password || password.length < 8) ?
                      <div className="error-text">{error.password }</div> :
                      null
                  }
                </div>

                <Button type='primary' block  onClick={loginHandler}>
                  {loader ?
                    <div className='row-center'>
                      <Puff
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="puff-loading"
                      />
                    </div> :

                    "Login"}
                </Button>

                <div style={{marginTop:10}}>
                   <span>Don't have an account? <Link to={path.register} style={{textDecoration:"none",color:"#1677ff"}}>Sign up</Link></span>
                </div>

                <div style={{marginTop:10,marginBottom:10}} className='row-center'>
                   <span>OR</span>
                </div>
                <Button  block  onClick={()=>navigate(path.otp)}>
                   Login With OTP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
