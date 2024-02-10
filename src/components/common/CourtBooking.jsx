import React, { useEffect, useState } from 'react'
import './CoutBooking.css'
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBFile,
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import Axiosinstance from '../../config/Axiosinstances';
import { BASE_URL, TIMINGS } from '../../constants/constants';
import { ModalView } from './Modal';
import { toastError, toastSucess, toastWinner } from '../../constants/Plugin';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import optn from '../images/optn.png'; // Import your logo image
import Timer from './timer';
import T1 from '../images/T1.jpeg'; // Import your logo image
import T2 from '../images/T2.jpeg'; // Import your logo image
import T3 from '../images/T3.jpeg'; // Import your logo image
import T4 from '../images/te.jpeg'; // Import your logo image
import confetti from 'canvas-confetti';





function CourtBooking() {

  const { id } = useParams();
  const [singleCourtData, setSingleCourtData] = useState({});
  const [modalOpen, setModalOpen] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState({ startDate: '', endDate: '', cost: '' });
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [selectedTiminigs, setSelectedTiminigs] = useState([]);
  const [filterTimings, setFilterTimings] = useState(TIMINGS)
  const [slotData, setSlotData] = useState([])
  const [inputDate, setInputDate] = useState()
  const [bookingModal, setBookingModal] = useState()
  const [selectedSlot, setSelectedSlot] = useState(null)
  const {userDetail}=useSelector(state=>state.user)
  const [editedCourtData, setEditedCourtData] = useState({
    courtName: '',
    location: '',
    type: '',
    address:'',
    about: '',
    image: null
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // const [teamOpen, setteamOpen] = useState(false);
  // const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null); // State to store the selected group
  const [confettiTriggered, setConfettiTriggered] = useState(false); // State to track if confetti animation is triggered


  // const handleTeamSelection = (group) => {
  //   setSelectedTeam(group);
  //   setteamOpen(true); 
  // };
  
 
  function getImageForTeam(group) {
    switch (group) {
      case 'BLASTERS PADNE CENTRAL':
        return T1; // Assuming T1 is the image source for Blasters Padne Central
      case 'VADAKKEPURAM WARRIORS':
        return T2; // Assuming T2 is the image source for Vadakkepuram Warriors
      case 'THEKKEPURAM TIGERS':
        return T3; // Assuming T3 is the image source for Thekkepuram Tigers
      case 'EAGLES EDACHAKAI':
        return T4; // Assuming T4 is the image source for Eagles Edachakai
      default:
        return null;
    }
  }
  

 
  const navigate=useNavigate()
  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setEditedCourtData({ ...editedCourtData, [e.target.name]: e.target.files[0] });
    } else {
      setEditedCourtData({ ...editedCourtData, [e.target.name]: e.target.value });
    }
  };


  useEffect(() => {
    getSingleCourtData()
    getTimeSlotData(new Date())

  }, [])

  useEffect(() => {

    getFilterTimeSlot()

  },[selectedTiminigs]);

  const getSingleCourtData = () => {
    Axiosinstance.get('/users/getSingleCourtData', { params: { courtId: id } }).then((res) => {
      setSingleCourtData(res.data)
      console.log(res.data)
    }).catch((err) => {
      if (err.response.data.message==='unauthorized user')
      { localStorage.clear()
         navigate('/')
   }
    });
  }

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append('courtName', editedCourtData.courtName);
    formData.append('location', editedCourtData.location);
    formData.append('type', editedCourtData.type);
    formData.append('about', editedCourtData.about);
    formData.append('address', editedCourtData.address);
    formData.append('image', editedCourtData.image);

    Axiosinstance.put(`/admin/updateCourtData/${id}`, formData)
      .then((res) => {
      toastSucess('Court data updated successfully');
        setModalOpen(false);
      })
      .catch((err) => {
        toastError('Failed to update court data');
        console.log(err);
      });
  };
  const handleDelete = async () => {
    try {
      // Perform deletion action with itemIdToDelete   
      await Axiosinstance.delete(`/admin/deleteData/${id}`);
      toastSucess('Item deleted successfully');
      navigate('/');
    } catch (error) {
      toastError('Failed to delete item');
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  
  const handleGroupSelection = (group) => {
    const dataToSend = {
        courtName: singleCourtData.courtName,
        location: singleCourtData.location,
        about: singleCourtData.about,
        image: singleCourtData.courtPic,
        price:inputValue,
        group: group // Assuming group is passed as a parameter
    };

    Axiosinstance.post('/users/groups', dataToSend)
        .then((res) => {
            setSelectedGroup(group); // Store the selected group first
            setConfettiTriggered(true); // Trigger confetti animation
            handleConfetti()
            toastWinner("Congratulations! You're the winner!🎉🥳🎉🏆");
        })
        .catch((err) => {
            toastError('Failed to add court data to group');
            console.error(err);
        });
};




const handleConfetti = () => {
  setConfettiTriggered(true); // Trigger confetti animation
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      navigate('/');
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

useEffect(() => {
  // Set the default value when singleCourtData is available
  if (singleCourtData?.about) {
    setInputValue(singleCourtData?.about);
  }
}, [singleCourtData]);

const handleAddValue = () => {
  setInputValue(parseInt(inputValue) + 500);
};

const handleAdValue = () => {
  setInputValue(parseInt(inputValue) + 1000);
};



useEffect(() => {
  const handleKeyPress = (event) => {
      if (event.key === '1') {
          setInputValue(prevValue => parseInt(prevValue) + 500); // Update state with previous value + 500
      } else if (event.key === '2') {
          setInputValue(prevValue => parseInt(prevValue) + 1000); // Update state with previous value + 1000
      }
  };

  // Add event listener for keydown event
  window.addEventListener('keydown', handleKeyPress);

  // Remove event listener when component unmounts
  return () => {
      window.removeEventListener('keydown', handleKeyPress);
  };
}, []); 



  // const getLatestUpdatedData= (courtId) => {
  //     Axiosinstance.get('/users/getLatestUpdatedData', { params: { courtId: courtId } })
  //         .then((res) => {
  //             console.log('Latest Date:', res.data.latestDate);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // };

  const handleSlot = (e) => {
    setTimeSlot({ ...timeSlot, [e.target.name]: e.target.value })
  };



  const getFilterTimeSlot = () => {
    if (selectedTiminigs.length === 0) {
      setFilterTimings(TIMINGS);

    } else {
      const tempArray = []
      for (let slot of TIMINGS) {
        let flag = false
        for (let sSlot of selectedTiminigs) {
          if (slot.id === sSlot.id) {
            flag = true
          }
        }

        if (!flag) {
          tempArray.push(slot)
        }
      }
      setFilterTimings(tempArray)
    }
  }

  const handleCreateSlot = () => {
    try {
      Axiosinstance.post('/admin/addTimeSlotData', { ...timeSlot, selectedTiminigs, courtId: id }).then((res) => {
        setModalOpen(false)
        toastSucess('court slots added sucessfully')

      })

    } catch (err) {
      toastError('something went wrong')
      console.log(err)
      if (err.response.data.message==='unauthorized user')
      { localStorage.clear()
         navigate('/')
   }
    }
  }

  const getTimeSlotData = (date = new Date()) => {
    Axiosinstance.get('/users/dayWiseTimeSlot', { params: { courtId: id, date: date } }).then((res) => {
      setSlotData(res.data)
      // console.log(res.data)
    }).catch((err) => {
      console.log(err);
      if (err.response.data.message==='unauthorized user')
      { localStorage.clear()
         navigate('/')
   }
    })
  }


  const intiateBooking = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await Axiosinstance.post("/payment/orders", { slotId: selectedSlot._id });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_z93Zp9rqzCo9bC", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "My Court.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          slotId: selectedSlot._id

        };

        const result = await Axiosinstance.post("/payment/success", data);
        toastSucess("slot booked successfully");
        setBookingModal(false)
        getTimeSlotData(new Date(inputDate))
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }


  return (
    < >
      <div className='container-fluid full'>
      <div className='single-court-img-box'>
      <Dropdown className="dropdown-overlay">
        <Dropdown.Toggle  id="dropdown-basic" className="op">
          <img
            src={optn}
            alt="Your logo"
            className="d-inline-block align-top optn-img"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={() => setEditModalOpen(true)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => setDeleteModalOpen(true)}>Delete</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
        <img src={`${BASE_URL}/courts/${singleCourtData?.courtPic}`} alt="court " />
        <div className='court-name'>
        <div className="court-details">
  <div className="detail-box">
    <h4 className="detail">NAME: {singleCourtData?.courtName}</h4>
  </div>
  <div className="detail-box">
    <h4 className="detail">CODE: {singleCourtData?.location}</h4>
  </div>
  <div className="detail-box">
    <h4 className="detail">TEAM: {singleCourtData?.address}</h4>
  </div>
  <div className="detail-box">
    <h4 className="detail">ROLE: {singleCourtData?.type}</h4>
  </div>
  <div className="detail-box">
    <h4 className="detail">BASE POINT: {singleCourtData?.about}</h4>
  </div>
</div>



        </div>
      </div>
      <div className="d-flex">
        <marquee
          behaviour="scroll"
          direction="right"
          className="rolling booking">
          <h3>CONFIRM YOUR PLAYER AT THE EARLIEST</h3>
        </marquee>
      </div>
      <div className='timer-overlay'>
       <Timer/>
             </div>
             <div className="input-overlay">
          <input
            className='in'
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
             </div>
          
             <div className="group-buttons pb-2 text-center">
               <h1 className='ms'>TEAM'S</h1>
        <button className="btn" onClick={() => handleGroupSelection('BLASTERS PADNE CENTRAL')} >
          <img src={T1} alt="Group A" className="button-icon" />
        </button>
        <button className="btn" onClick={() => handleGroupSelection('VADAKKEPURAM WARRIORS')}>
          <img src={T2} alt="Group B" className="button-icon" />
        </button>
        <button className="btn " onClick={() => handleGroupSelection('THEKKEPURAM TIGERS')} >
          <img src={T3} alt="Group C" className="button-icon" />
        </button>
        <button className="btn " onClick={() => handleGroupSelection('EAGLES EDACHAKAI')}>
          <img src={T4} alt="Group D" className="button-icon" />
        </button>
      </div>
      {/* <ModalView modalOpen={teamOpen} setModalOpen={setteamOpen}>
  <div className="modal-content" style={customModalStyles.modalContent}>
    <span className="close-button" style={customModalStyles.closeButton} onClick={() => setteamOpen(false)}>&times;</span>
    {selectedTeam && (
      <img src={getImageForTeam(selectedTeam)} alt={selectedTeam} className="modal-image" />
    )}
  </div>
</ModalView> */}
 {/* Render the button icon image conditionally when confetti animation is triggered */}
 {confettiTriggered && selectedGroup && (
        <div className="confetti-image-container">
          <img src={getImageForTeam(selectedGroup)} alt={selectedGroup} className="confetti-image" />
        </div>
      )}

      <div>
      <button className=' mb-4 btn text-danger  border rounded-2 golden'  onClick={handleAddValue}>Add 500</button>
                <button className=' mb-4 btn text-danger  border rounded-2 golden'  onClick={handleAdValue}>Add 1000</button>

      </div>
        <ModalView modalOpen={modalOpen} setModalOpen={setModalOpen}>


          <div className="modal-content">
            <span className="close-button" onClick={() => setModalOpen(false)}>
              &times;
            </span>
          </div>


          <div >
            <form>
              <h2 className='text-center'>{singleCourtData?.courtName}</h2>
              <h4 className='text-center'>{singleCourtData?.location}</h4 >

              <div className='me-7'>
                <label htmlFor="startDate">Starting Date:</label>
                <input type="date" id="startDate" name="startDate" value={timeSlot.startDate} onChange={handleSlot} required />
              </div>


              <div>
                <label htmlFor="endDate">Ending Date:</label>
                <input type="date" id="endDate" min={timeSlot?.startDate} name="endDate" value={timeSlot.endDate} onChange={handleSlot} required />
              </div>


              <div>
                <label htmlFor="cost">Cost:</label>
                <input type="number" id="cost" name="cost" value={timeSlot.cost} onChange={handleSlot} required />
              </div>


              <div className='cus-drop-down d-inline' onClick={() => { setShowTimeSlot(true) }}>
                Select Time Slot
                {showTimeSlot && (
                  <div className='cus-option' onMouseLeave={() => { setShowTimeSlot(false) }} >

                    <ul>
                      {filterTimings.map((element, index) => (
                        <li onClick={() => setSelectedTiminigs([...selectedTiminigs, element])}>
                          {element.name}

                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className='m-2'>
                {selectedTiminigs?.length > 0 && selectedTiminigs.map((element) => (
                  <span className='border border-1 bg-warning border rounded-2 border-dark p-1'>
                    {element.name}
                  </span>
                ))
                }

              </div>
            </form>
            <div className='p-3'>
              <button className='btn btn-primary mt-3 border rounded-2 w-100 ' type="submit" onClick={handleCreateSlot} >
                Book Court
              </button>

            </div>
          </div>

        </ModalView>

        <ModalView modalOpen={bookingModal} setModalOpen={setBookingModal}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setBookingModal(false)}>
              &times;
            </span>
          </div>

          <div><h2 className='text-center'>{selectedSlot?.court?.courtName}</h2></div>
          <div>Date : {new Date(selectedSlot?.date).toString().slice(0, 16)}</div>
          <div>Slot : {selectedSlot?.slot?.name}</div>
          <div>Cost : {selectedSlot?.cost}</div>
          <div>Address : {selectedSlot?.court?.address}</div>
          <button className='btn btn-primary mt-3 border rounded-2 w-100 ' type="submit" onClick={intiateBooking} >
            Book Now
          </button>

        </ModalView>
        <ModalView modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
      <div className="modal-content ">
        <span className="close-button" onClick={() => setEditModalOpen(false)}>&times;</span>
        <h2 className='text-center'>Edit Court Data</h2>
        <MDBValidation>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.courtName}
              name='courtName'
              onChange={handleInputChange}
              id='courtName'
              required
              label='PLAYER NAME'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.location}
              name='location'
              onChange={handleInputChange}
              id='location'
              required
              label='CODE'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.type}
              name='type'
              onChange={handleInputChange}
              id='type'
              required
              label='ROLE'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.address}
              name='address'
              onChange={handleInputChange}
              id='address'
              required
              label='TEAM'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.about}
              name='about'
              onChange={handleInputChange}
              id='about'
              type='text'
              required
              label='BASE POINT'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBFile
              name='image'
              onChange={handleInputChange}
              id='image'
              required
              label='TEAM IMAGE'
            />
          </MDBValidationItem>
        </MDBValidation>
        <button className='w-100 mb-4 btn border text-light rounded-2'  style={{background: '  #010203'}} onClick={handleSaveEdit}>Save</button>
      </div>
    </ModalView>
    <ModalView   modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
      <div className="modal-content ">
        <span className="close-button" onClick={() => setDeleteModalOpen(false)}>
          &times;
        </span>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <button className='w-100 mb-4 btn border text-light rounded-2'  style={{background: '  #010203'}}onClick={handleDelete}>Confirm</button>
        <button className='w-100 mb-4 btn border text-light rounded-2'  style={{background: '  #010203'}}onClick={() => setDeleteModalOpen(false)}>Cancel</button>
      </div>
      </ModalView>
      </div>
    </>
  )
}

export default CourtBooking