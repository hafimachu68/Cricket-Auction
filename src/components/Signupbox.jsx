import React, {useState } from 'react';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
import axios from 'axios'
import { BASE_URL } from '../constants/constants';

function Signupbox({setBoxName}) {
  const handleLogin=()=>{
    setBoxName('login')
   }
const [signUpdata, setSignUpdata] = useState({
  fName:'',
  lName:'',
  email:'',
  password:''
})
  
const handleRegister=()=>{
  try {
    axios.post(`${BASE_URL}/auth/signup`,signUpdata).then((res)=>{
      if(res.data.message==="signup data successfull"){
        setBoxName('login')

      }
      if(res.data.message==="email already exist"){
        alert("email already exist")

      }
    })
    
    
  } catch (error) {
    console.log("error")
    
  }
 
}
  return (
    

        <MDBCol md='4' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass'>
               
            <MDBCardBody className='p-5'>
            <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'placeholder='First name' value={signUpdata.fName} onChange={(e)=>{setSignUpdata({...signUpdata,fName:e.target.value})}} />
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'placeholder='Last name'value={signUpdata.lName} onChange={(e)=>{setSignUpdata({...signUpdata,lName:e.target.value})}} />
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' placeholder='Email' value={signUpdata.email} onChange={(e)=>{setSignUpdata({...signUpdata,email:e.target.value})}}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' placeholder='Password'value={signUpdata.password} onChange={(e)=>{setSignUpdata({...signUpdata,password:e.target.value})}}/>
            
              <button className='w-100 mb-4 btn btn-primary border rounded-2' size='md' onClick={handleRegister} >Signup</button>

              <div className="text-center cursor-pointer font-italic">

                <i onClick={handleLogin}> go to Login</i>
                 </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

     
  );
}

export default Signupbox;