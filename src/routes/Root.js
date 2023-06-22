import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Root() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("home");
  }

  return (
    <div>

      <header style={{ height: "35px" }}>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="home" className="d-flex align-items-center" style={{ fontFamily: 'Arial', color: '#444' }}>
              <FontAwesomeIcon icon={faHouse} className="house-icon" />
              <span className="ms-2">Fitness Trackr</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"><FontAwesomeIcon icon={faBars} /></Navbar.Toggle>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {token ? <Nav.Link as={Link} to="profile">Profile</Nav.Link> : ""}
                <Nav.Link as={Link} to="activities">Activities</Nav.Link> 
                <Nav.Link as={Link} to="routines">Routines</Nav.Link>
                {!token ? <Nav.Link as={Link} to="register">Register</Nav.Link> : ""}
                {!token ? <Nav.Link as={Link} to="login">Login</Nav.Link> : ""}
                {token ? <Button onClick={logout} variant="light">Log Out</Button> : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>

      <main        
        style={{
          backgroundImage: `url("https://t4.ftcdn.net/jpg/01/13/65/71/360_F_113657105_Bktota7BzQ5cEUcZb4l0D4qSD2Sw08P2.jpg")`,
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          margin: 0
        }}
      >
        
        <Outlet context={[token, setToken]}/>

      </main>

    </div>
  );
}