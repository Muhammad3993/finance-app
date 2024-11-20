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

  const schema = yup.object().shape({
    for_rent: yup
      .number()
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
    setState({pages: 5, user: {...state.user, onBoarding: {...state.user?.onBoarding, for_rent: 0}}});
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
            {t("how_much_spend_rent")}
          </p>
          <p className='text-center text-xs w-60p text-customGray1 font-unbounded'>
            {t("how_much_spend_rent_title")}
          </p>
          <div className='w-full mt-14'>
            <Controller
              control={control}
              name='for_rent'
              rules={{ required: "Finance required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type='number'
                  className='font-unbounded w-full h-54 bg-customGray rounded-2xl py-4 px-6 outline-none'
                  placeholder={t("finance_placeholder")}
                  value={field.value ?? ""}
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
      <div className='absolute top-[67px] left-[50%] translate-x-[-50%] bg-customGray py-4 px-8 rounded-2xl flex flex-col items-center'>
        <p className='font-unbounded text-sm font-medium text-black'>
          {state?.user?.onBoarding?.finance} сум
        </p>
        <p className='font-unbounded text-sm font-normal text-black'>
          остается
        </p>
      </div>
    </div>
  );
};

export default Rent;
