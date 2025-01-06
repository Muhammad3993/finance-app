import Flag from "@/assets/icons/flag";
import { useUserContext } from "@/context/UserContext";
import useCurrencies, { ICurrency } from "@/data/hooks/currencies";
import clsx from "clsx";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChooseValue = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { setState, state } = useUserContext();

  console.log(state.user?.currency);

  const handleChooseCurrency = (currency: ICurrency) => {
    setState({ user: { ...state.user, currency: currency } });
  };

  const { currencies, fetchAllCurriense, isLoading } = useCurrencies();

  useEffect(() => {
    fetchAllCurriense();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 w-full min-h-[100vh] flex flex-col justify-between items-center gap-36 bg-040308 pt-[110px]">
      <div className="w-full flex flex-col">
        <p className="text-center text-white font-bold text-18">FinApp</p>
        <p className="font-unbounded font-bold text-2xl text-white text-center mt-111">
          Выберите валюту
        </p>
        <p className="text-FFFFFF-50 font-medium text-xs font-unbounded text-center mt-6">
          Какая у вас основная валюта
        </p>
        <div className="w-full mt-24">
          {currencies?.map((currency, i) => (
            <div
              className={clsx(
                "flex items-center justify-between h-68 p-3 rounded-20 cursor-pointer duration-300",
                state.user?.currency?.code === currency.code
                  ? "bg-00BF33-12"
                  : "bg-inherit",
              )}
              key={i}
              onClick={() => handleChooseCurrency(currency)}
            >
              <div className="flex items-center gap-3">
                <Flag />
                <p
                  className={clsx(
                    "font-unbounded font-normal text-xs duration-300",
                    state.user?.currency?.code === currency.code
                      ? "text-00BF33"
                      : "text-white",
                  )}
                >
                  {currency.name}
                </p>
              </div>
              <p
                className={clsx(
                  "font-unbounded text-xs uppercase duration-300",
                  state.user?.currency?.code === currency.code
                    ? "text-00BF33 font-medium"
                    : "text-white font-normal",
                )}
              >
                {currency.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-[50px] bg-00BF33 text-xs font-medium font-unbounded mb-8 text-white shodow-some-shadows"
        onClick={() => navigate("income")}
      >
        {t("confirm")}
      </button>
    </div>
  );
};

export default ChooseValue;
