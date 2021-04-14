import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {
 
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview
        ? <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        : <Empty />
      }
    </article>
   );
}

// last appointment should only show the time in the header 
// if (props.interview) {render the Show component } if not, then render Empty 