import ArrowRight from "@/assets/icons/arrowRight";
import Flag from "@/assets/icons/flag";
import clsx from "clsx";
import { ICurrence } from "./CreateCard";

interface IProps {
  setIsOpenCurrency: (value: boolean) => void;
  isOpenCurrency: boolean;
  setSelectedCurrence: (value: ICurrence) => void;
  currencies: ICurrence[] | null;
  selectedCurrence: ICurrence | null;
  selecteddCurrence: ICurrence | null;
}
const Currency = (props: IProps) => {
  const {
    setIsOpenCurrency,
    isOpenCurrency,
    setSelectedCurrence,
    currencies,
    selectedCurrence,
    selecteddCurrence,
  } = props;
  return (
    <>
      <div
        className="bg-1B1A1E-50 rounded-20 py-5 px-4 flex items-center justify-between w-full pb-5"
        onClick={() => setIsOpenCurrency(true)}
      >
        <p className="text-white text-xs font-normal font-unbounded">Валюта</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-61">
            <p className="text-xs font-unbounded text-white uppercase font-normal">
              {selecteddCurrence?.code}
            </p>
          </div>
          <ArrowRight fill="white" />
        </div>
      </div>
      {isOpenCurrency && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenCurrency(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "z-20 fixed left-0 right-0 rounded-tl-25 rounded-tr-25 bg-1B1A1E-80 w-full py-3 px-4 max-h-[80%] pb-10 overflow-y-scroll duration-300 backdrop-blur-[100px]",
          isOpenCurrency ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="text-center font-medium font-unbounded text-white">
          Валюта
        </p>
        <div className="mt-3">
          {currencies &&
            currencies.map((currency: ICurrence, index: number) => (
              <div
                className={clsx(
                  "flex justify-between items-center h-66 rounded-20 p-3",
                  selectedCurrence?.code === currency.code && "bg-00BF33-12",
                )}
                key={index}
                onClick={() => setSelectedCurrence(currency)}
              >
                <div className="flex items-center gap-2">
                  <Flag />
                  <p
                    className={clsx(
                      "text-xs font-normal font-unbounded",
                      selectedCurrence?.code === currency.code
                        ? "text-00BF33"
                        : "text-white",
                    )}
                  >
                    {currency.name}
                  </p>
                </div>
                <div
                  className={clsx(
                    "w-11 h-11 flex items-center justify-center rounded-10",
                    selectedCurrence?.code === currency.code
                      ? "bg-00BF33-12"
                      : "bg-FFFFFF-8",
                  )}
                >
                  <p
                    className={clsx(
                      " text-15 font-normal font-unbounded",
                      selectedCurrence?.code === currency.code
                        ? "text-white"
                        : "text-customGray11",
                    )}
                  >
                    {currency.symbol}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Currency;
