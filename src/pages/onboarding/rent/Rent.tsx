import { useUserContext } from "@/context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface IFormValues {
  for_rent: number;
}

const Rent = () => {
  const { setState, state } = useUserContext();

  console.log(state);

  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") value = value.toString();
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const schema = yup.object().shape({
    for_rent: yup
      .number()
      .max(Number(state.user?.onBoarding?.finance))
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
        onBoarding: { ...state.user?.onBoarding, for_rent: data.for_rent },
      },
      pages: 5,
    });
  };

  const handleLater = () => {
    setState({
      pages: 5,
      user: {
        ...state.user,
        onBoarding: { ...state.user?.onBoarding, for_rent: 0 },
      },
    });
  };

  const { t } = useTranslation();
  return (
    <div className='relative px-4'>
      <div className='bg-customGray py-4 px-8 w-[70%] rounded-2xl flex flex-col items-center mt-10 m-auto'>
        <p className='font-unbounded text-sm font-medium text-black'>
          {state?.user?.onBoarding?.finance?.toLocaleString()} сум
        </p>
        <p className='font-unbounded text-sm font-normal text-black'>
          остается
        </p>
      </div>
      <form
        className='w-full flex flex-col justify-center items-center gap-36 mt-10'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col items-center w-full gap-3'>
          <p className='font-unbounded font-medium text-22 text-black text-center'>
            {t("how_much_spend_rent")}
          </p>
          <p className='text-center text-xs w-60p text-customGray1 font-unbounded'>
            {t("how_much_spend_rent_title")}
          </p>
          <div className='w-full mt-10'>
            <Controller
              control={control}
              name='for_rent'
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
            {errors.for_rent && (
              <p className='text-xs relative left-6 top-1 h-3 text-red-500 font-unbounded'>
                {errors.for_rent?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='py-3 px-6 rounded-2xl bg-customGray text-base font-medium font-unbounded'
          >
            {t("confirm")}
          </button>
          <div
            className='h-11 text-sm font-normal text-center text-customGray1 flex items-center justify-center mt-3 font-unbounded'
            onClick={() => handleLater()}
          >
            {t("later")}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Rent;
