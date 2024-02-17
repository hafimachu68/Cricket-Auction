import React, { useState, useEffect } from 'react';
import NavScrollExample from './Navbar';
import Axiosinstance from '../../config/Axiosinstances';
import Table from 'react-bootstrap/Table';
import './Playerbid.css';
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
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleDeleteCourt = async (groupId, plyerId) => {
        try {
            await Axiosinstance.delete(`/users/deletegroup/${groupId}/${plyerId}`);
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
                                <th>#</th>
                                <th>PLAYER NAME</th>
                                <th>POINTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.players.map((player, index) => (
                                <tr key={player._id}>
                                    <td>{index + 1}</td>
                                    <td className='d-flex justify-content-between' >{player.playerName}
                                    <button className='dclose' onClick={() => handleDeleteCourt(group._id, player._id)}>
                                            <span className='de' aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                    <td>{player.bidpoint}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2 ">TOTAL POINTS</td>
                                <td>{group.players.reduce((acc, player) => acc + parseFloat(player.bidpoint), 0)}</td> 
                            </tr>
                            <tr>
                                <td colSpan="2">BALANCE</td>
                                <td>{100000 - group.players.reduce((acc, player) => acc + parseFloat(player.bidpoint), 0) }</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
}

export default GroupPage;
