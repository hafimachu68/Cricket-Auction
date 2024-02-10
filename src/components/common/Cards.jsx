import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardSubTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import { BASE_URL } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';
import './cards.css'; // Import your custom CSS file

export default function Cards({court}) {
  const navigate = useNavigate();

 
    return (
      <MDBCard style={{width:'10rem'}} className='col-12 col-md-3 col-lg-4 col-xl-2 col-xxl-1 cd' onClick={()=>navigate(`/courtUserViewPage/${court._id}`)}  >
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={`${BASE_URL}/courts/${court.courtPic}`} fluid alt='...' 
           style={{ maxWidth: '150px', height: '120px', display: 'block', margin: '0 auto', padding:'5px' }} />
        </MDBRipple>
        <MDBCardBody className='car'>
          <MDBCardTitle className='text-center'>{court?.courtName}</MDBCardTitle>
          <button className='w-100 mb-4 btn border text-light rounded-2'  style={{background: '  #010203'}}  >BID NOW</button>
        </MDBCardBody>
      </MDBCard>
    );
 
}
