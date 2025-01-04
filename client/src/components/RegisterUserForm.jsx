import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/AuthServices";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

const DEFAULT_FORM_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


export const RegisterUserForm = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
    const [validationErrors, setValidationErrors] = useState({})

    const updateFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(formData)
        .then((res) => {
            console.log("Registered Successfully:", res)
            navigate("/gamedev/catalog")
        })
        .catch(error => setValidationErrors(error))
    }

    return (
    <Container>
        <Row className="justify-content-center align-items-center vh-100">
            <Col xs={12} sm={8} md={6} lg={4}>
                <div id="registerFormDiv">
                    <h1 className="custom-bg-primary">
                        Register User
                    </h1>
                    <Form onSubmit={handleSubmit} className="custom-bg-info">
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label className="custom-text-color">First Name</Form.Label>
                            <Form.Control 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={updateFormData}/>
                            {validationErrors.firstName && <p style={{color: "red"}}>{validationErrors.firstName}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label className="custom-text-color">Last Name</Form.Label>
                            <Form.Control 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={updateFormData}/>
                            {validationErrors.lastName && <p style={{color: "red"}}>{validationErrors.lastName}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerFormEmail">
                            <Form.Label className="custom-text-color">Email Address</Form.Label>
                            <Form.Control 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={updateFormData}/>
                            {validationErrors.email && <p style={{color: "red"}}>{validationErrors.email}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="registerFormPassword">
                            <Form.Label className="custom-text-color">Password</Form.Label>
                            <Form.Control 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={updateFormData}/>
                            {validationErrors.password && <p style={{color: "red"}}>{validationErrors.password}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label className="custom-text-color">Confirm Password</Form.Label>
                            <Form.Control 
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={updateFormData}/>
                            {validationErrors.password ? <p style={{color: "red"}}>Confirm Password must match Password</p> : null}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register User
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
    );
};
