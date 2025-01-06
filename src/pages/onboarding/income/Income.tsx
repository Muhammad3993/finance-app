import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { IFormValues } from "../finance/Finance";
import { collection, doc, setDoc } from "firebase/firestore";
import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const Income = () => {
  const userData = useUserData();

  useEffect(() => {
    WebApp.BackButton.show();
  }, []);

  const { t } = useTranslation();

  const schema = yup.object().shape({
    card_finance: yup
      .number()
      .typeError("Finance must be a number")
      .positive("Finance must be greater than 0")
      .required("Finance is required"),
  });

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const saveCardData = async (cardData: IFormValues) => {
    try {
      const userDocRef = doc(db, "users", `${userData.telegram_id}`);

      const cardsCollectionRef = collection(userDocRef, "budget");

      const newCardDocRef = doc(cardsCollectionRef, "budget_number");

      await setDoc(newCardDocRef, {
        ...cardData,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: IFormValues) => {
    const cardData = {
      card_finance: data.card_finance,
    };
    saveCardData(cardData);
    // handleSaveBasic();
    navigate("/onboarding/finish");
  };

  return (
    <form
      className="px-4 w-full min-h-[100vh] flex flex-col justify-between items-center gap-36 bg-040308 pt-[110px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col">
        <p className="text-center text-white font-bold text-18">FinApp</p>
        <p className="font-unbounded font-bold text-2xl text-white text-center mt-111">
          Введите ваш <br /> месячный доход
        </p>
        <p className="text-FFFFFF-50 font-medium text-xs font-unbounded text-center mt-6">
          Мы распределим ваш бюджет только по <br /> самым важным категориям
        </p>
        <div className="w-full mt-24">
          <Controller
            control={control}
            name="card_finance"
            rules={{ required: "Finance required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                inputMode="numeric"
                className="font-unbounded w-full h-73 bg-00BF33-12 py-4 px-6 outline-none text-center rounded-25 placeholder:text-00BF33 placeholder:font-bold text-00BF33 font-bold"
                placeholder="0 UZS"
                value={formatNumber(field.value ?? "")}
                autoFocus
              />
            )}
          />
          {errors.card_finance && (
            <p className="text-xs relative left-6 top-1 h-3 text-red-500">
              {errors.card_finance?.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-4 px-6 rounded-[50px] bg-00BF33 text-xs font-medium font-unbounded mb-8 text-white shodow-some-shadows"
      >
        {t("confirm")}
      </button>
    </form>
  );
};

export default Income;
