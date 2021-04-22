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
 
  for (let interviewer in interviewers) {
    if (interviewerID === interviewers[interviewer].id) {

      result = {
        ...interview,
        interviewer: {...interviewers[interviewer]}
      }
    }
  }

  return result;
};

function getInterviewersForDay(state, day) {
  const result = [];
  const aptID = [];

  const aptDays = state.days;
  const apts = state.interviewers;

  for (let dayObj of aptDays) {
    if (dayObj.name === day) {
      aptID.push(...dayObj.interviewers);
    };
  };

  for (let key in apts) {
    if (aptID.includes(apts[key].id)) {
      result.push(apts[key]);
    };
  };
  return result;
};

// Counts the number of spots 
function countSpots (dayObj, appointments) {
  let spotsCounter = 0;

  for (const id of dayObj.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spotsCounter++;
    };
  };
  return spotsCounter;
};

function updateSpots (dayName, days, appointments) {
  const dayObj = days.find(day => day.name === dayName);

  const spots = countSpots(dayObj, appointments);

  const newDay = { ...dayObj, spots};

  const newDays = days.map(day => day.name === dayName ? newDay : day);

  return newDays;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay, updateSpots };