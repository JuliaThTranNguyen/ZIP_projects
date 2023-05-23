import React from "react";

const Notification = ({ message, type }) => {
  const notificationClasses = `fixed bottom-5 right-5 w-60 px-4 py-2 rounded-lg text-white ${
    type === "error" ? "bg-red-500" : "bg-green-500"
  }`;

  return (
    <div className={notificationClasses}>
      <p className="text-rose-500">{message}</p>
    </div>
  );
};

export default Notification;
