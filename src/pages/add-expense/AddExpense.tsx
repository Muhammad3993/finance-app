import Close from "@/assets/icons/close";
import DateIcon from "@/assets/icons/dateIcon";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import useUserData from "@/constants/useUserData";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ICards } from "../bills/Bills";
import useGetCategories, { ICategory } from "@/data/hooks/categories";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import "./add-expense.css";
import AddExpenseModal from "./modals/AddExpenseModal";
import CardModal from "./modals/CardModal";
import CategoryModal from "./modals/CategoryModal";
import RepeatModal from "./modals/RepeatModal";
import { useGetCards } from "@/data/hooks/cards";
import { Cell, Pie, PieChart } from "recharts";
import Savings from "@/assets/icons/savings";
import Calendar from "@/components/calendar/Calendar";
import { useAddOperation } from "@/data/hooks/operations";

export interface IWeekDay {
  id: number;
  name: string;
  day: number;
}

export interface IMonthDay {
  id: number;
  day: number;
}

export interface IOperationData {
  id?: string;
  value: number | string;
  description?: string;
  card?: ICards | null;
  category?: ICategory | null;
  repeat: number;
  weekDay: IWeekDay | null;
  monthDay: IMonthDay | null;
  date: string;
  type: string | undefined;
  planId?: string;
}

