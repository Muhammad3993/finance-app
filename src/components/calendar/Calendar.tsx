import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import clsx from "clsx";
import { useState, useEffect } from "react";

const getDaysInMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 1);
  const firstDay = date.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
};

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setResult: (value: string) => void;
}

const Calendar = (props: IProps) => {
  const { isOpen, setIsOpen, setResult } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resultData, setResultData] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  useEffect(() => {
    const today = new Date();
    setResultData(today);
  }, []);

  const handlePrevMonth = () => {
    const prevMonth = new Date(year, month - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(year, month + 1);
    setCurrentDate(nextMonth);
  };

  const handleDayClick = (day: number | null) => {
    if (day) {
      const selectedDate = new Date(year, month, day);
      setResultData(selectedDate);
    }
  };

  const today = new Date();
  const handleClear = () => {
    setResultData(today);
  };

  return (
    <>
      {isOpen && (
        <div
          className="bg-black opacity-35 fixed top-0 left-0 w-full h-full z-40"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed left-3 right-3 p-4 flex flex-col gap-4 bg-1B1A1E-80 backdrop-blur-100 rounded-25 z-50 duration-300",
          isOpen ? "bottom-1/2 translate-y-1/2" : "-bottom-full",
        )}
      >
        <div className="w-full flex justify-between items-center px-4">
          <p className="text-xs text-FFFFFF-80 font-unbounded font-normal">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={handlePrevMonth}>
              <ArrowLeftShort fill="#00BF33" />
            </button>
            <button onClick={handleNextMonth} className="rotate-180">
              <ArrowLeftShort fill="#00BF33" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-[5px] mt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div
                className="flex items-center justify-center font-normal font-unbounded text-9 text-FFFFFF-50"
                key={index}
              >
                {day}
              </div>
            ),
          )}
          {daysInMonth.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const isSelected = day === resultData?.getDate();

            return (
              <div
                key={index}
                className={clsx(
                  "h-44px rounded-xl flex items-center justify-center text-xs font-unbounded font-medium",
                  day && "cursor-pointer",
                  isToday && "bg-00BF33-12 text-00BF33",
                  today === resultData && "bg-00BF33-12 text-00BF33",
                  isSelected && "bg-00BF33 text-white",
                  !isToday && !isSelected && "bg-transparent text-white",
                )}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div
            className="w-94 h-38 bg-FFFFFF-8 rounded-25 flex items-center justify-center font-medium font-unbounded text-10 text-FFFFFF-80 cursor-pointer"
            onClick={() => {
              handleClear();
              setIsOpen(false);
            }}
          >
            Сбросить
          </div>
          <div
            className="w-94 h-38 bg-00BF33-12 rounded-25 flex items-center justify-center font-medium font-unbounded text-10 text-00BF33 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              setResult(resultData?.toDateString() ?? "");
            }}
          >
            Готово
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
