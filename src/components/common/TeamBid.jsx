import React, { useEffect, useState } from 'react'
import './Playerbid.css'
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBFile,
} from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import Axiosinstance from '../../config/Axiosinstances';
import { BASE_URL } from '../../constants/constants';
import { ModalView } from './Modal';
import { toastError, toastSucess, toastWinner } from '../../constants/Plugin';
import Dropdown from 'react-bootstrap/Dropdown';
import optn from '../images/optn.png'; // Import your logo image
import Timer from './timer';
import t1 from '../images/L5.jpeg'; // Import your logo image
import t2 from '../images/L2.jpg'; // Import your logo image
import t3 from '../images/L3.jpeg'; // Import your logo image
import t4 from '../images/L4.jpeg'; // Import your logo image
import confetti from 'canvas-confetti';

function TeamBooking() {

  const { id } = useParams();
  const [singleteamData, setteamCourtData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCourtData, setEditedCourtData] = useState({
    teamName: '',
    basepoint: '',
    budget: '',
    image: null
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null); // State to store the selected group
  const [confettiTriggered, setConfettiTriggered] = useState(false); // State to track if confetti animation is triggered
 
  function getImageForTeam(group) {
    switch (group) {
      case 'BLACK PANTHER ':
        return t1; // Assuming T1 is the image source for Blasters Padne Central
      case 'PERFECT ':
        return t2; // Assuming T2 is the image source for Vadakkepuram Warriors
      case 'IMPERIAL ':
        return t3; // Assuming T3 is the image source for Thekkepuram Tigers
      case 'MAGIC LINE ':
        return t4; // Assuming T4 is the image source for Eagles Edachakai
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
    getSingleteamData()

  }, [])

  const getSingleteamData = () => {
    Axiosinstance.get('/users/getteamPlayerData', { params: { teamId: id } }).then((res) => {
      setteamCourtData(res.data)
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
    formData.append('teamName', editedCourtData.teamName);
    formData.append('basepoint', editedCourtData.basepoint);
    formData.append('budget', editedCourtData.budget);
    formData.append('image', editedCourtData.image);

    Axiosinstance.put(`/admin/updateteamData/${id}`, formData)
      .then((res) => {
      toastSucess('Court data updated successfully');
        setEditModalOpen(false);
      })
      .catch((err) => {
        toastError('Failed to update court data');
        console.log(err);
      });
  };
  const handleDelete = async () => {
    try {
      // Perform deletion action with itemIdToDelete   
      await Axiosinstance.delete(`/admin/deleteteam/${id}`);
      toastSucess('Item deleted successfully');
      navigate('/team');
    } catch (error) {
      toastError('Failed to delete item');
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  
  const handleGroupSelection = (group) => {
    const dataToSend = {
        teamName: singleteamData.teamName,
        basepoint: singleteamData.basepoint,
        budget: singleteamData.budget,
        teamPic: singleteamData.image,
        price:inputValue,
        group: group // Assuming group is passed as a parameter
    };

    Axiosinstance.post('/users/team' ,dataToSend)
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
      navigate('/team');
      return;
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

useEffect(() => {
  // Set the default value when singleteamData is available
  if (singleteamData?.basepoint) {
    setInputValue(singleteamData?.basepoint);
  }
}, [singleteamData]);

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

   return (
    < >
      <div className='container-fluid L'>
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
        <img src={`${BASE_URL}/courts/${singleteamData?.teamPic}`} alt="team" />
        <div className='court-name'>
        <div className="court-details">
  <div className="details-box">
    <h4 className="details">TEAM: {singleteamData?.teamName}</h4>
  </div>
  <div className="details-box">
    <h4 className="details">BASE POINT : {singleteamData?.basepoint}</h4>
  </div>
  <div className="details-box">
    <h4 className="details">BUDGET: {singleteamData?.budget}</h4>
  </div>
</div>
        </div>
      </div>
      <div className="d-flex">
        <marquee
          behaviour="scroll"
          direction="right"
          className="rolling booking">
          <h3>CONFIRM YOUR TEAM AT THE EARLIEST</h3>
        </marquee>
      </div>
      <div className='timer-overlay'>
       <Timer/>
             </div>
             <div className="input-overlay">
          <input
            className='in text-danger'
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
             </div>
          
             <div className="group-buttons pb-2 text-center">
               <h1 className='ms'>TEAM'S</h1>
        <button className="btn" onClick={() => handleGroupSelection('BLACK PANTHER ')} >
          <img src={t1} alt="Group A" className="button-ic" />
        </button>
        <button className="btn" onClick={() => handleGroupSelection('PERFECT ')}>
          <img src={t2} alt="Group B" className="button-ic" />
        </button>
        <button className="btn " onClick={() => handleGroupSelection('IMPERIAL ')} >
          <img src={t3} alt="Group C" className="button-ic" />
        </button>
        <button className="btn " onClick={() => handleGroupSelection('MAGIC LINE ')}>
          <img src={t4} alt="Group D" className="button-ic" />
        </button>
      </div>
      
 {confettiTriggered && selectedGroup && (
        <div className="confetti-image-container">
          <img src={getImageForTeam(selectedGroup)} alt={selectedGroup} className="confetti-image" />
        </div>
      )}

      <div>
      <button className=' mb-4 btn text-danger  border rounded-2 golden'  onClick={handleAddValue}>Add 500</button>
                <button className=' mb-4 btn text-danger  border rounded-2 golden mx-3'  onClick={handleAdValue}>Add 1000</button>

      </div>      
        <ModalView modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
      <div className="modal-content ">
        <span className="close-button" onClick={() => setEditModalOpen(false)}>&times;</span>
        <h2 className='text-center'>Edit Court Data</h2>
        <MDBValidation>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.teamName}
              name='teamName'
              onChange={handleInputChange}
              id='teamName'
              required
              label='TEAM NAME'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.budget}
              name='budget'
              onChange={handleInputChange}
              id='budget'
              required
              label='BUDGET'
            />
          </MDBValidationItem>
          <MDBValidationItem>
            <MDBInput
              value={editedCourtData.basepoint}
              name='basepoint'
              onChange={handleInputChange}
              id='basepoint'
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

export default TeamBooking