"use client";

import { useState } from "react";

const DAYS_IN_WEEK = 6;

const formatMonth: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export default function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // 0,1,2,3,4,5,6,7,8,9,10,11
  const daysInMonth = +new Date(currentYear, currentMonth + 1, 0).getDate();

  // 0, 1,2,3,4,5,6
  let startDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    daysInMonth
  ).getDay();
  let lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarArray = [];

  // fill rest of the last month
  while (startDayOfMonth > 0) {
    calendarArray.push(lastDateOfPrevMonth);
    lastDateOfPrevMonth -= 1;
    startDayOfMonth -= 1;
  }

  calendarArray.reverse();

  // fill this month
  let day = 1;
  while (day <= daysInMonth) {
    calendarArray.push(day);
    day += 1;
  }

  // fill next month
  day = 1;
  while (lastDayOfMonth < DAYS_IN_WEEK) {
    calendarArray.push(day);
    lastDayOfMonth += 1;
    day += 1;
  }

  console.log({ currentMonth });
  console.log({ currentYear });

  return (
    <>
      {/* calendar wrapper */}
      <div className="w-full max-w-sm h-fit flex flex-col justify-center border-solid border-2 border-blue-900 p-2">
        {/* title */}
        <div className="w-full flex justify-around py-2">
          <button onClick={() => setCurrentYear(currentYear - 1)}>
            &lt;&lt;
          </button>
          <button
            onClick={() => {
              if (currentMonth - 1 <= -1) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
          >
            &lt;
          </button>
          <span>
            <span className="px-1">{formatMonth[currentMonth + 1]}</span>
            <span className="px-1">{currentYear}</span>
          </span>
          <button
            onClick={() => {
              if (currentMonth + 1 >= 12) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
          >
            &gt;
          </button>
          <button onClick={() => setCurrentYear(currentYear + 1)}>
            &gt;&gt;
          </button>
        </div>

        <div className="grid grid-cols-7 justify-items-center gap-y-2 ">
          {/* title */}
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          {/* date, 5 cols */}
          {calendarArray.map((day, idx) => (
            <button key={idx} className="w-full h-full hover:bg-blue-100">
              {day}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
