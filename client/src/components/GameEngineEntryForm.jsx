import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';
import { createGameEngineEntry, getOneGameEngineEntryById, updateOneGameEngineEntryById } from '../services/GameEngineEntryServices';

const DEFAULT_FORM_DATA = {
    gameEngineName: '',
    reason_description: '',
    openSource: false,
    supportedLanguages: '',
    notableGamesDeveloped: '',
    yearReleased: '',
    cost: ''
}

const GameEngineEntryForm = () => {

    const currentYear = new Date().getFullYear(); // Dynamically get the current year

    const {id} = useParams()
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()

    const updateFormData = (e) => {
        const {name, value, checked, type} = e.target
            if (type === "checkbox"){
                setFormData(prev => ({ ...prev, [name]: checked}))
        }
        else{
            setFormData(prev => ({ ...prev, [name]: value}))
        }
    }

    useEffect( () => {
        if(id){
            getOneGameEngineEntryById(id)
            .then((res) => {
                if (res) {
                    setFormData(res);
                } else {
                    console.error('Received empty data for game engine entry');
                }
            })
            .catch(error => console.log("GameENgineEntryForm.jsx", error))
        }
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const submissionFunction = id ? updateOneGameEngineEntryById : createGameEngineEntry
        submissionFunction(formData)
        .then((res) => {
            console.log("Successfully Submitted", res)
            navigate("/gamedev/catalog")
        })
        .catch(error => setValidationErrors(error))
    }

    return (
    <Container>
        <Row className="justify-content-center align-items-center vh-100">
            <Col xs={12} sm={8} md={6} lg={4}>
                <div id='gameentrydiv'>
                    <h1 className="custom-bg-primary">
                        Create New Game Entry
                    </h1>
                    <Form onSubmit={handleSubmit} id='gameentryform'>
                    <Form.Group className="mb-3" controlId="formGameEngineName">
                            <Form.Label className="custom-text-color2">Game Engine Name</Form.Label>
                            <Form.Control 
                            type="text"
                            name="gameEngineName"
                            value={formData.gameEngineName}
                            onChange={updateFormData}/>
                            {validationErrors.gameEngineName && <p style={{color: "red"}}>{validationErrors.gameEngineName}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formReason_Description">
                            <Form.Label className="custom-text-color2">Reasoning/Description</Form.Label>
                            <Form.Control
                            as="textarea"
                            rows={2}
                            cols={100}
                            placeholder="Enter your reason for use, or why you like it, or anything you think is relevant"
                            name="reason_description"
                            value={formData.reason_description}
                            onChange={updateFormData}/>
                            {validationErrors.reason_description && <p style={{color: "red"}}>{validationErrors.reason_description}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formOpenSource">
                            <Form.Label className="custom-text-color2">Open Source?</Form.Label>
                            <Form.Check
                            type="checkbox"
                            name="openSource"
                            checked={formData.openSource}
                            onChange={updateFormData}/>
                            {validationErrors.openSource && <p style={{color: "red"}}>{validationErrors.openSource}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSupportedLanguages">
                            <Form.Label className="custom-text-color2">Supported Language(s)</Form.Label>
                            <Form.Control 
                            as="textarea"
                            rows={2}
                            cols={100}
                            name="supportedLanguages"
                            value={formData.supportedLanguages}
                            onChange={updateFormData}/>
                            {validationErrors.supportedLanguages && <p style={{color: "red"}}>{validationErrors.supportedLanguages}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNotableGamesDeveloped">
                            <Form.Label className="custom-text-color2">Notable Games Developed </Form.Label>
                            <Form.Control
                            type="text"
                            name="notableGamesDeveloped"
                            value={formData.notableGamesDeveloped}
                            onChange={updateFormData}/>
                            {validationErrors.notableGamesDeveloped && <p style={{color: "red"}}>{validationErrors.notableGamesDeveloped}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formYearReleased">
                            <Form.Label className="custom-text-color2">Year of Release</Form.Label>
                            <Form.Control
                            type='number'
                            name='yearReleased'
                            value={formData.yearReleased}
                            onChange={updateFormData}
                            min={1900}
                            max={currentYear}/>
                            {validationErrors.yearReleased && <p style={{color: "red"}}>{validationErrors.yearReleased}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCost">
                            <Form.Label className="custom-text-color2">Cost</Form.Label>
                            <Form.Control
                            type='text'
                            name='cost'
                            value={formData.cost}
                            onChange={updateFormData}
                            />
                            {validationErrors.cost && <p style={{color: "red"}}>{validationErrors.cost}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Entry
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
    );
};

export default GameEngineEntryForm;