import { useUserContext } from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IFormValues {
  cultural: number;
}

const Culturel = () => {
  const { setState, state } = useUserContext();

  console.log(state);

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const finance: number | undefined = state?.user?.onBoarding?.finance;
  const for_rent: number | undefined = state?.user?.onBoarding?.for_rent;
  const for_meal: number | undefined = state?.user?.onBoarding?.for_meal;
  const for_car: number | undefined = state?.user?.onBoarding?.for_car;
  const for_transport: number | undefined = !for_car
    ? state?.user?.onBoarding?.for_transport
    : 0;

  const for_communal: number | undefined =
    state?.user?.onBoarding?.for_communal;
  const creditsTotal: number | undefined =
    state?.user?.onBoarding?.credit?.reduce(
      (total, credit) => total + (credit.price || 0),
      0,
    ) || 0;


  const remainder: number | undefined =
    Number(finance) -
    (Number(for_rent) +
      Number(for_meal) +
      Number(for_communal) +
      Number(for_car) +
      Number(for_transport) +
      Number(creditsTotal));

  const schema = yup.object().shape({
    cultural: yup
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
          cultural: data.cultural,
        },
      },
      pages: 14,
    });
  };

  const { t } = useTranslation();
  return (
    <div className='relative px-4'>
      <form
        className=' py-190 w-full h-[100vh] flex flex-col justify-between items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col items-center w-full gap-3'>
          <p className='font-unbounded font-medium text-22 text-black text-center'>
            {t("culturel")}
          </p>
          <div className='w-full mt-16'>
            <Controller
              control={control}
              name='cultural'
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
            {errors.cultural && (
              <p className='text-xs relative left-6 top-1 h-3 text-red-500 font-unbounded'>
                {errors.cultural?.message}
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
      <div className='absolute top-[67px] left-[50%] translate-x-[-50%] bg-customGray py-4 px-8 rounded-2xl flex flex-col items-center'>
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

export default Culturel;
