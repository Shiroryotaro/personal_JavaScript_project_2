import{ useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { deleteOneGameEngineEntryById, getOneGameEngineEntryById } from '../services/GameEngineEntryServices';
import { getOneUserById } from '../services/UserServices';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { use } from 'react';

const GameDevViewById = () => {

    const navigate = useNavigate()

    const {id} = useParams()
    const [userData, setUserData] = useState({})
    const [gameEntry, setGameEntry] = useState({})
    const [groupedEntries, setGroupedEntries] = useState({})

    useEffect( () => {
        getOneGameEngineEntryById(id)
            .then(entry => {
                setGameEntry(entry)

                if(entry.userId) {
                    getOneUserById(entry.userId)
                    .then(user => setUserData(user))
                    .catch(error => console.log("Error fetching user:", error))
                }
            })
            .catch(error => console.log("GameDevViewById", error))
    },[id])

    const deleteEntry = (id) => {
        deleteOneGameEngineEntryById(id)
        .then( () => setGameEntry(prev => prev.filter(entry => entry._id != id)),
    navigate('/gamedev/catalog'))
    .catch(error => console.log("GameDevViewById", error))
    }


    return (
    <Container id='gamedevviewbyid' className="d-flex flex-column p-4">
        <h1>Submitted By:{userData.firstName} {userData.lastName}</h1>
        <h3>Game Engine Details</h3>
        <Container className="mb-4 p-3 border">
            <h2><strong>Engine Name:</strong>{gameEntry.gameEngineName}</h2>
            <p><strong>Reason/Description:</strong> {gameEntry.reason_description}</p>
            <p><strong>OpenSource?:</strong> {gameEntry.openSource ? <FaCheck/> : <FaXmark/>}</p>
            <p><strong>Supported Languages:</strong> {gameEntry.supportedLanguages}</p>
            <p><strong>Notable Games Developed:</strong> {gameEntry.notableGamesDeveloped}</p>
            <p><strong>Year Released:</strong> {gameEntry.yearReleased}</p>
            <p><strong>Cost:</strong> {gameEntry.cost}</p>
        </Container>
        <Container id='innergamedevviewbyid' className="mt-4">
            <Link to={'/gamedev/catalog'} className="btn btn-secondary me-2">Go Back to Catalog</Link>
            <Button variant="danger" onClick={() => deleteEntry(id)}>Delete Entry</Button>
        </Container>
    </Container>
    );
};

export default GameDevViewById;