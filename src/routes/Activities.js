import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ActivitiesList from "../components/ActivitiesList";
import CreateActivity from "../components/CreateActivity";
import { fetchAllActivities } from "../utils/API";
import { Offcanvas, Button } from 'react-bootstrap';

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [show, setShow] = useState(false);
  const [token] = useOutletContext();

  useEffect(() => {
    try {
      fetchAllActivities(token).then((results) => {
        setActivitiesList(results);
      })
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="mt-4">

      <h1>Activities</h1>

      {token ? <Button variant="success" onClick={handleShow} style={{margin: '10px 33px'}}>
        Create new activity
      </Button> : null}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>New Activity</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {token ?
            <CreateActivity
              activitiesList={activitiesList}
              setActivitiesList={setActivitiesList}
              token={token} />
            : null}
        </Offcanvas.Body>
      </Offcanvas>

      <ul>
        <ActivitiesList activitiesList={activitiesList} setActivitiesList={setActivitiesList} token={token} />
      </ul>

    </div>
  )
};

export default Activities;