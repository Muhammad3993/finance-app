import ArrowLeft from "@/assets/icons/arrowLeft";
import Car from "@/assets/icons/car";
import CardIcon from "@/assets/icons/cardIcon";
import Close from "@/assets/icons/close";
import DateIcon from "@/assets/icons/dateIcon";
import Reverse from "@/assets/icons/reverse";
import Symbol from "@/assets/icons/symbol";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isOpenCalc, setIsOpenCalc] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [realResult, setRealResult] = useState("0");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  useEffect(() => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult(result);
    }
  }, [input]);

  const handleResult = () => {
    setRealResult(result);
    setInput("")
  };

  const handleBackSpace = () => {
    setInput(input.slice(0, -1));
  };

  const clear = () => {
    setInput("");
    setResult("");
  };
  const regex = /[+-]/;
  const {
    // handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  return (
    <>
      <UserNavbar
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeft />}
        isText
        text='Необходимые'
        rightIconBoxClass='bg-inherit'
      />
      <div className=' mt-6'>
        <form action=''>
          <div
            className='px-4 cursor-pointer'
            onClick={() => {
              setIsOpenCalc(true);
            }}
          >
            <div className='h-74 w-full bg-customGray flex items-center justify-end rounded-20 py-5 px-4 gap-4'>
              <p className='text-2xl font-semibold font-unbounded text-customGray2'>
                {realResult || "0"}
              </p>
              <p className='text-13 font-normal font-unbounded text-customGray2'>
                сум
              </p>
            </div>
          </div>
          <div className='mt-3 flex gap-2 px-4'>
            <div
              className='flex-1 flex flex-col py-3 items-center bg-customGray rounded-20 gap-61'
              onClick={() => {
                dateRef?.current?.showPicker();
              }}
            >
              <DateIcon />
              <p className='text-xs font-normal text-center font-unbounded text-customGray2'>
                Дата
              </p>
              <input type='date' className='absolute opacity-0' ref={dateRef} />
            </div>{" "}
            <div className='flex-1 flex flex-col py-3 items-center bg-customGray rounded-20 gap-61'>
              <CardIcon />
              <p className='text-xs font-normal text-center font-unbounded text-customGray2'>
                Счет
              </p>
            </div>{" "}
            <div className='flex-1 flex flex-col py-3 items-center bg-customGray rounded-20 gap-61'>
              <Reverse />
              <p className='text-xs font-normal text-center font-unbounded text-customGray2'>
                Повтор
              </p>
            </div>
          </div>
          <div className='mt-3'>
            <p className='font-medium text-customGray2 font-unbounded px-4'>
              Категория
            </p>
            <div className='mt-2 flex gap-61 overflow-x-scroll hide-scrollbar z-50 px-4'>
              <div className='bg-customGray flex items-center justify-center gap-2 w-max py-2 px-4 rounded-25'>
                <Car />
                <p className='text-xs font-normal font-unbounded text-customGray2'>
                  Аренда
                </p>
              </div>
              <div className='bg-customGray flex items-center justify-center gap-2 w-max py-2 px-4 rounded-25'>
                <Car />
                <p className='text-xs font-normal font-unbounded text-customGray2'>
                  Аренда
                </p>
              </div>
              <div className='bg-customGray flex items-center justify-center gap-2 w-max py-2 px-4 rounded-25'>
                <Car />
                <p className='text-xs font-normal font-unbounded text-customGray2'>
                  Аренда
                </p>
              </div>{" "}
              <div className='bg-customGray flex items-center justify-center gap-2 w-max py-2 px-4 rounded-25'>
                <Car />
                <p className='text-xs font-normal font-unbounded text-customGray2'>
                  Аренда
                </p>
              </div>
            </div>
          </div>
          <div className='px-4 mt-4'>
            <Controller
              control={control}
              name='description'
              render={({ field }) => (
                <textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  placeholder='Оставить комментарий'
                  rows={3}
                  style={{ overflow: "hidden", resize: "none" }}
                  className='text-[14px] font-sans text-gray-500 w-full outline-none bg-customGray p-4 rounded-20'
                />
              )}
            />
          </div>
          <div className='px-4 fixed bottom-6 w-full'>
            {true ? (
              <button className='py-5 px-4 flex items-center justify-center w-full bg-customGray rounded-2xl text-xs font-medium'>
                <p className='text-customGray7'>Добавить</p>
              </button>
            ) : (
              <button className='py-5 px-4 flex items-center justify-center w-full bg-customGray2 rounded-2xl text-xs font-medium'>
                <p className='text-white'>Добавить</p>
              </button>
            )}
          </div>
        </form>
      </div>
      {isOpenCalc && (
        <div
          className='bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full'
          onClick={() => {
            setIsOpenCalc(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed left-3 right-3  bg-white p-4 rounded-3xl flex flex-col gap-4 z-20 duration-300",
          isOpenCalc ? "bottom-4" : "bottom-[-100%]",
        )}
      >
        <div
          className={clsx(
            "bg-customGray h-66 flex items-center justify-end p-4 rounded-2xl duration-300 overflow-hidden relative",
            regex.test(input) && "h-82",
          )}
        >
          <p className='absolute top-1'>{regex.test(input) && input + "="}</p>
          <p
            className={clsx(
              "font-medium text-2xl font-unbounded text-customGray2 duration-300",
              regex.test(input) && "mt-3",
            )}
          >
            {regex.test(input) ? result : input || "0"}
          </p>
          <p
            className={clsx(
              "font-unbounded text-13 font-normal text-customGray2 ml-3 duration-300",
              regex.test(input) && "mt-3",
            )}
          >
            сум
          </p>
        </div>
        <div className='grid grid-cols-4 grid-rows-4 gap-y-61 gap-x-7 w-full max-390:gap-x-61'>
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
            ",",
            "0",
          ].map((btn, index) => (
            <button
              key={index}
              onClick={() => {
                btn === "AC" ? clear() : handleClick(btn);
              }}
              className={clsx(
                "bg-customGray h-66 w-84 flex justify-center items-center rounded-2xl col-span-1 text-25 font-unbounded text-customGray2 max-390:w-auto",
                (index + 1) % 4 === 0 && "w-[66px] ml-",
                btn === "," && "bg-inherit",
              )}
            >
              {btn}
            </button>
          ))}
          <button
            className={
              "bg-inherit h-66 w-84 rounded-2xl flex justify-center items-center max-390:w-auto"
            }
            onClick={() => handleBackSpace()}
          >
            <Close />
          </button>
          <button
            className={
              "bg-customGray2 h-66 w-66 rounded-2xl flex justify-center items-center max-390:w-auto"
            }
            onClick={() => {
              handleResult();
              setIsOpenCalc(false);
            }}
          >
            <Symbol />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
