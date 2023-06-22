import { useState } from "react"
import { createNewRoutine } from "../utils/API";
import { Button, Form } from "react-bootstrap";

// NOTE: When you create the routine in your profile page, and then navigate to the routines page, 
// the routine won't be generated at the bottom, but somewhere near the bottom for some reason,
// but still works as it should.

const CreateRoutine = ({routines, setRoutines, token}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  async function submitNewRoutine(event) {
    try {
      event.preventDefault();

      if (!name && !goal) {
        setErrorMessage("All fields must filled out to make a new routine")
      } else if (token) {
        setErrorMessage("Your routine has been created!");
        setIsPublic(true);
        const routine = {
          name,
          goal,
          isPublic
        }

        setName("");
        setGoal("");

        const response = await createNewRoutine(routine, token);

        if (response.error) {
          setErrorMessage(`Routine with the name ${name} already exists`);
        } else {
          setRoutines([...routines, response])
        }
      }
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <Form onSubmit={submitNewRoutine}>

        <Form.Group>

          <Form.Label>Routine name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label>Goal: </Form.Label>
          <Form.Control
            type="text"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Create Routine</Button>

      </Form>

    </div>
  )
}

export default CreateRoutine;
