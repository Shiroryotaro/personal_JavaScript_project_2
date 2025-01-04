import { useState } from "react";
import { login } from "../services/AuthServices";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM_DATA = {
    email: '',
    password: ''
}

export const LoginUserForm = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA)
    const [validationErrors, setValidationErrors] = useState({})

    const updateFormData = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData)
        .then((res) => {
            console.log("Log-In Successfully:", res)
            navigate("/gamedev/catalog")
        })
        .catch(error => {
            console.error("Login error:", error);
            setValidationErrors(error);
        })
    }

    return(
    <Container>
        <Row className="justify-content-center align-items-center vh-100">
            <Col xs={12} sm={8} md={6} lg={4}>
                <div id="loginFormDiv">
                    <h1 className="custom-bg-primary">
                        Login User
                    </h1>
                    <Form onSubmit={handleSubmit} className="custom-bg-info">
                    {validationErrors.general && <p style={{color: "red"}}>{validationErrors.general}</p>}
                        <Form.Group className="mb-3" controlId="loginFormEmail">
                            <Form.Label className="custom-text-color">Email</Form.Label>
                                <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={updateFormData}/>
                                {validationErrors.email && <p style={{color: "red"}}>{validationErrors.email}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginFormPassword">
                            <Form.Label className="custom-text-color">Password</Form.Label>
                                <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={updateFormData}/>
                                {validationErrors.password && <p style={{color: "red"}}>{validationErrors.password}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login User
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
    )
}



