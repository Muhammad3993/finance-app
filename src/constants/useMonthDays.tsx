import { useState, useEffect } from "react";

export const useDaysInCurrentMonth = () => {
  const [daysInMonth, setDaysInMonth] = useState(0);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const lastDayOfMonth = new Date(year, month + 1, 0);
    setDaysInMonth(lastDayOfMonth.getDate());
  }, []);

  return { daysInMonth };
};