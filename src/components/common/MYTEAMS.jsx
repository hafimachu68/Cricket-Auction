import React, { useState, useEffect } from 'react';
import NavScrollExample from './Navbar';
import Axiosinstance from '../../config/Axiosinstances';
import { BASE_URL } from '../../constants/constants';
import Table from 'react-bootstrap/Table';
import './CoutBooking.css';
import { toastError, toastSucess } from '../../constants/Plugin';


function TeamPage() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await Axiosinstance.get('/users/getteams');
          setTeams(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleDeleteCourt = async (groupId, teamId) => {
        try {
            await Axiosinstance.delete(`/users/deleteteam/${groupId}/${teamId}`);
            fetchTeams();
            toastSucess("Deleted successfully");
        } catch (error) {
            toastError('Internal server error');
            console.error('Error deleting court:', error);
        }
    };

    return (
        <div>
            <NavScrollExample/>
            {teams.map(group => (
                <div key={group._id}>
                    <u><h2 className='text-center' style={{fontFamily:'sans-serif'}} >{group.groupName}</h2> </u>
                    {/* <h4>TOTAL POINTS: 100000</h4> */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>TEAM NAME</th>
                                <th>POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.teams.map(team => (
                                <tr key={team._id}>
                                    <td className='d-flex justify-content-between' >{team.teamName}
                                    <button className='dclose' onClick={() => handleDeleteCourt(group._id, team._id)}>
                                            <span className='de' aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                    <td>{team.price}</td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td>TOTAL POINTS</td>
                                <td>{group.teams.reduce((acc, court) => acc + parseFloat(court.price), 0)}</td> 
                            </tr> */}
                            {/* <tr>
                                <td>BALANCE</td>
                                <td>{100000 - group.courts.reduce((acc, court) => acc + parseFloat(court.price), 0) }</td>
                            </tr> */}
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
}

export default TeamPage;
