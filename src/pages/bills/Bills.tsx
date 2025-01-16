import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link } from "react-router-dom";
import Bag from "@/assets/icons/bag";
import ArrowRight from "@/assets/icons/arrowRight";
import Plus from "@/assets/icons/plus";
import { ICurrency } from "@/data/hooks/currencies";
import { useGetCards } from "@/data/hooks/cards";
import { formatBalance } from "@/constants/useFormatBalance";

export interface ICards {
  id?: string;
  card_currency?: ICurrency;
  card_expiry_date?: string;
  card_finance?: number;
  card_name?: string;
  card_number?: number;
  isBalance?: boolean;
}
const Bills = () => {
  const { data: cards, isLoading } = useGetCards();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserNavbar
        isText
        text="Счета"
        isScroll
        textClass="text-white text-base"
      />
      <div className="px-4 flex flex-col gap-2">
        {cards?.map((card: ICards, index: number) => (
          <Link
            to={`/bills/${card.id}`}
            className="bg-1B1A1E-50 h-20 p-4 flex items-center justify-between gap-4 rounded-20 leading-22"
            key={index}
          >
            <div className="w-12 h-12 bg-00BF33-12 rounded-15 flex items-center justify-center">
              <Bag />
            </div>
            <div className="w-[70%] flex flex-col justify-center">
              <p className="text-white font-unbounded font-medium ">
                {formatBalance(card.card_finance)}
              </p>
              <p className="text-9 leading-3 text-FFFFFF-50 font-unbounded">
                {card.card_name}
              </p>
            </div>
            <ArrowRight fill="#FFFFFF80" />
          </Link>
        ))}
        <Link
          to={"/create-card"}
          className="bg-1B1A1E-50 h-20 p-4 flex items-center justify-between gap-4 rounded-20 leading-22"
        >
          <div className="w-12 h-12 bg-00BF33-12 rounded-15 flex items-center justify-center">
            <Plus width={16} height={16} />
          </div>
          <div className="w-[70%] flex flex-col justify-center">
            <p className="text-white font-unbounded font-medium ">Новый</p>
            <p className="text-9 leading-3 text-FFFFFF-50 font-unbounded">
              Карта и наличные
            </p>
          </div>
          <ArrowRight fill="#FFFFFF80" />
        </Link>
      </div>
    </div>
  );
};

export default Bills;
