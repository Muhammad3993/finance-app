import UserNavbar from "@/components/user-navbar/UserNavbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ICurrence } from "../create-card/CreateCard";
import useGetCards from "@/data/hooks/currencies";
import Bag from "@/assets/icons/bag";
import ArrowRight from "@/assets/icons/arrowRight";
import Plus from "@/assets/icons/plus";
import formatBalance from "@/constants/useFormatBalance";

export interface ICards {
  id?: string;
  card_currency?: ICurrence;
  card_expiry_date?: string;
  card_finance?: number;
  card_name?: string;
  card_number?: number;
  isBalance?: boolean;
}
const Bills = () => {
  const { cards, isLoading, fetchAllCard } = useGetCards();

  useEffect(() => {
    fetchAllCard();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserNavbar isText text="Счета" textClass="text-white text-base" />
      <div className="px-4 flex flex-col gap-2">
        {cards?.map((card, index) => (
          <div
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
                Основной
              </p>
            </div>
            <ArrowRight fill="#FFFFFF80" />
          </div>
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
