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

export { getAppointmentsForDay, getInterview, getInterviewersForDay } ;