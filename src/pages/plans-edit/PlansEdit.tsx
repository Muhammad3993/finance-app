import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import useUserData from "@/constants/useUserData";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import CategoryModal from "./modals/CategoryModal";
import CardModal from "./modals/CardModal";
import RepeatModal from "./modals/RepeatModal";
import { Controller, useForm } from "react-hook-form";
import Close from "@/assets/icons/close";
import { useEffect, useState } from "react";
import useGetCategories, { ICategory } from "@/data/hooks/categories";
import { useGetCards } from "@/data/hooks/cards";
import { ICards } from "../bills/Bills";
import { IPlan, useEditPlan, useGetPlan } from "@/data/hooks/plans";
import "./style/index.css";

const PlansEdit = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const userData = useUserData();

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const [isOpenCard, setIsOpenCard] = useState(false);
  const { data: cards, isLoading } = useGetCards();
  const [selectedCard, setSelectedCard] = useState<ICards | null>(null);

  const [isOpenRepeat, setIsOpenRepeat] = useState(false);

  const { data: categories, isLoading: isCategoryLoading } = useGetCategories();

  const { data: plan } = useGetPlan(id || "");

  const { control, handleSubmit, setValue } = useForm<IPlan>({
    defaultValues: { autoDone: false },
  });

  const clear = () => {
    setInput("");
    setResult("");
  };

  useEffect(() => {
    if (plan) {
      setSelectedCard(plan.card);
      setSelectedCategory(plan.category);
    }
  }, [plan, setValue]);

  const handleClick = (value: string) => {
    if (value === ",") {
      setInput((prev) => prev + ".");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleBackSpace = () => {
    setInput(input.slice(0, -1));
  };

  const { mutate: handleSave } = useEditPlan();

  const onSubmit = async (data: IPlan) => {
    const planData: IPlan = {
      card: selectedCard,
      category: selectedCategory,
      repeat: "0",
      type: type,
      value: result,
      is_done: false,
      autoDone: data.autoDone,
    };
    if (id) {
      handleSave(
        { planData, id },
        {
          onSuccess: () => {
            navigate("/plans/" + id, { replace: true });
          },
        },
      );
    }
  };

  useEffect(() => {
    try {
      const formattedInput = input.replace(/,/g, ".");
      const calculatedResult = new Function("return " + formattedInput)();
      setResult(calculatedResult.toFixed(2));
    } catch (error) {
      setResult(result);
    }
  }, [input]);

  const regex = /[+-]/;

  const isTrue: boolean = Boolean(input);

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate(-1)}
        text="Запланировать"
        textClass="text-white"
        isText
        isScroll
      />
      <div className="px-4 mt-4">
        {/* <div className="flex gap-2 justify-center px-24">
          <NavLink
            to={`/plans/expense/${id}/edit`}
            replace
            className={
              "py-10p px-2 bg-1B1A1E-50 w-116 h-34 flex items-center justify-center text-FFFFFF-50 text-10 font-medium font-unbounded rounded-50 plans-create-link"
            }
          >
            Расход
          </NavLink>
          <NavLink
            to={`/plans/incomes/${id}/edit`}
            replace
            className={
              "py-10p px-2 bg-1B1A1E-50 w-116 h-34 flex items-center justify-center text-FFFFFF-50 text-10 font-medium font-unbounded rounded-50 plans-create-link"
            }
          >
            Доход
          </NavLink>
        </div> */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 mt-3">
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
                {/* {(userData.currency?.code &&
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
                            "0"} */}
                {/* {regex.test(input)
                            ? formatBalance(result)
                            : formatBalance(input) || "0"}
                          {userData?.currency?.symbol?.toUpperCase()} */}
                {(userData.currency?.code &&
                  (regex.test(input)
                    ? result.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                    : input.replace(/\B(?=(\d{3})+(?!\d))/g, " "))) ||
                  "0"}
                <p>{userData?.currency?.symbol?.toUpperCase()}</p>
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3">
            <CategoryModal
              isOpenCategory={isOpenCategory}
              setIsOpenCategory={setIsOpenCategory}
              isCategoryLoading={isCategoryLoading}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <CardModal
              isOpenCard={isOpenCard}
              setIsOpenCard={setIsOpenCard}
              isLoading={isLoading}
              cards={cards}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />

            <RepeatModal
              isOpenRepeat={isOpenRepeat}
              setIsOpenRepeat={setIsOpenRepeat}
              isText={true}
              divClass="flex-1"
              iconBoxClass="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center"
            />
          </div>
          <label className="bg-1B1A1E-50 rounded-20 p-4 flex items-center justify-between w-full mt-4">
            <p className="text-white text-xs font-normal font-unbounded">
              Вносить автоматически
            </p>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <Controller
                  control={control}
                  name="autoDone"
                  render={({ field }) => {
                    return (
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    );
                  }}
                />
                <div
                  className={clsx(
                    "peer h-7 w-12 rounded-full bg-customGray7 after:absolute after:left-[5px] after:top-[50%] after:translate-y-[-50%] after:h-[20px] after:w-[20px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-00BF33 peer-checked:after:translate-x-[18px] peer-checked:after:border-custom-gradient-blue duration-200",
                  )}
                ></div>
              </label>
            </div>
          </label>

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

export default PlansEdit;
