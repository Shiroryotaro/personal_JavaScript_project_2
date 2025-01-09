import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthServices";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
            await logout()
            localStorage.removeItem("token")
            alert("LOGGED OUT")
            navigate("/gamedev/register/login")
        } catch(error){console.log("Logout Failed", error)}
    }

    return(
        <Navbar expand="lg" className="bg-body-tertiary"bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>GameDev Collaboration</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/gamedev/catalog">Gamedev Catalog</Nav.Link>
                        <Nav.Link as={Link} to="/gamedev/create">Create Game Engine Entry</Nav.Link>
                    </Nav>
                    <Button className="btn-danger ms-3" onClick={ () => handleLogout()}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}