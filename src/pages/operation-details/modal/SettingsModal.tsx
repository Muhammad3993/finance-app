import clsx from "clsx";
import { Link } from "react-router-dom";

interface IProps {
  isOpenSettingsModal: boolean;
  setIsOpenSettingsModal: (value: boolean) => void;
  setIsOpenDeleteModal: (value: boolean) => void;
  card?: string;
  operation_id?: string;
}
const SettingsModal = (props: IProps) => {
  const {
    isOpenSettingsModal,
    setIsOpenSettingsModal,
    setIsOpenDeleteModal,
    card,
    operation_id,
  } = props;


  return (
    <>
      {isOpenSettingsModal && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenSettingsModal(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-1B1A1E-80 backdrop-blur-[100px] p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 left-0",
          isOpenSettingsModal ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="text-center h-46 flex items-center justify-center text-white font-semibold font-unbounded text-base">
          Настройки
        </p>
        <div className="flex flex-col gap-2">
          <Link
            to={`/card/${card}/operations/${operation_id}/edit`}
            className="w-full h-12 bg-FFFFFF-8 rounded-full text-white flex items-center justify-center font-unbounded font-medium text-xs"
          >
            Изменить
          </Link>
          <div
            className="w-full h-12 bg-FFFFFF-8 rounded-full text-DE3A31 flex items-center justify-center font-unbounded font-medium text-xs"
            onClick={() => {
              setIsOpenDeleteModal(true);
              setIsOpenSettingsModal(false);
            }}
          >
            Удалить
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
