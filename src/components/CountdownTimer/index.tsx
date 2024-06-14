import * as React from "react";

const CountdownTimer = ({
  duration = 0,
  onComplete,
  pause,
}: {
  duration: number;
  onComplete: () => void;
  pause?: boolean;
}) => {
  const [count, setCount] = React.useState<number>(duration);

  React.useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!pause) {
      intervalId = setInterval(() => {
        setCount((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId);

            onComplete && onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [count, onComplete, pause]);

  const formatTime = (seconds: number) => {
    // const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="p-2 bg-white rounded-md shadow-md">
      {formatTime(count)}
    </section>
  );
};

export default CountdownTimer;
