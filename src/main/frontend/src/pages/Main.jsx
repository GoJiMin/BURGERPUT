import React, { useEffect } from "react";

export default function Main() {
  // 현재 날짜와 시간을 얻어오는 함수
  function getCurrentDate() {
    return new Date();
  }

  // 오전 8시에 해당하는 시간을 설정하는 함수
  function getComparisonDate() {
    const comparisonDateHour = new Date();
    comparisonDateHour.setHours(8, 0, 0, 0); // 시, 분, 초, 밀리초 설정
    return comparisonDateHour;
  }

  // 비교 함수
  function isAfter8AM() {
    const currentDateHour = getCurrentDate();
    const comparisonDateHour = getComparisonDate();

    return currentDateHour.getTime() >= comparisonDateHour.getTime();
  }

  function saveCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = +("0" + (1 + currentDate.getMonth())).slice(-2);
    const date = +("0" + currentDate.getDate()).slice(-2);

    return [year, month, date];
  }

  if (isAfter8AM()) {
    const currentDate = saveCurrentDate();
    localStorage.setItem("currentDate", JSON.stringify(currentDate));
  } else {
    console.log("현재 시간은 8시 이전입니다.");
  }

  useEffect(() => {
    const savedDate = JSON.parse(localStorage.getItem("currentDate"));
    const currentDate = saveCurrentDate();

    const result = savedDate.reduce((result, date, idx) => {
      if (date < currentDate[idx]) {
        return (result += 1);
      }

      return result;
    }, 0);
  }, []);

  return <div>Main</div>;
}
