import { useUserContext } from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface IFormValues {
  creadit_name: string;
  creadit_price: number;
  credit_month: number;
}

const CreateCredit = () => {
  const { setState, state } = useUserContext();
  console.log(state);

  useEffect(() => {
    WebApp.BackButton.show();
  }, []);

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const schema = yup.object().shape({
    creadit_name: yup.string().required("Finance name is required"),
    creadit_price: yup
      .number()
      .typeError("Finance must be a number")
      .positive("Finance must be greater than 0")
      .required("Finance is required"),
    credit_month: yup
      .number()
      .typeError("Finance must be a number")
      .positive("Finance must be greater than 0")
      .required("Finance is required"),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormValues) => {
    setState({
      user: {
        ...state.user,
        onBoarding: {
          ...state.user?.onBoarding,
          credit: [
            {
              name: data.creadit_name,
              price: data.creadit_price,
              months: data.credit_month,
            },
            ...(state.user?.onBoarding?.credit || []),
          ],
        },
      },
    });
    navigate("/onboarding/credits");
  };

  const { t } = useTranslation();
  return (
    <form
      className='px-4 w-full min-h-[100vh] flex flex-col justify-center items-center gap-36 py-10'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-10'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("create_credit_title")}
        </p>
        <div className='flex flex-col gap-3'>
          <Controller
            control={control}
            name='creadit_name'
            rules={{ required: "Finance required" }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                className='font-unbounded w-full h-54 bg-customGray rounded-2xl py-4 px-6 outline-none'
                placeholder={t("creadit_name")}
                value={field.value ?? ""}
                autoFocus
              />
            )}
          />
          {errors.creadit_name && (
            <p className='text-xs relative left-6 top-1 h-3 text-red-500'>
              {errors.creadit_name?.message}
            </p>
          )}
          <Controller
            control={control}
            name='creadit_price'
            rules={{ required: "Finance required" }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                className='font-unbounded w-full h-54 bg-customGray rounded-2xl py-4 px-6 outline-none'
                placeholder={t("creadit_month_price")}
                value={formatNumber(field.value ?? "")}
              />
            )}
          />
          {errors.creadit_price && (
            <p className='text-xs relative left-6 top-1 h-3 text-red-500'>
              {errors.creadit_price?.message}
            </p>
          )}
          <Controller
            control={control}
            name='credit_month'
            rules={{ required: "Finance required" }}
            render={({ field }) => (
              <input
                {...field}
                type='number'
                className='font-unbounded w-full h-54 bg-customGray rounded-2xl py-4 px-6 outline-none'
                placeholder={t("Введите кол-во месяцев")}
                value={field.value ?? ""}
              />
            )}
          />
          {errors.credit_month && (
            <p className='text-xs relative left-6 top-1 h-3 text-red-500'>
              {errors.credit_month?.message}
            </p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
      >
        {t("confirm")}
      </button>
    </form>
  );
};

export default CreateCredit;
