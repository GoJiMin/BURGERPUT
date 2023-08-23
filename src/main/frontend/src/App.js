import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";
import { useState } from "react";
import TypeIt from "typeit-react";
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
