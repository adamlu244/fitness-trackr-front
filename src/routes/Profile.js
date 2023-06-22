import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Card, Button, Offcanvas } from 'react-bootstrap';
import { useOutletContext } from "react-router-dom";
import { fetchUsersPublicRoutines } from "../utils/API";
import CreateRoutine from "../components/CreateRoutine";
import DeleteRoutine from "../components/DeleteRoutine";
import UpdateRoutine from "../components/UpdateRoutine";

const Profile = () => {
  const [routines, setRoutines] = useState([]);
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [token] = useOutletContext();
  const { username } = jwtDecode(token);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
 
  useEffect(() => {
    try {
      fetchUsersPublicRoutines(username).then((results) => {
        setRoutines(results);
      })
    } catch (error) {
      console.error(error);
    } 
  }, [username])


  return (
    <div className="mt-4" style={{ height: "100vh" }}>

      <h1>Welcome {username}!</h1>

      <div>
        <h2>Personal Routines</h2>

        <Button variant="success" onClick={handleShowCreate} style={{margin: '10px 33px'}}>Create Routine</Button>

        {token ? 
          <Offcanvas show={showCreate} onHide={handleCloseCreate}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>New Routine</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <CreateRoutine routines={routines} setRoutines={setRoutines} token={token} /> 
            </Offcanvas.Body>
          </Offcanvas>
        : null}

        <div style={{ height: "100%"}}>
          {
            routines.length > 0 ? 
              routines.map(routine => {
                return (
                  <div key={routine.id}>
                    <Offcanvas show={show} onHide={handleClose}>
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Update Routine</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <UpdateRoutine 
                          routineId={routine.id} 
                          routine={routine} 
                          routinesList={routines} 
                          setRoutinesList={setRoutines} 
                          token={token}
                        />
                      </Offcanvas.Body>
                    </Offcanvas>

                    <Card style={{ width: '95%', margin: "10px 33px" }}>
                      <Card.Body>
                        <Card.Title>{routine.name}</Card.Title>
                        <Card.Text>Goal: {routine.goal}</Card.Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button variant="primary" onClick={handleShow}>Edit</Button>
                          <DeleteRoutine 
                            routine={routine} 
                            routinesList={routines} 
                            setRoutinesList={setRoutines} 
                            token={token}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                    
                    {(routine.activities ?? []).map(activity => {
                      return (
                        <div>
                          <h3>Activity Name: {activity.name}</h3>
                          <h4>Description: {activity.description}</h4>
                          <h4>Duration: {activity.duration}</h4>
                          <h4>Count: {activity.count}</h4>
                        </div>
                      )
                    })}
                  </div>
                )
              }) : null
          }
        </div>
      </div>

    </div>
  )
};

export default Profile;
