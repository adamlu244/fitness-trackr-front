import UpdateActivity from "./UpdateActivity"
import { Card, Button, Offcanvas } from 'react-bootstrap';
import { useState } from "react";

const ActivitiesList = ({ activitiesList, setActivitiesList, token }) => {
  const [show, setShow] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedActivity(null);
  };
  const handleShow = (activity) => {
    setSelectedActivity(activity);
    setShow(true);
  };

  return (
    <div>
      {activitiesList.length > 0 &&
        activitiesList.map((activity) => (
          <Card style={{ width: '97.5%', margin: "10px 0" }} key={activity.id}>
            <Card.Body>
              <Card.Title>{activity.name}</Card.Title>
              <Card.Text>{activity.description}</Card.Text>
              {token && (
                <Button variant="primary" onClick={() => handleShow(activity)}>
                  Edit
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      {selectedActivity && (
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Update Activity</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {token && (
              <UpdateActivity
                activity={selectedActivity}
                activitiesList={activitiesList}
                setActivitiesList={setActivitiesList}
                token={token}
                activityId={selectedActivity.id}
              />
            )}
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </div>
  );
};

export default ActivitiesList;