"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import styled, { createGlobalStyle } from "styled-components";
import { createGlobalStyle } from "styled-components";


const DatePickerStyles = createGlobalStyle`
  .custom-datepicker input {
    border: 1px solid black;
    color: black;
    padding: 10px;
    border-radius: 5px;
  }

  .custom-datepicker input::placeholder {
    color: red;
  }

  .custom-datepicker .react-datepicker__calendar-icon {
    color: blue;
  }
`;

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <DatePickerStyles />
      <div className="custom-datepicker">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          placeholderText="Select a date"
          required
        />
      </div>
    </>
  );
};

export default CustomDatePicker;
