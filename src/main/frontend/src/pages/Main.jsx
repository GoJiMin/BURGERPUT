import React, { useEffect } from "react";

export default function Main() {
  // 현재 날짜와 시간을 얻어오는 함수
  function setCurrentDate() {
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
    const currentDate = setCurrentDate();
    const comparisonDate = getComparisonDate();

    return currentDate.getTime() >= comparisonDate.getTime();
  }

  // 현재 시간을 배열로 저장하는 함수
  function getCurrentDate() {
    const currentDate = setCurrentDate();

    const year = currentDate.getFullYear();
    const month = +("0" + (1 + currentDate.getMonth())).slice(-2);
    const date = +("0" + currentDate.getDate()).slice(-2);

    return [year, month, date];
  }

  // 로컬 스토리지에 현재 시간을 저장하는 함수
  function saveCurrentDate() {
    const currentDate = getCurrentDate();
    localStorage.setItem("currentDate", JSON.stringify(currentDate));
    location.replace("loading");
    console.log("loading!!");
  }

  useEffect(() => {
    const savedDate = JSON.parse(localStorage.getItem("currentDate"));
    const currentDate = getCurrentDate();

    const result = savedDate
      ? savedDate.reduce((result, date, idx) => {
          if (date < currentDate[idx]) {
            return (result += 1);
          }

          return result;
        }, 0)
      : 1;

    if (result === 0) {
      console.log("날짜 맞음");
      return;
    }

    if (result > 0) {
      if (isAfter8AM()) {
        saveCurrentDate();
      } else {
        return;
      }
    }
  }, []);

  return <div>Main</div>;
}
