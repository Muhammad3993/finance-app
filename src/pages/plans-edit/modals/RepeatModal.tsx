import clsx from "clsx";
import { useState } from "react";
import ReverseIcon from "@/assets/icons/reverseIcon";
import Calendar from "@/components/calendar/Calendar";
import { IMonthDay, IWeekDay } from "@/pages/add-expense/AddExpense";

interface IProps {
  isOpenRepeat: boolean;
  setIsOpenRepeat: (value: boolean) => void;
  isText: boolean;
  divClass?: string;
  iconBoxClass?: string;
  iconFill?: string;
  iconFill1?: string;
  iconWidth?: number;
}

const RepeatModal = (props: IProps) => {
  const {
    isOpenRepeat,
    setIsOpenRepeat,
    isText,
    iconBoxClass,
    iconFill,
    iconFill1,
    divClass,
    iconWidth,
  } = props;
  const [selectedRepeat, setSelectedRepeat] = useState<number>(0);
  const [selectedWeekDay, setSelectedWeekDay] = useState<IWeekDay | null>(null);
  const [selectedMonthDay, setSelectedMonthDay] = useState<IMonthDay | null>(
    null,
  );

  const [isOpenDate, setIsOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const weekData: IWeekDay[] = [
    {
      id: 1,
      name: "Понедельник",
      day: 1,
    },
    {
      id: 2,
      name: "Вторник",
      day: 2,
    },
    {
      id: 3,
      name: "Среда",
      day: 3,
    },
    {
      id: 4,
      name: "Четверг",
      day: 4,
    },
    {
      id: 5,
      name: "Пятница",
      day: 5,
    },
    {
      id: 6,
      name: "Суббота",
      day: 6,
    },
    {
      id: 7,
      name: "Воскресенье",
      day: 7,
    },
  ];

  const monthsData: IMonthDay[] = [
    { id: 1, day: 1 },
    { id: 2, day: 2 },
    { id: 3, day: 3 },
    { id: 4, day: 4 },
    { id: 5, day: 5 },
    { id: 6, day: 6 },
    { id: 7, day: 7 },
    { id: 8, day: 8 },
    { id: 9, day: 9 },
    { id: 10, day: 10 },
    { id: 11, day: 11 },
    { id: 12, day: 12 },
    { id: 13, day: 13 },
    { id: 14, day: 14 },
    { id: 15, day: 15 },
    { id: 16, day: 16 },
    { id: 17, day: 17 },
    { id: 18, day: 18 },
    { id: 19, day: 19 },
    { id: 20, day: 20 },
    { id: 21, day: 21 },
    { id: 22, day: 22 },
    { id: 23, day: 23 },
    { id: 24, day: 24 },
    { id: 25, day: 25 },
    { id: 26, day: 26 },
    { id: 27, day: 27 },
    { id: 28, day: 28 },
    { id: 29, day: 29 },
    { id: 30, day: 30 },
    { id: 31, day: 31 },
  ];

  return (
    <>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-2",
          divClass,
        )}
        onClick={() => setIsOpenRepeat(true)}
      >
        <div className={clsx("", iconBoxClass)}>
          <ReverseIcon
            fill={iconFill}
            fill1={iconFill1}
            width={iconWidth}
            height={iconWidth}
          />
        </div>
        {isText && (
          <p className="text-9 font-unbounded font-medium text-white">Повтор</p>
        )}
      </div>
      {isOpenRepeat && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenRepeat(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-1B1A1E-80 backdrop-blur-[100px] p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 left-0",
          isOpenRepeat ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-white text-center font-medium">
          Повторение
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div
            className={clsx(
              "bg-FFFFFF-8 py-4 px-6 rounded-2xl flex justify-center items-center border",
              selectedRepeat === 0 ? "border-00BF33" : "border-transparent",
            )}
            onClick={() => setSelectedRepeat(0)}
          >
            <p
              className={clsx(
                "text-10 font-normal font-unbounded",
                selectedRepeat === 0 ? "text-white" : "text-FFFFFF-50",
              )}
            >
              Один раз
            </p>
          </div>
          <div
            className={clsx(
              "bg-FFFFFF-8 py-4 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 1 ? "border-00BF33" : "border-transparent",
            )}
            onClick={() => setSelectedRepeat(1)}
          >
            <p
              className={clsx(
                "text-10 font-normal font-unbounded",
                selectedRepeat === 1 ? "text-00BF33" : "text-FFFFFF-50",
              )}
            >
              Каждый день
            </p>
          </div>
          <div
            className={clsx(
              "bg-FFFFFF-8 py-4 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 2 ? "border-00BF33" : "border-transparent",
            )}
            onClick={() => setSelectedRepeat(2)}
          >
            <p
              className={clsx(
                "text-10 font-normal font-unbounded",
                selectedRepeat === 2 ? "text-00BF33" : "text-FFFFFF-50",
              )}
            >
              Каждую неделю
            </p>
          </div>
          <div
            className={clsx(
              "py-4 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 3
                ? "border-00BF33 bg-00BF33-12"
                : "border-transparent bg-FFFFFF-8",
            )}
            onClick={() => setSelectedRepeat(3)}
          >
            <p
              className={clsx(
                "text-10 font-normal font-unbounded",
                selectedRepeat === 3 ? "text-00BF33" : "text-FFFFFF-50",
              )}
            >
              Каждый месяц
            </p>
          </div>
        </div>
        {selectedRepeat === 0 && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-xs font-unbounded font-normal text-FFFFFF-80">
                Выберите день
              </p>
              <div
                className="py-10p px-4 bg-1B1A1E-50 border border-FFFFFF-15 text-10 font-normal font-unbounded w-max text-white rounded-xl"
                onClick={() => {
                  setIsOpenDate(true);
                }}
              >
                {selectedDate}
              </div>
            </div>
          </>
        )}
        {selectedRepeat === 2 && (
          <div>
            <p className="font-normal font-unbounded text-xs text-FFFFFF-80 opacity-65 ">
              Выберите день недели
            </p>
            <div className="grid grid-cols-7 gap-2 mt-3">
              {weekData.map((week: IWeekDay, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "col-span-1 border h-54 flex items-center justify-center rounded-2xl ",
                    selectedWeekDay?.name === week.name
                      ? "border-00BF33 bg-00BF33-12"
                      : "border-transparent bg-FFFFFF-8",
                  )}
                  onClick={() => setSelectedWeekDay(week)}
                >
                  <p className="text-10 font-unbounded font-normal text-white uppercase">
                    {week.name.slice(0, 2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedRepeat === 3 && (
          <div>
            <p className="font-normal font-unbounded text-xs text-FFFFFF-80 opacity-65">
              Выберите число месяца
            </p>
            <div className="grid grid-cols-6 gap-2 mt-3">
              {monthsData.map((month: IMonthDay, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "col-span-1 border w-54 h-54 flex items-center justify-center rounded-2xl",
                    selectedMonthDay?.day === month.day
                      ? "border-00BF33 bg-00BF33-12"
                      : "border-transparent bg-FFFFFF-8",
                  )}
                  onClick={() => setSelectedMonthDay(month)}
                >
                  <p className="text-10 font-unbounded font-normal text-white uppercase">
                    {month.day}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-00BF33 py-5 px-4 rounded-35">
          <p className="text-center text-white font-medium font-unbounded text-xs">
            Выбрать
          </p>
        </div>
      </div>

      <Calendar
        isOpen={isOpenDate}
        setIsOpen={setIsOpenDate}
        setResult={setSelectedDate}
      />
    </>
  );
};

export default RepeatModal;
