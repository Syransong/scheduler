import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };
    
    console.log("name", interview.student);
    console.log("interviewer", interviewer);
    console.log("props.id", props.id);
    console.log("interview", interview); 
    console.log("props", props);
    console.log("props name", props.name);
    console.log("props.interview", props.interview);
    // console.log("props.interview.student", props.interview.student);
    // {student: student_name, interviewer: 6 (interviewer id)}
    //insterivewr returns an object containing interviewer id, name and avatar URL 
    //getting error that cannot readproperty student of null from <SHOW student={props.interview.student}

    //props.id is the id of that particular day ex. Monday at 2pm would have an id of 2
    Promise.resolve(props.bookInterview(props.id, interview))
      .then(transition(SHOW))
  };

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )} 
    </article>
   );
}
