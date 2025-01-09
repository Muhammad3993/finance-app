import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Arrows from "@/assets/icons/arrows";
import Reverse from "@/assets/icons/reverse";
import SettingIcon from "@/assets/icons/settingIcon";
import CardOperation from "@/components/card-operation/CardOperation";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import formatBalance from "@/constants/useFormatBalance";
import { useGetCardOperations } from "@/data/hooks/card-operations";
import { useGetCard } from "@/data/hooks/cards";
import clsx from "clsx";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BillDetailModal from "./modal/BillDetailModal";
import PlusComponent from "@/components/plus/Plus";

const BillDetails = () => {
  const { bill } = useParams();

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const { data: card, isLoading: isLoadingCard } = useGetCard(bill);
  const { data, isLoading } = useGetCardOperations(bill);

  const navigate = useNavigate();

  if (isLoading || isLoadingCard) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pb-[100px]">
      <div className="bg-1B1A1E-50 p-24 pt-0 rounded-bl-45 rounded-br-45">
        <UserNavbar
          leftIcon={<ArrowLeftShort />}
          leftIconBoxClick={() => navigate(-1)}
          isText
          text={card?.card_name}
          isScroll
          textClass="text-white"
        />
        <div
          className={clsx(
            "bg-00BF33 w-full h-[390px] blur-[150px] fixed z-[-1] -top-[340px]",
          )}
        ></div>
        <div className="py-24">
          <p className="text-32 font-bold font-unbounded text-white text-center">
            {formatBalance(card?.card_finance) || 0} сум
          </p>
          <p className="text-9 font-unbounded font-normal text-FFFFFF-50 text-center">
            Текущий баланс
          </p>
        </div>
        <div className="grid grid-cols-3 mt-18">
          <div
            className="flex flex-col items-center gap-2"
            onClick={() => setIsOpenPopup(true)}
          >
            <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-full">
              <Reverse />
            </div>
            <p className="text-center text-9 font-medium font-unbounded text-FFFFFF-80 w-14">
              Изменить баланс
            </p>
          </div>
          <Link
            to={`/bills/${bill}/operations`}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-full">
              <Arrows />
            </div>
            <p className="text-center text-9 font-medium font-unbounded text-FFFFFF-80 w-14">
              Операции
            </p>
          </Link>
          <Link
            to={`/bills/${bill}/edit`}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-00BF33-12 flex items-center justify-center rounded-full">
              <SettingIcon />
            </div>
            <p className="text-center text-9 font-medium font-unbounded text-FFFFFF-80 w-14">
              Настройки счета
            </p>
          </Link>
        </div>
      </div>
      <div className="px-4 mt-24">
        <p className="text-base font-unbounded font-medium text-white mb-3">
          Операции
        </p>
        <div className="flex flex-col gap-2">
          {data?.map((operation, i: number) => (
            <CardOperation operation={operation} key={i} />
          ))}
        </div>
      </div>

      <BillDetailModal
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        bill={bill}
      />

      <PlusComponent link={`/bills/${bill}/add-income`} />
    </div>
  );
};

export default BillDetails;
