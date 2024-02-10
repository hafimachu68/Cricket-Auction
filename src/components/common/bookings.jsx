// import React from 'react';
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn,
//   MDBRipple
// } from 'mdb-react-ui-kit';
// import { BASE_URL } from '../../constants/constants';

// export default function List({bookingData}) {
//     const [fullDate, time] = bookingData.date.split('T');
//     const [year, month, day] = fullDate.split('-');


//   return (
//     <MDBCard>
//       <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
//         <MDBCardImage src={`${BASE_URL}/courts/${bookingData.courtData.courtPic}`} fluid alt='...' />
//         <a>
//           <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
//         </a>
//       </MDBRipple>
//       <MDBCardBody>
//         <MDBCardTitle>{bookingData.courtData.courtName}</MDBCardTitle>
//         <MDBCardText>
//         Time:  {bookingData.slot.name}
//         </MDBCardText>
//         <MDBCardText>
//         Date:  {day}/{month}/{year}
//            </MDBCardText> 
//            <MDBCardText>
//            Location:  {bookingData.courtData.location}
//         </MDBCardText> <MDBCardText>
//          Address:  {bookingData.courtData.address}
//         </MDBCardText>
//       </MDBCardBody>
//     </MDBCard>
//   );
// }