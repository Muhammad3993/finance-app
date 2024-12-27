import Close from "@/assets/icons/close";
import { ICurrence } from "./CreateCard";
import Symbol from "@/assets/icons/symbol";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface IProps {
  setIsOpenCalc: (value: boolean) => void;
  selectedCurrence: ICurrence | null | undefined;
  isOpenCalc?: boolean;
  realResult?: string | number;
  setRealResult: (value: string) => void;
  isLoading: boolean;
}
const Finance = (props: IProps) => {
  const {
    setIsOpenCalc,
    selectedCurrence,
    isOpenCalc,
    realResult,
    setRealResult,
  } = props;

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

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
    setInput("");
  };

  const handleBackSpace = () => {
    setInput(input.slice(0, -1));
  };

  const clear = () => {
    setInput("");
    setResult("");
  };
  const regex = /[+-]/;

  const formatter = new Intl.NumberFormat(selectedCurrence?.intl, {
    style: "currency",
    currency: selectedCurrence?.code,
  });
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpenCalc(true);
        }}
      >
        <div className="h-74 w-full bg-transparent border-b-[.5px] border-FFFFFF-25 flex items-center justify-end py-5 px-4 gap-4">
          <p className="text-2xl font-normal font-unbounded text-white">
            {realResult ? formatter.format(Number(realResult)) : "0"} сум
          </p>
        </div>
      </div>
      {isOpenCalc && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
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
          <p className="absolute top-1">{regex.test(input) && input + "="}</p>
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
        <div className="grid grid-cols-4 grid-rows-4 gap-y-61 gap-x-7 w-full max-390:gap-x-61">
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
            <div
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
            onClick={() => {
              handleResult();
              setIsOpenCalc(false);
            }}
          >
            <Symbol />
          </div>
        </div>
      </div>
    </>
  );
};

export default Finance;
