// import { useOutletContext } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import jwtDecode from "jwt-decode";

const Home = ({ token, setToken }) => {

  // const [token] = useOutletContext();

  if (token) {
    const { username } = jwtDecode(token);
    
    return (
      <div style={{ height: "100vh" }}>
        <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '800px' }}>
          <div className="d-flex flex-wrap justify-content-center">
            <Card className="mt-4 d-flex align-items-center" style={{ width: "1000px" }}>
              <Card.Body
                style={{
                  color: "black",
                  fontSize: 30,
                  fontWeight: "bold"
                }}
              >WELCOME {username} TO YOUR PERSONAL FITNESS TRACKR!</Card.Body>
            </Card>
          </div> 
        </Container>
      </div>
    )
  } else {
    return (
      <div style={{ height: "100vh" }}>
        <Container className="mt-4 d-flex justify-content-center" style={{ maxWidth: '800px' }}>
          <div className="d-flex flex-wrap justify-content-center">
            <Card className="mt-4 d-flex align-items-center" style={{ width: "1000px" }}>
              <Card.Body
                style={{
                  color: "black",
                  fontSize: 30,
                  fontWeight: "bold"
                }}
              >WELCOME TO FITNESS TRACKR, PLEASE REGISTER TO BEGIN YOUR FITNESS JOURNEY!</Card.Body>
            </Card>
          </div> 
        </Container>
      </div>
    )
  }

};

export default Home;