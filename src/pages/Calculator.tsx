import Close from "@/assets/icons/close";
import Symbol from "@/assets/icons/symbol";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Calculator = () => {
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

  const handleBackSpace = () => {
    setInput(input.slice(0, -1));
  };

  const clear = () => {
    setInput("");
    setResult("");
  };
  const regex = /[+-]/;

  return (
    <div className='fixed left-3 right-3 bottom-4 bg-red-500 p-4 rounded-3xl flex flex-col gap-4'>
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
        <p>{result ? `= ${result}` : ""}</p>
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
        >
          <Symbol />
        </button>
      </div>
    </div>
  );
};

export default Calculator;
