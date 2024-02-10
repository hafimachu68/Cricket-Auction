import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  
}
from 'mdb-react-ui-kit';
import{useNavigate}from 'react-router-dom';


import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { toastError, toastSucess } from '../constants/Plugin';
import { useDispatch } from 'react-redux';
import { setuserDetail } from '../Toolkit/userSlice';



function Loginbox({setBoxName}) {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const navigate = useNavigate();
 const dispatch=useDispatch()
 const handleSignup=()=>{
    setBoxName('signup')
   }

   const handleLogin=()=>{
    try {
      if (email&& password) {
        axios.post(`${BASE_URL}/auth/login`,{email,password}).then((res)=>{
        if (res.data.message==="login sucessfull" && res.data.token) {
          localStorage.setItem('token',res.data.token)
          const parsedToken=parseJwt(res.data.token)
          localStorage.setItem('user',JSON.stringify(parsedToken))
           dispatch(setuserDetail(parsedToken))
          toastSucess("login sucessfull")
          navigate('/home')
          
        }

                if (res.data.message==="invalid credentials") {
                  toastError("invalid credentials")
                }

          
        })
        
      }else{
        alert("credentials are not filled")
      }
      
    } catch (error) {
      
    }
   }
  
   function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



  return (
    

        <MDBCol md='4' className='position-relative bg'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

             
              <button className='w-100 mb-4 btn text-light  border rounded-2' style={{background: '  #010203'}} size='md' onClick={handleLogin} >Login</button>

              <div className="text-center">

                <p>dont have an account?<span onClick={handleSignup} >Register here</span></p>

               
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

     
  );
}

export default Loginbox;