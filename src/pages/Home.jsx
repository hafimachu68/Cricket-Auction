import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/common/Navbar';
import Axiosinstance from '../config/Axiosinstances';
import Cards from '../components/common/Cards';
import { useNavigate } from 'react-router-dom';
import '.././pages/css/Home.css'; // Import your custom CSS file
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import c1 from './pictures/L1.jpg';
import c2 from './pictures/L2.jpg';
import c4 from './pictures/L4.jpeg';
import c5 from './pictures/L5.jpeg';
import A2 from './pictures/A2.jpg';
import A4 from './pictures/A4.jpg';



function Home() {
  const [playerData, setPlayerData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllPlayersData();
    getAllGroupsData();
  };

  const getAllPlayersData = () => {
    Axiosinstance.get('/users/getAllPlayersData')
      .then((response) => {
        setPlayerData(response.data);
        // console.log(response.data);
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
        console.log(response.data);
      })
      .catch((err) => {
        console.error('Error fetching groups:', err);
      });
  };

  const filterPlyersByGroup = () => {
    const matchedPlayerIds = groupData.reduce((acc, group) => {
      const playerIdsInGroup = group.players.map(player => player.playerName);
      return [...acc, ...playerIdsInGroup];
    }, []);

    const filteredCourts = playerData.filter(player => !matchedPlayerIds.includes(player.PlayerName));
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
          <img src={c1} className="d-block w-100" alt="Carousel Image 4" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={c5} className="d-block w-100" alt="Carousel Image 5" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={A2} className="d-block w-100" alt="Carousel Image 3" />
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
          {filterPlyersByGroup().map((player) => (
            <div key={player._id} className="col">
              <Cards player={player} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