const AddExpense = () => {
  const { card } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const userData = useUserData();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenRepeat, setIsOpenRepeat] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ICards | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { mutate: handleSave } = useAddOperation();

  const { control, handleSubmit, setValue } = useForm<IOperationData>({
    defaultValues: { card: null },
  });

  const { data: cards, isLoading } = useGetCards();

  const handleClick = (value: string) => {
    if (value === ",") {
      setInput((prev) => prev + ".");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const { categories, fetchAllCategories, isCategoryLoading } =
    useGetCategories();

  useEffect(() => {
    try {
      const formattedInput = input.replace(/,/g, ".");
      const calculatedResult = new Function("return " + formattedInput)();
      setResult(calculatedResult.toFixed(2));
    } catch (error) {
      setResult(result);
    }
  }, [input]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleBackSpace = () => {
    setInput(input.slice(0, -1));
  };

  const clear = () => {
    setInput("");
    setResult("");
  };
  const regex = /[+-]/;

  const onSubmit = async (data: IOperationData) => {
    const operotionData: IOperationData = {
      value: result,
      card: selectedCard,
      date:
        selectedDate ||
        new Date().getFullYear().toString() +
          " " +
          new Date().getMonth().toString(),
      category: selectedCategory,
      description: data.description || "",
      repeat: 0,
      weekDay: null,
      monthDay: null,
      type: card,
    };
    handleSave(operotionData, {
      onSuccess: (response) => {
        if (response.id) {
          navigate("/card/" + card + "/operations/" + response.id, {
            replace: true,
          });
        }
      },
    });
  };

  const data = [
    { value: 40, color: "#008CBF1F" },
    { value: 60, color: "#008CBF" },
  ];

  const isTrue: boolean = Boolean(input);

  return (
    <>
      <UserNavbar
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClass="bg-inherit"
        isText
        textClass="text-white text-base"
        text={card === "Savings" ? "Сбережения" : "Расход"}
        isScroll
        rightIconBoxClass="bg-inherit"
      />
      {card !== "Savings" && (
        <div className="w-full flex justify-center gap-2 px-4">
          <NavLink
            to={"/card/Necessary/add-expense"}
            className={
              "py-10p px-4 bg-1B1A1E-50 text-FFFFFF-25 flex items-center justify-center w-116 h-max rounded-50 text-10 font-unbounded font-medium active_btn"
            }
          >
            Необходимые
          </NavLink>
          <NavLink
            to={"/card/Desired/add-expense"}
            className={
              "py-10p px-4 bg-1B1A1E-50 text-FFFFFF-25 flex items-center justify-center w-116 h-max rounded-50 text-10 font-unbounded font-medium active_btn"
            }
          >
            Желаемые
          </NavLink>
        </div>
      )}
      <div className="mt-3">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {card !== "Savings" ? (
            <>
              <div className="px-4">
                <div
                  className={clsx(
                    "bg-1B1A1E-50 h-82 flex items-center justify-end p-4 rounded-2xl duration-300 overflow-hidden relative",
                  )}
                >
                  <p className="absolute top-1 text-10 font-unbounded font-normal text-FFFFFF-80 opacity-50">
                    {regex.test(input) && input + "="}
                  </p>
                  <p
                    className={clsx(
                      "font-medium text-2xl font-unbounded text-white duration-300 flex gap-2",
                    )}
                  >
                    {(userData.currency?.code &&
                      (regex.test(input)
                        ? result.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : input.replace(/\B(?=(\d{3})+(?!\d))/g, " "))) ||
                      "0"}
                    <p>{userData?.currency?.symbol?.toUpperCase()}</p>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 px-4">
                <CardModal
                  isOpenCard={isOpenCard}
                  setIsOpenCard={setIsOpenCard}
                  isLoading={isLoading}
                  cards={cards}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />

                <div
                  className="flex-1 flex flex-col items-center justify-center gap-2"
                  onClick={() => {
                    setIsOpenDate(true);
                  }}
                >
                  <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                    <DateIcon fill="#00BF33" />
                  </div>
                  <p className="text-9 font-unbounded font-medium text-white">
                    Дата
                  </p>
                </div>

                <Calendar
                  isOpen={isOpenDate}
                  setIsOpen={setIsOpenDate}
                  setResult={setSelectedDate}
                />

                <CategoryModal
                  isOpenCategory={isOpenCategory}
                  setIsOpenCategory={setIsOpenCategory}
                  isCategoryLoading={isCategoryLoading}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <RepeatModal
                  isOpenRepeat={isOpenRepeat}
                  setIsOpenRepeat={setIsOpenRepeat}
                  isText={true}
                  divClass="flex-1"
                  iconBoxClass="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center"
                />
              </div>
              <AddExpenseModal
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
                setValue={setValue}
                control={control}
                isText
                divClass="px-4 mt-4 flex justify-center items-center"
                iconBoxClass="px-4 py-3 bg-1B1A1E-50 w-max h-max flex items-center justify-center gap-2 rounded-20"
              />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center px-4">
                <div>
                  <p className="text-white font-medium font-unbounded text-13 text-center">
                    1 млн. сум
                  </p>
                  <p className="text-xs font-normal font-unbounded text-center text-FFFFFF-50">
                    осталось до цели
                  </p>
                </div>
                <div className="h-116 w-116 relative">
                  <PieChart
                    width={116}
                    height={116}
                    className="border-none outline-none -rotate-90 "
                  >
                    <Pie
                      stroke="none"
                      data={data}
                      innerRadius={45}
                      outerRadius={58}
                      cornerRadius={6}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          style={{ outline: "none" }}
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="w-44 h-28 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center">
                    <div className="w-14 h-14 flex items-center justify-center">
                      <Savings fill="#008CBF" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-white font-medium font-unbounded text-13 text-center">
                    1 млн. сум
                  </p>
                  <p className="text-xs font-normal font-unbounded text-center text-FFFFFF-50">
                    осталось до цели
                  </p>
                </div>
              </div>
              <div className="px-4">
                <div
                  className={clsx(
                    "bg-1B1A1E-50 h-82 flex items-center justify-end p-4 rounded-2xl duration-300 overflow-hidden relative",
                  )}
                >
                  <p className="absolute top-1 text-10 font-unbounded font-normal text-FFFFFF-80 opacity-50">
                    {regex.test(input) && input + "="}
                  </p>
                  <p
                    className={clsx(
                      "font-medium text-2xl font-unbounded text-white duration-300 flex gap-2",
                    )}
                  >
                    {(userData.currency?.code &&
                      (regex.test(input)
                        ? result.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : input.replace(/\B(?=(\d{3})+(?!\d))/g, " "))) ||
                      "0"}
                    <p>{userData?.currency?.symbol?.toUpperCase()}</p>
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center px-8 mt-4">
                <AddExpenseModal
                  isOpenPopup={isOpenPopup}
                  setIsOpenPopup={setIsOpenPopup}
                  setValue={setValue}
                  control={control}
                  isText={false}
                  iconFill="#FFFFFF80"
                  iconWidth={21}
                  iconBoxClass="w-10 h-10 flex items-center justify-center bg-FFFFFF-8 rounded-full"
                />
                <CardModal
                  isOpenCard={isOpenCard}
                  setIsOpenCard={setIsOpenCard}
                  isLoading={isLoading}
                  cards={cards}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                  isSavings
                />
                <RepeatModal
                  isOpenRepeat={isOpenRepeat}
                  setIsOpenRepeat={setIsOpenRepeat}
                  isText={false}
                  iconFill="transparent"
                  iconFill1="#FFFFFF80"
                  iconWidth={30}
                  iconBoxClass="w-10 h-10 bg-FFFFFF-8 rounded-full flex items-center justify-center"
                />
              </div>
            </>
          )}

          <div
            className={clsx(
              "bg-1B1A1E-50 p-4 rounded-tr-35 rounded-tl-35 flex flex-col gap-4 duration-300 fixed bottom-0 pb-10 w-full select-none",
            )}
          >
            <button
              type="submit"
              className={clsx(
                "h-14 rounded-35 flex items-center justify-center duration-300",
                isTrue
                  ? "bg-00BF33 text-white"
                  : "bg-1B1A1E-100 text-FFFFFF-25",
              )}
              disabled={!isTrue}
            >
              <p className=" text-xs font-medium font-unbounded">Добавить</p>
            </button>
            <div className="grid grid-cols-4 grid-rows-4 gap-y-61 gap-x-[16px] w-full max-390:gap-x-61 bg-transparent cursor-pointer">
              {[
                "1",
                "2",
                "3",
                "AC",
                "4",
                "5",
                "6",
                "+",
                "7",
                "8",
                "9",
                "-",
                ".",
                "0",
              ].map((btn, index) => (
                <div
                  key={index}
                  onClick={() => {
                    btn === "AC" ? clear() : handleClick(btn);
                  }}
                  className={clsx(
                    "bg-1B1A1E-100 h-66 w-84 flex justify-center items-center rounded-2xl col-span-1 text-25 font-unbounded text-white max-390:w-auto",
                  )}
                >
                  {btn}
                </div>
              ))}
              <div
                className={
                  "bg-inherit w-full rounded-2xl flex justify-end items-center max-390:w-auto col-span-2"
                }
              >
                <div
                  className="w-84 flex items-center justify-center"
                  onClick={() => handleBackSpace()}
                >
                  <Close fill="white" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddExpense;
