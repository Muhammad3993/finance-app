import ArrowLeft from "@/assets/icons/arrowLeft";
import Plus from "@/assets/icons/plus";
import Navigation from "@/components/navigation/Navigation";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICurrence } from "../create-card/CreateCard";
import Bill from "./Bill";
import useGetCards from "@/data/hooks/currencies";

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
  const navigate = useNavigate();

  const { cards, isLoading, fetchAllCard } = useGetCards();

  useEffect(() => {
    fetchAllCard();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <UserNavbar
        leftIcon={<ArrowLeft />}
        leftIconBoxClick={() => navigate(-1)}
        isText
        text='Счета'
        rightIcon={<Plus fill='#404040' />}
        rightIconBoxClick={() => navigate("/create-card")}
      />
      {cards?.length === 0 ? (
        <div className='px-4 mt-6'>
          <div className='bg-customGray8 border border-customGray9 border-dashed rounded-25 h-249 flex flex-col items-center justify-center py-10 px-12 gap-6'>
            <div>
              <div className='w-60px h-60px bg-customGray3 rounded-2xl'></div>
            </div>
            <p className='text-10 font-normal font-unbounded text-center text-customGray2'>
              Добавляйте свои счет, чтобы вести по ним учет расходов и доходов
            </p>
            <Link
              to={"/cards"}
              className='py-3 px-5 bg-white rounded-xl text-xs font-medium font-unbounded'
            >
              Добавьте счет
            </Link>
          </div>
        </div>
      ) : (
        <div className='px-4 mt-6 flex flex-col gap-4'>
          {cards?.map((card, index) => (
            <Bill key={index} card={card} />
          ))}
          <Link
            to={"/create-card"}
            className='rounded-20 border border-customGray9 border-dashed bg-customGray8 h-57 flex items-center justify-center text-xs font-normal font-unbounded text-customGray2'
          >
            Добавить счет
          </Link>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default Bills;
