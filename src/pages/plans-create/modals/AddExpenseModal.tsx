import clsx from "clsx";
import { Control, Controller } from "react-hook-form";
import EditIcon from "@/assets/icons/edit";
import { IOperationData } from "@/pages/add-expense/AddExpense";

interface IProps {
  isOpenPopup: boolean;
  setIsOpenPopup: (value: boolean) => void;
  setValue: (name: keyof IOperationData, value: string) => void;
  control: Control<IOperationData>;
  isText: boolean;
  iconBoxClass?: string;
  divClass?: string;
  iconFill?: string;
  iconWidth?: number;
}
const AddExpenseModal = (props: IProps) => {
  const {
    isOpenPopup,
    setIsOpenPopup,
    setValue,
    control,
    isText,
    divClass,
    iconBoxClass,
    iconFill,
    iconWidth,
  } = props;
  return (
    <>
      <div className={clsx("", divClass)}>
        <div
          className={clsx("", iconBoxClass)}
          onClick={() => setIsOpenPopup(true)}
        >
          <EditIcon fill={iconFill} width={iconWidth} height={iconWidth} />
          <p className="text-9 font-unbounded font-medium text-FFFFFF-80">
            {isText && "Заметка"}
          </p>
        </div>
      </div>
      {isOpenPopup && (
        <div
          className="bg-black opacity-35 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenPopup(false);
            setValue("description", "");
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full h-[70%] bg-1B1A1E-80 p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 backdrop-blur-[100px] left-0",
          isOpenPopup ? "bottom-[0]" : "bottom-[-100%]",
        )}
      >
        <div className="p-4 bg-customGray rounded-25 h-20">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <textarea
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}
                placeholder="Ваша заметка"
                rows={3}
                style={{ overflow: "hidden", resize: "none" }}
                className="text-9 font-unbounded text-gray-500 w-full outline-none bg-inherit"
              />
            )}
          />
        </div>
        <div
          className="bg-00BF33 w-full flex items-center justify-center h-14 rounded-35"
          onClick={() => setIsOpenPopup(false)}
        >
          <p className="text-white text-xs font-medium font-unbounded">
            Сохранить
          </p>
        </div>
      </div>
    </>
  );
};

export default AddExpenseModal;
