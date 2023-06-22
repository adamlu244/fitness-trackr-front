import { useState } from "react";
import { updateActivity } from "../utils/API";
import { Button, Form } from "react-bootstrap";

const UpdateActivity = ({activitiesList, setActivitiesList, token, activityId}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEditActivity(event) {
    try {
      event.preventDefault();

      if (!name && !description) {
        setErrorMessage("All fields must filled out to edit your activity")
      } else if (token) {
        setErrorMessage("Activity has been updated!");
        const activity = {
          name,
          description
        }

        setName("");
        setDescription("");

        const response = await updateActivity(activity, token, activityId);

        if (response.error) {
          setErrorMessage(`Activity with the name ${name} already exists`);
        } else {
          const filteredActivitiesList = activitiesList.filter(activity => activity.id !== activityId);
          setActivitiesList([...filteredActivitiesList, response]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <Form onSubmit={submitEditActivity}>

        <Form.Group>

          <Form.Label>New activity name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label>New description: </Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Submit</Button>

      </Form>

    </div>
  )
}

export default UpdateActivity;