import { deleteRoutine } from "../utils/API";
import { Button } from 'react-bootstrap';

const DeleteRoutine = ({routine, routinesList, setRoutinesList, token}) => {

  async function handleDeleteRoutine () {
    const response = await deleteRoutine(routine.id, token);

    const filteredRoutinesList = routinesList.filter(filteredRoutine => filteredRoutine.id !== response.id);

    setRoutinesList(filteredRoutinesList);

  }

  return (
    <div>

      <Button 
        variant="danger"
        onClick={(event) => {
          event.preventDefault();
          handleDeleteRoutine();
        }}
      >
        Delete Routine
      </Button>

    </div>
  )
}

export default DeleteRoutine;