import { useState, useEffect } from 'react';

function Timeout({ isRunning }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    console.log(isRunning, 'isRunning');
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {isRunning ? (
        <div className="mt-4 mb-0">
          <h4 className="text-primary">
            Time remaining: {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
          </h4>
          {timeLeft <= 0 && <p>Process completed!</p>}
        </div>
      ) : null}
    </div>
  );
}

export default Timeout;
