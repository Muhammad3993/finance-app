import { useDeleteCard } from "@/data/hooks/cards";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface IProps {
  deleteCard?: boolean;
  setDeleteCard: (value: boolean) => void;
  bill?: string;
}

const DeleteCard = (props: IProps) => {
  const navigate = useNavigate();

  const { deleteCard, setDeleteCard, bill } = props;

  const { mutate: deleteCardById } = useDeleteCard();
  return (
    <>
      {deleteCard && (
        <div
          className={
            "w-full h-full bg-FFFFFF-8 backdrop-blur-100 fixed top-0 bottom-0 left-0"
          }
          onClick={() => setDeleteCard(false)}
        ></div>
      )}
      <div
        className={clsx(
          "z-20 fixed left-4 right-4 bg-1B1A1E-100 rounded-35 max-h-[80%] overflow-y-scroll duration-300",
          deleteCard ? "bottom-1/2 translate-y-1/2" : "bottom-[-100%]",
        )}
      >
        <div className="p-24">
          <p className="text-center text-white font-medium font-unbounded">
            Удаление опеарции
          </p>
          <p className="text-center w-80 leading-15 mt-4 text-FFFFFF-50 font-medium font-unbounded text-xs">
            Вы уверены, что хотите удалить операцию?
          </p>
        </div>
        <div className="p-4 flex justify-between items-center gap-2">
          <button
            type="button"
            className="w-[50%] h-12 bg-FFFFFF-8 rounded-50 text-white font-unbounded font-medium text-xs"
            onClick={() => setDeleteCard(false)}
          >
            Отмена
          </button>
          <button
            type="button"
            className="w-[50%] h-12 bg-DE3A31-8 rounded-50 text-DE3A31 font-unbounded font-medium text-xs"
            onClick={() => {
              deleteCardById(bill);
              navigate("/bills");
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCard;
