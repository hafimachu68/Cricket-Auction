import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/common/Navbar';
import Axiosinstance from '../config/Axiosinstances';
import Cards from '../components/common/Cards';
import { useNavigate } from 'react-router-dom';
import '.././pages/css/Home.css'; // Import your custom CSS file
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import c1 from './pictures/L1.jpg';
import c2 from './pictures/L2.jpg';
import c3 from './pictures/L3n.jpeg';
import c4 from './pictures/L4.jpeg';
import c5 from './pictures/L5.jpeg';
import A1 from './pictures/a1n.png';
import A2 from './pictures/A2.jpg';
import A3 from './pictures/A3n.jpg';
import A4 from './pictures/A4.jpg';


function Home() {
  const [courtData, setCourtData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllCourtsData();
    getAllGroupsData();
  };

  const getAllCourtsData = () => {
    Axiosinstance.get('/users/getAllcourtsData')
      .then((response) => {
        setCourtData(response.data);
      })
      .catch((err) => {
        if (err.response.data.message === 'unauthorized user') {
          localStorage.clear();
          navigate('/');
        }
      });
  };

  const getAllGroupsData = () => {
    Axiosinstance.get('/users/getGroups')
      .then((response) => {
        setGroupData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching groups:', err);
      });
  };

  const filterCourtsByGroup = () => {
    const matchedCourtIds = groupData.reduce((acc, group) => {
      const courtIdsInGroup = group.courts.map(court => court.courtName);
      return [...acc, ...courtIdsInGroup];
    }, []);

    const filteredCourts = courtData.filter(court => !matchedCourtIds.includes(court.courtName));
    return filteredCourts;
  };

  return (
    <>
      <NavScrollExample />
      
      <div id="carouselExampleControls" className="carousel slide text-center" data-bs-ride="carousel">
      <Carousel fade controls={false} interval={1000}> {/* Set interval time in milliseconds */}
        <Carousel.Item>
          <img src={c4} className="d-block w-100 " alt="Carousel Image 1" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={c2} className="d-block w-100" alt="Carousel Image 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={c3} className="d-block w-100" alt="Carousel Image 3" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={c1} className="d-block w-100" alt="Carousel Image 4" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={c5} className="d-block w-100" alt="Carousel Image 5" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={A1} className="d-block w-100" alt="Carousel Image 2" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={A2} className="d-block w-100" alt="Carousel Image 3" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={A3} className="d-block w-100" alt="Carousel Image 4" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={A4} className="d-block w-100" alt="Carousel Image 5" />
        </Carousel.Item>
      </Carousel>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      <div className="d-flex ">
        <marquee
          behaviour="scroll"
          direction="right"
          className="rolling booking  mr">
          <h5>" 🏏 PADNE PREMIER LEAGUE 🏏 DUBAI KMCC PADNE PANCHAYAT"</h5>
        </marquee>
      </div>
      <div className="container-fluid f pb-3">
        <u ><h1 className='text-center fw-bold pr  '>PLAYERS</h1></u>

        </div>
      <div className="container-fluid mt-2 f">
       
        <div className="row row-cols-1 row-cols-md-5 mx-2 g-4">
          {/* Render filtered courts */}
          {filterCourtsByGroup().map((court) => (
            <div key={court._id} className="col">
              <Cards court={court} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
