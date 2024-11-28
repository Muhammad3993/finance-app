import ArrowRight from "@/assets/icons/arrowRight";
import Flag from "@/assets/icons/flag";
import Search from "@/assets/icons/search";
import clsx from "clsx";
import { ICurrence } from "./CreateCard";

interface IProps {
  setIsOpenCurrency: (value: boolean) => void;
  isOpenCurrency: boolean;
  setSelectedCurrence: (value: ICurrence) => void;
  currencies: ICurrence[] | null;
  selectedCurrence: ICurrence | null;
}
const Currency = (props: IProps) => {
  const { setIsOpenCurrency, isOpenCurrency, setSelectedCurrence, currencies, selectedCurrence } =
    props;
  return (
    <>
      <div
        className='bg-customGray8 rounded-20 py-5 px-4 flex items-center justify-between w-full pb-5'
        onClick={() => setIsOpenCurrency(true)}
      >
        <p className='text-customGray2 text-xs font-normal font-unbounded'>
          Валюта
        </p>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-61'>
            <p className='text-xs font-unbounded text-customGray2 font-normal'>
              UZS
            </p>
          </div>
          <ArrowRight />
        </div>
      </div>
      {isOpenCurrency && (
        <div
          className='bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full'
          onClick={() => {
            setIsOpenCurrency(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "z-20 fixed left-0 right-0 rounded-tl-25 rounded-tr-25 bg-white w-full py-3 px-4 max-h-[80%] pb-10 overflow-y-scroll duration-300",
          isOpenCurrency ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className='text-center font-medium font-unbounded text-customBlack'>
          Валюта
        </p>
        <div className='py-3 px-4 flex items-center gap-3 bg-customGray8 rounded-xl overflow-hidden mt-4'>
          <Search />
          <input
            type='text'
            placeholder='Поиск'
            className='bg-inherit flex-1 w-full border-none outline-none'
          />
        </div>
        <div className='mt-3'>
          {currencies &&
            currencies.map((currency: ICurrence, index: number) => (
              <div
                className='flex justify-between items-center h-66'
                key={index}
                onClick={() => setSelectedCurrence(currency)}
              >
                <div className='flex items-center gap-2'>
                  <Flag />
                  <p
                    className={clsx(
                      "text-xs font-normal font-unbounded text-customBlack",
                      selectedCurrence?.code === currency.code &&
                        "text-customBlue",
                    )}
                  >
                    {currency.name}
                  </p>
                </div>
                <div
                  className={clsx(
                    "w-11 h-11 flex items-center justify-center rounded-10",
                    selectedCurrence?.code === currency.code
                      ? "bg-customGray2"
                      : "bg-customGray8",
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
