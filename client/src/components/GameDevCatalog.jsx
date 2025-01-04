import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { getAllUsers } from "../services/UserServices";
import { getAllGameEngineEntries } from "../services/GameEngineEntryServices";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const GameDevCatalog = () => {

    const [users, setUsers] = useState([])
    const [gameEntries, setGameEntries] = useState([])
    const [groupedEntries, setGroupedEntries] = useState([])

    useEffect(() => {
        // Fetch both users and game entries
        Promise.all([getAllUsers(), getAllGameEngineEntries()])
            .then(([userRes, gameEntryRes]) => {
                setUsers(userRes);
                setGameEntries(gameEntryRes);

                // Group game entries by userId
                const entriesByUser = gameEntryRes.reduce((acc, entry) => {
                    if (!acc[entry.userId]) acc[entry.userId] = [];
                    acc[entry.userId].push(entry);
                    return acc;
                }, {});
                setGroupedEntries(entriesByUser);
            })
            .catch(error => console.log("GameDevCatalog.jsx", error));
    }, []);

    return (
    <Container id='containercatalog' className="d-flex">
        {
            users.map( ({_id, firstName, lastName}) => (
                <Container id="gameentrydiv" className="p-2 col-md-3" key={_id}>
                    <h2>{firstName} {lastName}</h2>
                    {groupedEntries[_id] && groupedEntries[_id].length > 0 ? (
                        groupedEntries[_id].map(({ _id: entryId, gameEngineName, openSource, cost }) => (
                            <Container id="gameentryinnerdiv" key={entryId} className="mb-2 p-2 border">
                                <h3>{gameEngineName}</h3>
                                <p><strong>Open Source?</strong>{openSource === true ? <FaCheck /> : <FaXmark/>}</p>
                                <p><strong>Cost:</strong> {cost}</p>
                                <Link to={`/${entryId}/details`}>{gameEngineName}</Link>
                                <Link to={`/${entryId}/edit`}>Edit Game Engine Entry</Link>
                            </Container>
                        ))
                    ) : (
                        <p>No game engine entries submitted.</p>
                    )}
                </Container>
            ))
        }
    </Container>
    );
};

export default GameDevCatalog;