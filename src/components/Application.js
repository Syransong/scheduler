import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import "components/Application.scss";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Kirby Kurbs",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Meta Knight",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = [];

  const setDay = day => {
    setState({...state, day})
  };

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // };

  useEffect(() => {
    const baseURL = "http://localhost:8001/api";
    
    Promise.all([
      axios.get(`${baseURL}/days`),
      axios.get(`${baseURL}/appointments`),
      // axios.get(`${baseURL}/interviewers`)
    ]).then((all) => {
      console.log(all);
      setState(prev=> ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data
       }))
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
          return <Appointment
            key={appointment.id}
            {...appointment}
          />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
