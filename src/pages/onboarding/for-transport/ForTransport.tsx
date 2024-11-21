import { useUserContext } from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IFormValues {
  for_transport: number;
}

const ForTransport = () => {
  const { setState, state } = useUserContext();

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  console.log(state);
  const finance: number | undefined = state?.user?.onBoarding?.finance;
  const for_rent: number | undefined = state?.user?.onBoarding?.for_rent;
  const for_meal: number | undefined = state?.user?.onBoarding?.for_meal;
  const for_communal: number | undefined =
    state?.user?.onBoarding?.for_communal;

  const remainder: number | undefined =
    Number(finance) -
    (Number(for_rent) + Number(for_meal) + Number(for_communal));

  const schema = yup.object().shape({
    for_transport: yup
      .number()
      .max(Number(remainder))
      .typeError("Finance must be a number")
      .positive("Finance must be greater than 0")
      .required("Finance is required"),
  });

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
          for_transport: data.for_transport,
        },
      },
      pages: 9,
    });
  };

  const { t } = useTranslation();
  return (
    <div className='relative px-4'>
      <form
        className='w-full min-h-[100vh] flex flex-col justify-center items-center gap-36'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col items-center w-full gap-3'>
          <p className='font-unbounded font-medium text-22 text-black text-center'>
            {t("for_transport")}
          </p>
          <p className='text-center text-xs w-60p text-black font-unbounded'>
            {t("for_transport_title")}
          </p>
          <div className='w-full mt-10'>
            <Controller
              control={control}
              name='for_transport'
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
            {errors.for_transport && (
              <p className='text-xs relative left-6 top-1 h-3 text-red-500 font-unbounded'>
                {errors.for_transport?.message}
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
      <div className='absolute top-[10px] left-[50%] translate-x-[-50%] bg-customGray py-4 px-8 w-[70%] rounded-2xl flex flex-col items-center'>
        <p className='font-unbounded text-sm font-medium text-black'>
          {remainder?.toLocaleString()} сум
        </p>
        <p className='font-unbounded text-sm font-normal text-black'>
          остается
        </p>
      </div>
    </div>
  );
};

export default ForTransport;
