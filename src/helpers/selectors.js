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
// interivew = appointment.interview which is an object containing student and interviewer {student, interviewer}
function getInterview(state, interview){
  if (!interview) {
    return null;
  }
  // returns an object with the interviewer data (student and interview info)
  let result = {}; // student : "", interviewer: { id, name, avatar }
  const interviewers = state.interviewers;
  const interviewerID = interview.interviewer;

  for (let interviewer in interviewers) {
    if (interviewerID === interviewers[interviewer].id) {

      result = {
        ...interview, // copies student and interviewer info 
        interviewer: {...interviewers[interviewer]}
      }
    }
  }
  // result.push(interview.student);
  
  return result;
}
export { getAppointmentsForDay, getInterview} ;