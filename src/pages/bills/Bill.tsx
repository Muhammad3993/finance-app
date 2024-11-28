import Card from "@/assets/icons/card";
import { ICards } from "./Bills";

interface IProps {
  card: ICards;
}
const Bill = (props: IProps) => {
  const { card } = props;
  const formatter = new Intl.NumberFormat(card.card_currency?.intl, {
    style: "currency",
    currency: card.card_currency?.code,
  });
  return (
    <div className='bg-customGray8 p-5 rounded-20 h-180 flex flex-col justify-between'>
      <div>
        <div className='flex items-center gap-3'>
          <div className='bg-white w-44px h-44px flex justify-center items-center rounded-xl'>
            <Card width={20} height={20} />
          </div>
          <p className='text-sm font-normal font-unbounded text-customGray2'>
            {card.card_name}
          </p>
        </div>
      </div>
      <div className='flex justify-between items-end'>
        <div>
          <p className='text-11 font-normal font-unbounded'>
            {card.card_number}
          </p>
          <p className='text-2xl font-medium font-unbounded'>
            {formatter.format(card.card_finance ?? 0)}
          </p>
        </div>
        <div>
          <p className='text-11 text-customGray2 opacity-35 font-unbounded font-normal'>
            {card.card_expiry_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bill;
