import { useState, useEffect} from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => {
    setState({...state, day})
  };

  // Book Interview Function
  function bookInterview(id, interview) {

    const appointment = { 
      ...state.appointments[id],
      interview: { ...interview }
    }
    
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    const days = updateSpots(state.day, state.days, state.appointments);

    return axios
      .put(`api/appointments/${id}`, {interview})
      .then(
        setState({ 
          ...state,
          appointments,
          days
        })
      )
      .catch(err => console.log(err))
  }

  // Cancel Interview Function
  function cancelInterview(id) {
    const appointment = { 
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    const days = updateSpots(state.day, state.days, state.appointments);

    return axios
      .delete(`api/appointments/${id}`, {})
      .then((res) => {
        setState({ 
          ...state,
          appointments,
          days
        })
      })
      .catch(err => console.log(err))
    };

    // const baseURL = "http://localhost:8001/api";

    // Fetch API 
    useEffect(() => {
    
      Promise.all([
        // axios.get(`${baseURL}/days`),
        // axios.get(`${baseURL}/appointments`),
        // axios.get(`${baseURL}/interviewers`)
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then((all) => {
        // console.log(all);
        setState(prev=> ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
         }))
      })
    }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
