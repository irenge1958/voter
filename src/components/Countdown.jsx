import { useEffect, useState } from "react";

function Countdown() {

  const electionDate = new Date("2026-12-31T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date().getTime();
      const distance = electionDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });

        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        expired: false,
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <div style={styles.box}>
  
      {timeLeft.expired ? (
        <h2 style={{ color: "red" }}>
          🗳️ Election Has Started / Closed
        </h2>
      ) : (
        <>
          <h3 style={styles.title}>
            🗳️ Time Left Until Election Starts
          </h3>
  
          <div style={styles.timer}>
  
            <div>
              <span>{timeLeft.days}</span>
              <p>Days</p>
            </div>
  
            <div>
              <span>{timeLeft.hours}</span>
              <p>Hours</p>
            </div>
  
            <div>
              <span>{timeLeft.minutes}</span>
              <p>Minutes</p>
            </div>
  
            <div>
              <span>{timeLeft.seconds}</span>
              <p>Seconds</p>
            </div>
  
          </div>
        </>
      )}
  
    </div>
  );
}

const styles = {

  box: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#002868",
    fontWeight: "bold",
    textAlign: "center",
  },

  timer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

};

export default Countdown;