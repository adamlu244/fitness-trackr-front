import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createNewActivity } from "../utils/API";

const CreateActivity = ({activitiesList, setActivitiesList, token}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitNewActivity(event) {
    try {
      event.preventDefault();

      const activity = {
        name,
        description
      }

      const response = await createNewActivity(activity, token);

      if (!name && !description) {
        setErrorMessage("All fields must filled out to make a new activity.")
      } else if (response.error) {
        setErrorMessage(`Activity with the name ${name} already exists.`)
      } else {
          setActivitiesList([...activitiesList, response])
          setErrorMessage("Your activity has been created!");
          setName("");
          setDescription("");
        }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <Form onSubmit={submitNewActivity}>

        <Form.Group>

          <Form.Label>Activity name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label>Description: </Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Create Activity</Button>

      </Form>

    </div>
  )
}

export default CreateActivity;