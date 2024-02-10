import React, { useState, useEffect } from 'react';
import NavScrollExample from './Navbar';
import Axiosinstance from '../../config/Axiosinstances';
import { BASE_URL } from '../../constants/constants';
import Table from 'react-bootstrap/Table';
import './CoutBooking.css';
import { toastError, toastSucess } from '../../constants/Plugin';


function GroupPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await Axiosinstance.get('/users/getgroups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleDeleteCourt = async (groupId, courtId) => {
        try {
            await Axiosinstance.delete(`/users/deletegroup/${groupId}/${courtId}`);
            fetchGroups();
            toastSucess("Deleted successfully");
        } catch (error) {
            toastError('Internal server error');
            console.error('Error deleting court:', error);
        }
    };

    return (
        <div>
            <NavScrollExample/>
            {groups.map(group => (
                <div key={group._id}>
                    <h2 className='text-center' style={{fontFamily:'sans-serif'}} >{group.groupName}</h2>
                    <h4>TOTAL POINTS: 100000</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>PLAYER NAME</th>
                                <th>POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.courts.map(court => (
                                <tr key={court._id}>
                                    <td className='d-flex justify-content-between' >{court.courtName}
                                    <button className='dclose' onClick={() => handleDeleteCourt(group._id, court._id)}>
                                            <span className='de' aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                    <td>{court.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>TOTAL POINTS</td>
                                <td>{group.courts.reduce((acc, court) => acc + parseFloat(court.price), 0)}</td> 
                            </tr>
                            <tr>
                                <td>BALANCE</td>
                                <td>{100000 - group.courts.reduce((acc, court) => acc + parseFloat(court.price), 0) }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
}

export default GroupPage;
