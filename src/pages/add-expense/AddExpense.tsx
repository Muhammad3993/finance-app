import Card from "@/assets/icons/card";
import Category from "@/assets/icons/category";
import Clock from "@/assets/icons/clock";
import Close from "@/assets/icons/close";
import DateIcon from "@/assets/icons/dateIcon";
import Symbol from "@/assets/icons/symbol";
import UserNavbar from "@/components/user-navbar/UserNavbar";
// import formatBalance from "@/constants/useFormatBalance";
import useUserData from "@/constants/useUserData";
import useGetCards from "@/data/hooks/currencies";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ICards } from "../bills/Bills";
import useGetCategories, { ICategory } from "@/data/hooks/categories";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import "./add-expense.css";
import EditIcon from "@/assets/icons/edit";

interface IWeekDay {
  id: number;
  name: string;
  day: number;
}

interface IMonthDay {
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
}

const AddExpense = () => {
  const { card } = useParams();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const dateRef = useRef<HTMLInputElement>(null);
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
  const [selectedRepeat, setSelectedRepeat] = useState<number>(0);
  const [selectedWeekDay, setSelectedWeekDay] = useState<IWeekDay | null>(null);
  const [selectedMonthDay, setSelectedMonthDay] = useState<IMonthDay | null>(
    null,
  );

  const handleSave = async (operationData: IOperationData) => {
    // try {
    //   const operationDocRef = doc(db, "operations", `${card}`);

    //   const docSnapshot = await getDoc(operationDocRef);

    //   if (!docSnapshot.exists()) {
    //     await setDoc(operationDocRef, { initialized: true });
    //     console.log(`New '${card}' created successfully`);
    //   }

    //   const operationsCollectionRef = collection(operationDocRef, "operations");

    //   await addDoc(operationsCollectionRef, {
    //     ...operationData,
    //   });

    //   console.log("Doc created successfully");
    // } catch (error) {
    //   console.error(error);
    // }

    try {
      const userDocRef = doc(db, "users", `${userData.telegram_id}`);

      const cardsCollectionRef = collection(userDocRef, "operations");
      await addDoc(cardsCollectionRef, {
        ...operationData,
      });
      console.log("successfully added");
    } catch (e) {
      console.error(e);
    }
  };
  const { control, handleSubmit, setValue } = useForm<IOperationData>();

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

  const { cards, isLoading, fetchAllCard } = useGetCards();

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
    fetchAllCard();
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
        data.date ||
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
    handleSave(operotionData);
    navigate(-1);
  };

  function formatCurrency(amount: number, locale?: string, currency?: string) {
    if (!locale || !currency) {
      throw new Error("Locale and currency must be provided."); // Xatolik chiqarish
    }

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    });

    const formatted = formatter.format(amount);

    if (userData.currency?.symbol) {
      return `${formatted.replace(
        userData.currency.symbol.toUpperCase(),
        "",
      )} ${userData.currency?.symbol.toUpperCase()}`;
    }

    return formatted;
  }

  return (
    <>
      <UserNavbar
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClass="bg-inherit"
        isText
        textClass="text-white text-base"
        text="Расход"
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
                  "font-medium text-2xl font-unbounded text-white duration-300",
                )}
              >
                {(userData.currency?.code &&
                  (regex.test(input)
                    ? formatCurrency(
                        +result,
                        userData.currency.intl,
                        userData.currency.code,
                      )
                    : formatCurrency(
                        +input,
                        userData.currency.intl,
                        userData.currency.code,
                      ))) ||
                  "0"}
                {/* {regex.test(input)
                  ? formatBalance(result)
                  : formatBalance(input) || "0"}
                {userData?.currency?.symbol?.toUpperCase()} */}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 px-4">
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2"
              onClick={() => setIsOpenCard(true)}
            >
              <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                <Card fill="#00BF33" />
              </div>
              <p className="text-10 font-unbounded font-medium text-customGray2">
                {selectedCard === null ? "Счет" : selectedCard.card_name}
              </p>
            </div>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <div
                  className="flex-1 flex flex-col items-center justify-center gap-2"
                  onClick={() => {
                    dateRef?.current?.showPicker();
                  }}
                >
                  <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                    <DateIcon fill="#00BF33" />
                  </div>
                  <p className="text-10 font-unbounded font-medium text-customGray2">
                    Дата
                  </p>
                  <input
                    type="date"
                    className="absolute opacity-0"
                    {...field}
                    ref={dateRef}
                  />
                </div>
              )}
            />
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2"
              onClick={() => setIsOpenCategory(true)}
            >
              <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                <Category fill="#00BF33" />
              </div>
              <p className="text-10 font-unbounded font-medium text-customGray2">
                Категория
              </p>
            </div>
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2"
              onClick={() => setIsOpenRepeat(true)}
            >
              <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                <Clock fill="#00BF33" />
              </div>
              <p className="text-10 font-unbounded font-medium text-customGray2">
                Повтор
              </p>
            </div>
          </div>
          <div className="px-4 mt-4 flex justify-center items-center">
            <div
              className="px-4 py-3 bg-1B1A1E-50 w-max h-max flex items-center justify-center gap-2 rounded-20"
              onClick={() => setIsOpenPopup(true)}
            >
              <EditIcon />
              <p className="text-9 font-unbounded font-medium text-FFFFFF-80">
                Заметка
              </p>
            </div>
          </div>
          {isOpenPopup && (
            <div
              className="bg-black opacity-35 z-10 fixed top-0 left-0 w-full h-full"
              onClick={() => {
                setIsOpenPopup(false);
                setValue("description", "");
              }}
            ></div>
          )}

          <div
            className={clsx(
              "fixed w-full h-[50%] bg-1B1A1E-80 p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 backdrop-blur-[100px]",
              isOpenPopup ? "bottom-[0]" : "bottom-[-100%]",
            )}
          >
            <div className="p-4 bg-customGray rounded-25 h-20">
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    placeholder="Ваша заметка"
                    rows={3}
                    style={{ overflow: "hidden", resize: "none" }}
                    className="text-9 font-unbounded text-gray-500 w-full outline-none bg-inherit"
                  />
                )}
              />
            </div>
            <div
              className="bg-00BF33 w-full flex items-center justify-center h-14 rounded-35"
              onClick={() => setIsOpenPopup(false)}
            >
              <p className="text-white text-xs font-medium font-unbounded">
                Сохранить
              </p>
            </div>
          </div>

          <div
            className={clsx(
              "bg-customGray8 p-4 rounded-tr-35 rounded-tl-35 flex flex-col gap-4 duration-300 fixed bottom-0 pb-10 w-full",
            )}
          >
            <button
              type="submit"
              disabled={!selectedCard || !result}
              className="bg-customGray2 h-14 rounded-35 flex items-center justify-center"
            >
              <p className="text-white text-xs font-medium font-unbounded">
                Добавить
              </p>
            </button>
            <div className="grid grid-cols-4 grid-rows-4 gap-y-61 gap-x-7 w-full max-390:gap-x-61 bg-customGray8">
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
                    "bg-white h-66 w-84 flex justify-center items-center rounded-2xl col-span-1 text-25 font-unbounded text-customGray2 max-390:w-auto",
                    (index + 1) % 4 === 0 && "w-[66px] ml-",
                    btn === "," && "bg-[#f2f2f7]",
                  )}
                >
                  {btn}
                </div>
              ))}
              <div
                className={
                  "bg-inherit h-66 w-84 rounded-2xl flex justify-center items-center max-390:w-auto"
                }
                onClick={() => handleBackSpace()}
              >
                <Close />
              </div>
              <div
                className={
                  "bg-customGray2 h-66 w-66 rounded-2xl flex justify-center items-center max-390:w-auto"
                }
              >
                <Symbol />
              </div>
            </div>
          </div>
        </form>
      </div>
      {isOpenCard && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenCard(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-white p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8",
          isOpenCard ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-customBlack text-center font-medium">
          Тип счета
        </p>
        <div className="grid grid-cols-2 gap-2">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            cards?.map((card: ICards, index: number) => (
              <div
                className={clsx(
                  "bg-customGray8 py-4 px-4 rounded-20 border-2 flex flex-col justify-between gap-3",
                  selectedCard?.id === card?.id
                    ? "border-customBlack"
                    : "border-white",
                )}
                onClick={() => {
                  setSelectedCard(card);
                  setIsOpenCard(false);
                }}
                key={index}
              >
                <Card />
                <p className="text-xs text-customGray2">{card.card_name}</p>
              </div>
            ))}
        </div>
      </div>
      {isOpenCategory && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenCategory(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-white p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8",
          isOpenCategory ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-customBlack text-center font-medium">
          Категория
        </p>
        <div className="grid grid-cols-3">
          {isCategoryLoading && <p>Loading...</p>}
          {!isCategoryLoading &&
            categories?.map((category: ICategory, index: number) => (
              <div
                className={clsx(
                  "flex flex-col items-center justify-center gap-3 relative ",
                  selectedCategory?.id === category.id
                    ? "opacity-1"
                    : "opacity-50",
                )}
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpenCategory(false);
                }}
              >
                <div
                  className={clsx(
                    "w-76 h-76 bg-customGray6 flex items-center justify-center rounded-full",
                  )}
                >
                  <Card width={28} height={28} />
                  {selectedCategory?.id === category.id && (
                    <div className="absolute top-1 right-5">
                      <Symbol width={24} height={24} />
                    </div>
                  )}
                </div>
                <p className="font-normal text-10 font-unbounded uppercase">
                  {category.name}
                </p>
              </div>
            ))}
        </div>
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
          "fixed w-full bg-white p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8",
          isOpenRepeat ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-customBlack text-center font-medium">
          Повторение
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div
            className={clsx(
              "bg-customGray8 py-24 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 0 ? "border-customBlack50" : "border-white",
            )}
            onClick={() => setSelectedRepeat(0)}
          >
            <p className="text-10 font-normal font-unbounded text-customGray2">
              Никогда
            </p>
          </div>
          <div
            className={clsx(
              "bg-customGray8 py-24 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 1 ? "border-customBlack50" : "border-white",
            )}
            onClick={() => setSelectedRepeat(1)}
          >
            <p className="text-10 font-normal font-unbounded text-customGray2">
              Ежедневно
            </p>
          </div>
          <div
            className={clsx(
              "bg-customGray8 py-24 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 2 ? "border-customBlack50" : "border-white",
            )}
            onClick={() => setSelectedRepeat(2)}
          >
            <p className="text-10 font-normal font-unbounded text-customGray2">
              Еженедельно
            </p>
          </div>
          <div
            className={clsx(
              "bg-customGray8 py-24 px-6 rounded-2xl flex justify-center items-center border ",
              selectedRepeat === 3 ? "border-customBlack50" : "border-white",
            )}
            onClick={() => setSelectedRepeat(3)}
          >
            <p className="text-10 font-normal font-unbounded text-customGray2">
              Ежемесячно
            </p>
          </div>
        </div>
        {selectedRepeat === 2 && (
          <div>
            <p className="font-normal font-unbounded text-xs text-customGray2 opacity-65">
              Выберите день недели
            </p>
            <div className="grid grid-cols-7 gap-2 mt-3">
              {weekData.map((week: IWeekDay, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "col-span-1 border border-customBlack50 h-54 flex items-center justify-center rounded-2xl bg-customGray8",
                    selectedWeekDay?.name === week.name
                      ? "border-customBlack50"
                      : "border-customGray8",
                  )}
                  onClick={() => setSelectedWeekDay(week)}
                >
                  <p className="text-10 font-unbounded font-normal text-customGray2 uppercase">
                    {week.name.slice(0, 2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedRepeat === 3 && (
          <div>
            <p className="font-normal font-unbounded text-xs text-customGray2 opacity-65">
              Выберите число месяца
            </p>
            <div className="grid grid-cols-6 gap-2 mt-3">
              {monthsData.map((month: IMonthDay, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "col-span-1 border border-customBlack50 w-54 h-54 flex items-center justify-center rounded-2xl bg-customGray8",
                    selectedMonthDay?.day === month.day
                      ? "border-customBlack50"
                      : "border-customGray8",
                  )}
                  onClick={() => setSelectedMonthDay(month)}
                >
                  <p className="text-10 font-unbounded font-normal text-customGray2 uppercase">
                    {month.day}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="bg-customGray2 py-5 px-4 rounded-35">
          <p className="text-center text-white font-medium font-unbounded text-xs">
            Выбрать
          </p>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
