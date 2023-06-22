import { Card, Button, Offcanvas } from 'react-bootstrap';
import { useState } from "react";

const PublicRoutinesList = ({ routinesList }) => {
  const [routineStates, setRoutineStates] = useState({});

  const handleClose = (routineId) => {
    setRoutineStates((prevState) => ({
      ...prevState,
      [routineId]: false
    }));
  };

  const handleShow = (routineId) => {
    setRoutineStates((prevState) => ({
      ...prevState,
      [routineId]: true
    }));
  };

  return (
    <div>
      {routinesList.length > 0 &&
        routinesList.map((routine) => (
          <div key={routine.id}>
            <Card style={{ width: '97.5%', margin: "10px 0" }} key={routine.id}>
              <Card.Body>
                <Card.Title>{routine.name}</Card.Title>
                <Card.Text>By {routine.creatorName}</Card.Text>
                <Card.Text>{routine.goal}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(routine.id)}>
                  Activities
                </Button>
              </Card.Body>
            </Card>

            {(routine.activities ?? []).map((activity) => (
              <div key={activity.routineActivityId}>
                <Offcanvas show={routineStates[routine.id]} onHide={() => handleClose(routine.id)}>
                  <Card>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Activities for {routine.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Card.Title>{activity.name}</Card.Title>
                      <Card.Text>{activity.description}</Card.Text>
                      <Card.Text>Duration: {activity.duration}</Card.Text>
                      <Card.Text>Count: {activity.count}</Card.Text>
                    </Offcanvas.Body>
                  </Card>
                </Offcanvas>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default PublicRoutinesList;