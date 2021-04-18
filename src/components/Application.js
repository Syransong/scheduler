import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  // console.log("state", state);

  const setDay = day => {
    setState({...state, day})
  };

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("dailyAppointments", dailyAppointments);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const baseURL = "http://localhost:8001/api";

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = { 
      ...state.appointments[id],
      interview: { ...interview }
    }
    
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    console.log("interviewOBJ", {interview})

    axios
      .put(`api/appointments/${id}`, {interview})
      .then(
        setState({ 
          ...state,
          appointments
        })
      )
      .catch(err => console.log(err))
  }

  function cancelInterview(id, interview) {
    const appointment = { 
      ...state.appointments[id],
      interview: null
    }
    
    const appointments = {
      ...state.appointments, 
      [id]: appointment
    }

    //delete locally
    // setState({
    //   ...state,
    //   appointments
    // })

    // delete in the database
    axios
      .put(`api/appointments/${id}`, {interview})
      .then(
        setState({ 
          ...state,
          appointments
        })
      )
      .catch(err => console.log(err))
  }
  useEffect(() => {
    
    Promise.all([
      axios.get(`${baseURL}/days`),
      axios.get(`${baseURL}/appointments`),
      axios.get(`${baseURL}/interviewers`)
      // axios.get("/api/days"),
      // axios.get("/api/appointments"),
      // axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all);
      setState(prev=> ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
       }))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          // console.log("interview", interview);
          return <Appointment
            key={appointment.id}
            {...appointment}
            interview={interview}
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
