import { useUserContext } from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IFormValues {
  finance: number;
}

const Finance = () => {
  const { setState, state } = useUserContext();

  const schema = yup.object().shape({
    finance: yup
      .number()
      .typeError("Finance must be a number")
      .positive("Finance must be greater than 0")
      .required("Finance is required"),
  });

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

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
        onBoarding: { ...state.user?.onBoarding, finance: data.finance },
      },
      pages: 3,
    });
  };

  const { t } = useTranslation();
  return (
    <form
      className='px-4 py-190 w-full h-[100vh] flex flex-col justify-between items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-28'>
        <p className='font-unbounded font-medium text-22 text-black text-center'>
          {t("finance")}
        </p>
        <div>
          <Controller
            control={control}
            name='finance'
            rules={{ required: "Finance required" }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                className='font-unbounded w-full h-54 bg-customGray rounded-2xl py-4 px-6 outline-none'
                placeholder={t("finance_placeholder")}
                value={formatNumber(field.value ?? "")}
                autoFocus
              />
            )}
          />
          {errors.finance && (
            <p className='text-xs relative left-6 top-1 h-3 text-red-500'>
              {errors.finance?.message}
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

export default Finance;
