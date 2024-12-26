import useUserData from "@/constants/useUserData";
import { db } from "@/firebaseConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { collection, doc, setDoc } from "firebase/firestore";
import {  useLayoutEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IProps {
  isOpenPopup: boolean;
  setIsOpenPopup: (value: boolean) => void;
}

interface IFormValues {
  value: number;
}

const BudgetModal = (props: IProps) => {
  const { isOpenPopup, setIsOpenPopup } = props;

  const userData = useUserData();

  const schema = yup.object().shape({
    value: yup
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

  const onSubmit = (data: IFormValues) => {
    const cardData = {
      value: data.value,
    };
    saveCardData(cardData);
    setIsOpenPopup(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (isOpenPopup) {
      // requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        console.log("Loading...");
      // });
      // setTimeout(() => {
      //   if (inputRef.current) {
      //     inputRef.current.focus();

      //   }
      //   console.log("Loading...");

      // }, 3000);
    }
  }, [isOpenPopup]);

  return (
    <>
      {isOpenPopup && (
        <div
          className="bg-black opacity-35 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenPopup(false);
          }}
        ></div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(
          "fixed w-full bg-1B1A1E-80 p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 backdrop-blur-[100px]",
          isOpenPopup ? "bottom-[0]" : "bottom-[-100%]",
        )}
      >
        <div className="w-full h-82 bg-FFFFFF-8 rounded-25 overflow- py-24 px-4 flex items-center">
          <Controller
            control={control}
            name="value"
            rules={{ required: "Budget reuqired" }}
            render={({ field }) => {
              return (
                <input
                  {...field}
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  className="h-full w-full bg-transparent outline-none font-unbounded text-2xl pr-1 text-right text-white placeholder:text-white"
                  value={formatNumber(field.value ?? "")}
                  placeholder="0"
                />
              );
            }}
          />
          <p className="text-2xl text-white font-unbounded">UZS</p>
        </div>
        {errors.value && (
          <p className="text-xs relative left-6 -top-1 h-3 text-red-500">
            {errors.value?.message}
          </p>
        )}
        <button
          type="submit"
          className="h-14 w-full bg-00BF33 rounded-35 flex items-center justify-center"
        >
          <p className="font-unbounded text-white text-xs">Подтвердить</p>
        </button>
      </form>
    </>
  );
};

export default BudgetModal;