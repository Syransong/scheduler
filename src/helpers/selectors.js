function getAppointmentsForDay(state, day) {
  const result = [];
  const aptID = [];

  const aptDays = state.days;
  const apts = state.appointments;

  for (let dayObj of aptDays) {
    if (dayObj.name === day) {
      aptID.push(...dayObj.appointments);
    }
  }

  for (let key in apts) {
    if (aptID.includes(apts[key].id)) {
      result.push(apts[key]);
    }
  }
  return result;
};

function getInterview(state, interview){
  if (!interview) {
    return null;
  }
 
  let result = {};
  const interviewers = state.interviewers;
  const interviewerID = interview.interviewer;
  // console.log("interviewers", interviewers);
  // console.log({interviewerID});

  for (let interviewer in interviewers) {
    if (interviewerID === interviewers[interviewer].id) {

      result = {
        ...interview,
        interviewer: {...interviewers[interviewer]}
      }
    }
  }

  return result;
}

function getInterviewersForDay(state, day) {
  const result = [];
  const aptID = [];

  const aptDays = state.days;
  const apts = state.interviewers;

  for (let dayObj of aptDays) {
    if (dayObj.name === day) {
      aptID.push(...dayObj.interviewers);
    }
  }

  for (let key in apts) {
    if (aptID.includes(apts[key].id)) {
      result.push(apts[key]);
    }
  }
  return result;
};

// function getSpotsforDay (dayObj, appointments) {
//   let spots = 0;

//   console.log("dayObj", dayObj);
//   console.log("appointments", appointments);
//   for (let id of dayObj.appointments) {
//     const appointment = appointments[id];
//     if (!appointment.interview) {
//       spots++;
//     }
//   }

//   return spots;
// };

// function updateSpots (dayName, days, appointments) {
//   //Find the day Object 
//   const dayObj = days.find(day => day.name === dayName);
//   console.log("dayObj", dayObj)

//   //Calculate the number of spots for this day
//   const spots = getSpotsforDay(dayObj, appointments);
//   console.log("spots", spots);

//   const newDay = { ...dayObj, spots};
//   console.log("newDay", newDay);

//   const newDays = days.map(day => day.name === dayName ? newDay : day);
//   console.log("newDays", newDays);
  
//   return newDays;
// }

function updateSpots (days, id, value) {
  days.forEach(day => {
    if (day.appointments.includes(id)) {
      day.spots += value
    }
  })
  return days;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay, updateSpots } ;