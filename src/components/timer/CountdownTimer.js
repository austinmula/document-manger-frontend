import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../../hooks/useCountdown";
import { ClockIcon } from "@heroicons/react/24/solid";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div
      className={`flex mt-5 items-center text-xs font-mono font-bold gap-1 rounded-xl justify-center ${
        days <= 1 ? "bg-red-100 text-red-800" : "bg-emerald-100 text-green-800 "
      }`}
    >
      <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      <span>:</span>
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <span>:</span>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <span>:</span>
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
