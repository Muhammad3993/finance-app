import ArrowBottom from "@/assets/icons/arrowBottomFill";
import Card from "@/assets/icons/card";
import { useGetCards } from "@/data/hooks/cards";
import { ICards } from "@/pages/bills/Bills";
import clsx from "clsx";
import { useEffect } from "react";

interface IProps {
  isOpenCard: boolean;
  setIsOpenCard: (value: boolean) => void;
  isLoading: boolean;
  cards: ICards[] | null | undefined;
  selectedCard: ICards | null;
  setSelectedCard: (value: ICards) => void;
  isSavings?: boolean;
}
const CardModal = (props: IProps) => {
  const {
    isOpenCard,
    setIsOpenCard,
    isLoading,
    cards,
    selectedCard,
    setSelectedCard,
    isSavings,
  } = props;

  const { data } = useGetCards();

  const card: ICards | null | undefined = data?.filter(
    (card: ICards) => card.card_name === "Cash",
  )[0];

  useEffect(() => {
    if (card) {
      setSelectedCard(card);
    }
  }, [card]);

  return (
    <>
      {isSavings ? (
        <div className="w-full flex justify-center gap-2 px-4">
          <div
            className={
              "py-10p px-4 bg-00BF33-12 text-00BF33 flex items-center justify-center w-116 h-max rounded-50 text-10 font-unbounded font-medium"
            }
            onClick={() => setIsOpenCard(true)}
          >
            {selectedCard?.card_name
              ? selectedCard?.card_name
              : card?.card_name}
            <ArrowBottom />
          </div>
        </div>
      ) : (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-2"
          onClick={() => setIsOpenCard(true)}
        >
          <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
            <Card fill="#00BF33" />
          </div>
          <p className="text-9 font-unbounded font-medium text-FFFFFF-80">
            {selectedCard === null ? "Счет" : selectedCard.card_name}
          </p>
        </div>
      )}
      {isOpenCard && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenCard(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-1B1A1E-80 backdrop-blur-[100px] p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 left-0",
          isOpenCard ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-white text-center font-semibold">
          Выберите счет
        </p>
        <div className="grid grid-cols-2 gap-2">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            cards?.map((card: ICards, index: number) => (
              <div
                className={clsx(
                  "rounded-20 border-2 flex flex-col justify-between gap-3 py-24 px-3",
                  selectedCard?.id === card?.id
                    ? "border-00BF33 bg-00BF33-12"
                    : "border-transparent bg-FFFFFF-8",
                )}
                onClick={() => {
                  setSelectedCard(card);
                  setIsOpenCard(false);
                }}
                key={index}
              >
                <p className="text-xs text-white text-center font-normal">
                  {card.card_name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CardModal;
