import React from "react";
import axios from "axios";

import { waitForElement, fireEvent, render, cleanup, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    //1. Render the Application
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];
    
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
   
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving!")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });

  it("loads data, cancels an interview and adds to the spots remaining for Monday by 1", async () => {
    //1. Render the Application
    const { container, debug } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
      
    // 3. Click the "Delete" button on the appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Ensure that the confirmation window displays 
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the confirm button
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Ensure that the deleting status window displays with Deleting! message 
    expect(getByText(appointment, "Deleting!")).toBeInTheDocument();

    // 7. Wait until the element with the Add button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    // 5. Edit the interview 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jason Mason" }
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving!" is displayed.
    expect(getByText(appointment, "Saving!")).toBeInTheDocument();

    // 7. Wait until the element with the text "Jason Mason" is displayed.
    await waitForElement(() => getByText(appointment, "Jason Mason"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click plus button so Create form is shown
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter Student Name and select Interviewer 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jason Mason" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click Save Button
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Show Saving! Transition
    expect(getByText(appointment, "Saving!")).toBeInTheDocument();

    // 7. Error_Save message appears 
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not save appointment, sorry :(")).toBeInTheDocument();
   
    // 8. Click on close button 
    fireEvent.click(getByAltText(appointment, "Close"));

    // 9. Create form is shown with previously inputted details
    expect(getByText(appointment, "Cancel") && getByText(appointment, "Save")).toBeInTheDocument();

    // 10. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });

  it("shows the delete error when failing to delete an existing appointment", async() => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application 
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Find Appointment to Delete
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    // 5. Click Delete Button
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // Confirmation of Delete 
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Show Delete! Transition
    expect(getByText(appointment, "Deleting!")).toBeInTheDocument();

    // 7. Error_Delete message appears 
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not delete appointment, sorry :(")).toBeInTheDocument();

    // 8. Click on close button 
    fireEvent.click(getByAltText(appointment, "Close"));
      debug();
    // 9. Appointment is shown with all details
    expect(getByAltText(appointment, "Edit") && getByAltText(appointment, "Delete")).toBeInTheDocument();

    // 10. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // debug();
  });
});
