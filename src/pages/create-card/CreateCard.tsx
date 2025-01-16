import UserNavbar from "@/components/user-navbar/UserNavbar";
import { db } from "@/firebaseConfig";
import clsx from "clsx";
import { addDoc, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Currency from "./Currency";
import useUserData from "@/constants/useUserData";
import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import useCurrencies, { ICurrency } from "@/data/hooks/currencies";

export interface ICardData {
  card_finance: number;
  card_name: string;
  card_currency: ICurrency;
  isBalance: boolean;
}

const CreateCard = () => {
  const navigate = useNavigate();

  const [isOpenCurrency, setIsOpenCurrency] = useState(false);
  const { data: currencies, isLoading } = useCurrencies();

  const [selectedCurrence, setSelectedCurrence] = useState<ICurrency>({
    code: "uzs",
    intl: "uz-UZ",
    name: "Uzbekistani Som",
    symbol: "uzs",
    value: 1,
  });

  const { control, handleSubmit, setValue } = useForm<ICardData>({
    defaultValues: {
      card_name: "",
      isBalance: false,
      card_currency: selectedCurrence,
    },
  });

  const userData = useUserData();

  const saveCardData = async (cardData: ICardData) => {
    try {
      const userDocRef = doc(db, "users", `${userData.telegram_id}`);

      const cardsCollectionRef = collection(userDocRef, "cards");
      await addDoc(cardsCollectionRef, {
        card_finance: cardData.card_finance,
        card_name: cardData.card_name,
        card_currency: cardData.card_currency,
        isBalance: cardData.isBalance,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = async (data: ICardData) => {
    const cardData: ICardData = {
      card_finance: +data.card_finance.toString().replace(/\D/g, ""),
      card_name: data.card_name,
      card_currency: data.card_currency,
      isBalance: data.isBalance,
    };
    saveCardData(cardData);
    navigate(-1);
  };

  useEffect(() => {
    setValue("card_currency", selectedCurrence);
  }, []);

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate(-1)}
        isText
        text="Новый счет"
        textClass="text-white"
        isScroll
        rightIconBoxClass="bg-inherit"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 pt-4 mt-6 flex justify-between flex-col gap-3 bg-1B1A1E-50 min-h-[calc(100vh-164px)] rounded-tl-45 rounded-tr-45"
      >
        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            name="card_finance"
            render={({ field }) => {
              return (
                <div className="px-4 flex items-center border-b border-FFFFFF-25">
                  <input
                    {...field}
                    type="text"
                    inputMode="tel"
                    className="font-unbounded w-full h-73 bg-transparent py-4  outline-none text-right text-2xl rounded-25 placeholder:text-white placeholder:font-normal text-white font-normal pr-1"
                    placeholder="0"
                    value={formatNumber(field.value ?? "")}
                    autoFocus
                  />
                  <p className="text-white text-2xl font-normal font-unbounded">
                    сум
                  </p>
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="card_name"
            render={({ field }) => {
              return (
                <div className="w-full h-60px bg-1B1A1E-50 overflow-hidden rounded-20 px-4">
                  <input
                    type="text"
                    placeholder="Название"
                    className="bg-transparent flex-1 h-full w-full outline-none placeholder:text-sm placeholder:font-medium placeholder:text-FFFFFF-25 text-white text-sm font-medium "
                    {...field}
                  />
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="card_currency"
            render={({ field }) => {
              return (
                <Currency
                  setIsOpenCurrency={setIsOpenCurrency}
                  isOpenCurrency={isOpenCurrency}
                  selectedCurrence={field.value}
                  setSelectedCurrence={(value) => {
                    field.onChange(value);
                    setSelectedCurrence(value);
                  }}
                  currencies={currencies}
                  selecteddCurrence={selectedCurrence}
                />
              );
            }}
          />

          <label className="bg-1B1A1E-50 rounded-20 p-4 flex items-center justify-between w-full">
            <p className="text-white text-xs font-normal font-unbounded">
              Включить в общий баланс
            </p>
            <div className="flex items-center gap-4">
              <label className="relative inline-flex cursor-pointer items-center">
                <Controller
                  control={control}
                  name="isBalance"
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
          <div className="px-4">
            <p className="text-9 font-normal font-unbounded text-FFFFFF-25">
              При включении этого параметра, баланс счета будет включен в общий
              баланс.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-customGray2 h-14 rounded-50 flex items-center justify-center mb-24"
        >
          <p className="text-white font-medium text-xs font-unbounded">
            Сохранить
          </p>
        </button>
      </form>
    </>
  );
};

export default CreateCard;
