const BASEURL = `https://fitnesstrac-kr.herokuapp.com/api`;

// (*) means a logged in user should be able to access
// (**) means the owner of the routine/activity can access

// USERS ENDPOINT

// POST /users/register
export async function registerUser(user) {
  try {
    const response = await fetch(`${BASEURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST /users/login
export async function loginUser(user) {
  try {
    const response = await fetch(`${BASEURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// GET /users/me
export async function fetchMe(token) {
  try {
    if (token) {
      const response = await fetch(`${BASEURL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

// GET /users/:username/routines
export async function fetchUsersPublicRoutines(username) {
  try {
    const response = await fetch(`${BASEURL}/users/${username}/routines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ACTIVITIES ENDPOINT

// GET /activities
export async function fetchAllActivities() {
  try {
    const response = await fetch(`${BASEURL}/activities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST /activities (*) 
export async function createNewActivity(activity, token) {
  try {
    const response = await fetch(`${BASEURL}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(activity)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// PATCH /activities/:activityId (*) 
export async function updateActivity(activity, token, activityId) {
  try {
    const response = await fetch(`${BASEURL}/activities/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(activity)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// GET /activities/:activityId/routines
export async function fetchRoutineFeaturingActivity(activityId) {
  try {
    const response = await fetch(`${BASEURL}/activities/${activityId}/routines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ROUTINES ENDPOINT

// GET /routines
export async function fetchAllPublicRoutines() {
  try {
    const response = await fetch(`${BASEURL}/routines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST /routines (*) 
export async function createNewRoutine(routine, token) {
  try {
    const response = await fetch(`${BASEURL}/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(routine)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// PATCH /routines/:routineId (**)
export async function updateRoutine(routine, token, routineId) {
  try {
    const response = await fetch(`${BASEURL}/routines/${routineId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(routine)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// DELETE /routines/:routineId (**)
export async function deleteRoutine(routineId, token) {
  try {
    const response = await fetch(`${BASEURL}/routines/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST /routines/:routineId/activities
export async function attachActivityToRoutine(routine, routineId) {
  try {
    const response = await fetch(`${BASEURL}/routines/${routineId}/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(routine)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ROUTINE_ACTIVITIES ENDPOINT

// PATCH /routine_activities/:routineActivityId (**)
export async function updateRoutineActivity(routineActivity, routineActivityId, token) {
  try {
    const response = await fetch(`${BASEURL}/routine_activities/${routineActivityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(routineActivity)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// DELETE /routine_activities/:routineActivityId (**)
export async function deleteRoutineActivity(routineActivityId, token) {
  try {
    const response = await fetch(`${BASEURL}/routine_activity/${routineActivityId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
