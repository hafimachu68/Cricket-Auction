import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/common/Navbar';
import { Carousel } from 'react-bootstrap';
import Axiosinstance from '../config/Axiosinstances';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import GroupCard from '../components/common/groupcard'; // Make sure to import GroupCard
import '.././pages/css/Home.css'; // Import your custom CSS file
import c1 from './pictures/L1.jpg';
import c2 from './pictures/L2.jpg';
import c3 from './pictures/L3n.jpeg';
import c4 from './pictures/L4.jpeg';
import c5 from './pictures/L5.jpeg';

function Teamsview() {
    const [courtData, setCourtData] = useState([]);
    const navigate= useNavigate();

    useEffect(() => {
        getAllteamsData();
    }, []);

    const getAllteamsData = () => {
        Axiosinstance.get('/users/getAllteamsData')
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

    return (
        <>
            <NavScrollExample />
            <div id="carouselExampleControls" className="carousel slide text-center" data-bs-ride="carousel">
                <Carousel fade controls={false} interval={2000}> {/* Set interval time in milliseconds */}
                    <Carousel.Item>
                        <img src={c4} className="d-block w-100 " alt="Carousel Imge 1" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={c2} className="d-block w-100" alt="Carousel Imge 2" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={c3} className="d-block w-100" alt="Carousel Imge 3" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={c1} className="d-block w-100" alt="Carousel Imge 4" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={c5} className="d-block w-100" alt="Carousel Imge 5" />
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
                <u ><h1 className='text-center fw-bold pr'>TEAM'S</h1></u>
            </div>

            <div className="container-fluid mt-2 L">
                <div className="row row-cols-1 row-cols-md-4 mx-2 g-4 ">
                    {/* Adjusted row-cols-md-4 to display 4 cards in the same row */}
                    {courtData.map((team) => (
                        <div key={team.id} className="col">
                            <GroupCard team={team} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Teamsview;
