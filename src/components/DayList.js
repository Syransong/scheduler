import React from "react";
import DayListItem from "./DayListItem";
// import classnames from "classnames";

export default function DayList(props) {
  // const array = [] 
  //3 props: days(array), day(string), setDay(function)

  //const map = array.map(x => x * 2);
  //array is props.days
  return (
  <ul>
    {props.days.map(day => {
      return <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    })}
  </ul>
  );
}