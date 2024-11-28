import ArrowLeft from "@/assets/icons/arrowLeft";
import ArrowRight from "@/assets/icons/arrowRight";
import Card from "@/assets/icons/card";
import Symbol from "@/assets/icons/symbol";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { db } from "@/firebaseConfig";
import clsx from "clsx";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Finance from "./Finance";
import Currency from "./Currency";

export interface ICurrence {
  name?: string;
  code?: string;
  intl?: string;
  symbol?: string;
  value?: number;
}

export interface ICardData {
  card_finance: number | string;
  card_name: string;
  card_currency: ICurrence;
}

const CreateCard = () => {
  const navigate = useNavigate();

  const [isOpenAccountType, setIsOpenAccountType] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [isOpenCurrency, setIsOpenCurrency] = useState(false);

  const [realResult, setRealResult] = useState("0");
  console.log(realResult);
  

  const [currencies, setCurrencies] = useState<ICurrence[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrence, setSelectedCurrence] = useState<ICurrence | null>({
    code: "uzs",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const [isOpenCalc, setIsOpenCalc] = useState(false);

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "currencies"));

      if (!querySnapshot.empty) {
        const currencies = querySnapshot.docs.map((doc) => doc.data());
        setCurrencies(currencies);
      } else {
        console.log("Hech qanday foydalanuvchi topilmadi.");
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Ma'lumotlarni olishda xatolik yuz berdi:", e);
    }
  };

  const { control, handleSubmit } = useForm<ICardData>({
    defaultValues: { card_name: "" },
  });
  const onSubmit = async (data: ICardData) => {
    const cardData = {
      card_finance: data.card_finance,
      card_name: data.card_name,
    };
    console.log(cardData);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeft />}
        leftIconBoxClick={() => navigate(-1)}
        isText
        text='Новый счет'
        rightIconBoxClass='bg-inherit'
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-4 mt-6 flex flex-col gap-3'
      >
        <div className='w-full h-60px bg-customGray8 rounded-50 flex items-center p-6'>
          <div className='flex-1 h-full bg-white rounded-50 flex items-center justify-center'>
            Расходная
          </div>
          <div className='flex-1 h-full bg-inherit rounded-50 flex items-center justify-center'>
            Для сбережений
          </div>
        </div>
        <Controller
          control={control}
          name='card_finance'
          render={({ field }) => {
            return (
              <Finance
                setIsOpenCalc={setIsOpenCalc}
                selectedCurrence={selectedCurrence}
                isOpenCalc={isOpenCalc}
                realResult={field.value}
                setRealResult={(value) => {
                  field.onChange(value);
                  setRealResult(value);
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name='card_name'
          render={({ field }) => {
            return (
              <div className='w-full h-60px bg-customGray8 overflow-hidden rounded-20 py-5 px-4'>
                <input
                  type='text'
                  placeholder='Название'
                  className='bg-inherit flex-1 h-full w-full outline-none'
                  {...field}
                />
              </div>
            );
          }}
        />
        <div className='bg-customGray8 rounded-20 py-5 px-4'>
          <div
            className={clsx(
              "flex items-center justify-between w-full",
              selectedAccountType === "karta" && "pb-5",
            )}
            onClick={() => setIsOpenAccountType(true)}
          >
            <p className='text-customGray2 text-xs font-normal font-unbounded'>
              Тип счета
            </p>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-61'>
                <Card width={20} height={20} />
                <p className='text-xs font-unbounded text-customGray2 font-normal'>
                  Карта
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>
          {selectedAccountType === "karta" && (
            <div className='bg-white rounded-2xl'>
              <div className='h-10 flex items-center justify-between border-b border-customGray10 px-3 last:border-none'>
                <p className='text-10 font-unbounded font-normal text-customGray2'>
                  Номер карты
                </p>
                <div className='flex items-center gap-2'>
                  <p className='opacity-50 text-customGray2 font-unbounded font-normal text-10'>
                    9860 **** **** 4820
                  </p>
                  <ArrowRight />
                </div>
              </div>{" "}
              <div className='h-10 flex items-center justify-between border-b border-customGray10 px-3 last:border-none'>
                <p className='text-10 font-unbounded font-normal text-customGray2'>
                  Срок истечения
                </p>
                <div className='flex items-center gap-2'>
                  <p className='opacity-50 text-customGray2 font-unbounded font-normal text-10'>
                    07/27
                  </p>
                  <ArrowRight />
                </div>
              </div>
            </div>
          )}
        </div>

        <Controller
          control={control}
          name='card_currency'
          render={({ field }) => {
            console.log(field);
            
            return (
              <Currency
                setIsOpenCurrency={setIsOpenCurrency}
                isOpenCurrency={isOpenCurrency}
                selectedCurrence={selectedCurrence}
                setSelectedCurrence={setSelectedCurrence}
                currencies={currencies}

              />
            );
          }}
        />

        <div className='bg-customGray8 rounded-20 py-5 px-4 flex items-center justify-between w-full pb-5'>
          <p className='text-customGray2 text-xs font-normal font-unbounded'>
            Включить в общий баланс
          </p>
          <div className='flex items-center gap-4'>
            <label className='relative inline-flex cursor-pointer items-center'>
              <input
                type='checkbox'
                className='peer sr-only'
                checked={isChecked}
                onChange={handleChecked}
              />
              <div
                className={clsx(
                  "peer h-7 w-12 rounded-full bg-customGray7 after:absolute after:left-[5px] after:top-[50%] after:translate-y-[-50%] after:h-[20px] after:w-[20px] after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-customGray2 peer-checked:after:translate-x-[18px] peer-checked:after:border-custom-gradient-blue",
                )}
              ></div>
            </label>
          </div>
        </div>
        <div className='px-4'>
          <p className='text-9 font-thin font-unbounded'>
            При включении этого параметра, баланс счета будет включен в общий
            баланс.
          </p>
        </div>

        <button
          type='submit'
          className='bg-customGray2 h-14 rounded-50 flex items-center justify-center mt-4'
          onClick={() => {
            setSelectedAccountType(accountType);
            setIsOpenAccountType(false);
          }}
        >
          <p className='text-white font-medium text-xs font-unbounded'>
            Сохранить
          </p>
        </button>
      </form>
      {/* Pop up */}
      {isOpenAccountType && (
        <div
          className='bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full'
          onClick={() => {
            setIsOpenAccountType(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "z-20 fixed left-0 right-0 rounded-tl-25 rounded-tr-25 bg-white w-full py-3 px-4 max-h-[70%] pb-[100px] overflow-y-scroll duration-300",
          isOpenAccountType ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className='text-center font-medium font-unbounded text-customBlack'>
          Тип счета
        </p>
        <div className='mt-4 flex flex-col gap-2 '>
          <div
            className='bg-customGray8 h-68 flex items-center justify-between rounded-25 py-3 px-22'
            onClick={() => {
              setAccountType("karta");
            }}
          >
            <div className='flex items-center gap-3'>
              <div className='w-11 h-11 rounded-full bg-white flex items-center justify-center'>
                <Card width={20} height={20} />
              </div>
              <p className='text-xs text-customGray2 font-unbounded font-normal'>
                Карта
              </p>
            </div>
            {accountType === "karta" && (
              <div>
                <Symbol width={24} height={24} />
              </div>
            )}
          </div>
          <div
            className='bg-customGray8 h-68 flex items-center justify-between rounded-25 py-3 px-22'
            onClick={() => {
              setAccountType("cash");
            }}
          >
            <div className='flex items-center gap-3'>
              <div className='w-11 h-11 rounded-full bg-white flex items-center justify-center'>
                <Card width={20} height={20} />
              </div>
              <p className='text-xs text-customGray2 font-unbounded font-normal'>
                Наличные
              </p>
            </div>
            {accountType === "cash" && (
              <div>
                <Symbol width={24} height={24} />
              </div>
            )}
          </div>
        </div>
        <div
          className={clsx(
            "fixed bottom-0 bg-white left-0 right-0 pt-4 pb-[24px] px-4 duration-300",
            isOpenAccountType ? "bottom-0" : "bottom-[-100%]",
          )}
        >
          <div
            className='bg-customGray2 h-14 rounded-50 flex items-center justify-center'
            onClick={() => {
              setSelectedAccountType(accountType);
              setIsOpenAccountType(false);
            }}
          >
            <p className='text-white font-medium text-xs font-unbounded'>
              Сохранить
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCard;
