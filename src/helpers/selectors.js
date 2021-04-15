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

// returns an object iwth the interviewer data 
function getInterview(state, interview){
  if (!interview) {
    return null;
  }
  // returns an object with the interviewer data 
  let result = {};
  
  return result;
}
export { getAppointmentsForDay, getInterview} ;