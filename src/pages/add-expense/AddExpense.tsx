import Close from "@/assets/icons/close";
import DateIcon from "@/assets/icons/dateIcon";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import useUserData from "@/constants/useUserData";
import useGetCards from "@/data/hooks/cards";
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
import AddExpenseModal from "./modals/AddExpenseModal";
import CardModal from "./modals/CardModal";
import CategoryModal from "./modals/CategoryModal";
import RepeatModal from "./modals/RepeatModal";

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
  const [isDate, setIsDate] = useState(false);

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

  const isTrue: boolean =
    Boolean(input) &&
    Boolean(selectedCard) &&
    isDate &&
    Boolean(selectedCategory);

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
            <CardModal
              isOpenCard={isOpenCard}
              setIsOpenCard={setIsOpenCard}
              isLoading={isLoading}
              cards={cards}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
            <Controller
              control={control}
              name="date"
              render={({ field }) => {
                setIsDate(Boolean(field.value));
                return (
                  <div
                    className="flex-1 flex flex-col items-center justify-center gap-2"
                    onClick={() => {
                      dateRef?.current?.showPicker();
                    }}
                  >
                    <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
                      <DateIcon fill="#00BF33" />
                    </div>
                    <p className="text-9 font-unbounded font-medium text-white">
                      Дата
                    </p>
                    <input
                      type="date"
                      className="absolute opacity-0 input"
                      {...field}
                      ref={dateRef}
                    />
                  </div>
                );
              }}
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
            />
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

          <AddExpenseModal
            isOpenPopup={isOpenPopup}
            setIsOpenPopup={setIsOpenPopup}
            setValue={setValue}
            control={control}
          />

          <div
            className={clsx(
              "bg-1B1A1E-50 p-4 rounded-tr-35 rounded-tl-35 flex flex-col gap-4 duration-300 fixed bottom-0 pb-10 w-full",
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
            >
              <p className=" text-xs font-medium font-unbounded">Добавить</p>
            </button>
            <div className="grid grid-cols-4 grid-rows-4 gap-y-61 gap-x-[16px] w-full max-390:gap-x-61 bg-transparent">
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
                    btn === "," && "bg-[#f2f2f7]",
                  )}
                >
                  {btn}
                </div>
              ))}
              <div
                className={
                  "bg-inherit w-full rounded-2xl flex justify-center items-center max-390:w-auto col-span-1 ml-[102px]"
                }
                onClick={() => handleBackSpace()}
              >
                <Close fill="white" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddExpense;
