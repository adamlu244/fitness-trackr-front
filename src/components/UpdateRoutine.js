import { useState } from "react";
import { updateRoutine } from "../utils/API";
import { Button, Form } from "react-bootstrap";

const UpdateRoutine = ({routinesList, setRoutinesList, token, routineId}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEditRoutine(event) {
    try {
      event.preventDefault();

      if (!name && !goal) {
        setErrorMessage("All fields must be filled out to edit your routine");
      } else {
        setErrorMessage("Your routine has been updated!");
        const routine = {
          name,
          goal
        }

        setName("");
        setGoal("");

        const response = await updateRoutine(routine, token, routineId);

        if (response.error) {
          setErrorMessage(`Routine with the name ${name} already exists`);
        } else {
          const filteredRoutinesList = routinesList.filter(routine => routine.id !== routineId);
          setRoutinesList([...filteredRoutinesList, response]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      <p>{errorMessage}</p>

      <Form onSubmit={submitEditRoutine}>

        <Form.Group>

          <Form.Label>New routine name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

        </Form.Group>

        <Form.Group>

          <Form.Label>New goal: </Form.Label>
          <Form.Control
            type="text"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            required
          />

        </Form.Group>

        <Button type="submit" className="mt-3">Submit</Button>

      </Form>

    </div>
  )
}

export default UpdateRoutine;