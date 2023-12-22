import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window focus 설정
    },
  },
});

function App() {
  const [isOutletHidden, setIsOutletHidden] = useState(true);

  const handleHidden = () => {
    setIsOutletHidden(true);
  };

  const handleVisible = () => {
    setIsOutletHidden(false);
  };

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

  useEffect(() => {
    // const savedDate = JSON.parse(localStorage.getItem("currentDate"));

    const now = new Date(2023, 11, 21);

    const year = now.getFullYear();
    const month = +("0" + (1 + now.getMonth())).slice(-2);
    const date = +("0" + now.getDate()).slice(-2);
    const savedDate = [year, month, date];
    const currentDate = saveCurrentDate();

    const result = savedDate.reduce((result, date, idx) => {
      if (date < currentDate[idx]) {
        return (result += 1);
      }

      return result;
    }, 0);

    if (result === 0) {
      return;
    }

    if (result > 0) {
      if (isAfter8AM()) {
        const currentDate = saveCurrentDate();
        localStorage.setItem("currentDate", JSON.stringify(currentDate));
        location.replace("/loading");
        console.log("loading!!");
      } else {
        return;
      }
    }
  }, []);

  console.log("Mount!!");

  return (
    <QueryClientProvider client={queryClient}>
      <section className={styles.wrapper}>
        <Navbar setHidden={handleHidden} setVisible={handleVisible} />
        <div
          className={
            isOutletHidden ? `${styles.typeit}` : `${styles.typeit_hidden}`
          }
        >
          <TypeIt
            options={{ loop: true, speed: 350, loopDelay: 8000 }}
            getBeforeInit={(instance) => {
              instance
                .type("<Strong>BUGERKING</Strong>")
                .pause(2000)
                .delete(4)
                .pause(1000)
                .type("<Strong>PUT</Strong>")
                .pause(3000);
              return instance;
            }}
          />
          <div className={styles.burger_image}>
            <img
              className={styles.image}
              src='/logo/burgerlogo2.png'
              alt='burger'
            />
          </div>
        </div>
        <div
          className={
            isOutletHidden ? `${styles.outlet_hidden}` : `${styles.outlet}`
          }
        >
          <div className={styles.phone}>
            <div className={styles.screen}>
              <div className={styles.body}>
                <Outlet context={{ handleHidden }} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </section>
    </QueryClientProvider>
  );
}

export default App;
