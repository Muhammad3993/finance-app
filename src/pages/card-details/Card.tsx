import ArrowLeft from "@/assets/icons/arrowLeft";
import Edit from "@/assets/icons/edit";
import Settings from "@/assets/icons/settings";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link, useNavigate } from "react-router-dom";
import AnalyticsChart from "./Chart";
import OperationCards from "@/components/operation-cards/OperationCards";
import Plus from "@/assets/icons/plus";

const Card = () => {
  const navigate = useNavigate();
  return (
    <>
      <UserNavbar
        isText
        text='Необходимые'
        leftIconBoxClick={() => navigate(-1)}
        leftIcon={<ArrowLeft />}
        rightIcon={<Settings />}
      />
      <div className='px-4 mt-6'>
        <div className='bg-customGray p-3 rounded-25 flex flex-col gap-4 mb-6'>
          <div className='flex justify-between p-3'>
            <div>
              <p className='text-2xl font-bold font-unbounded text-customGray2'>
                12 млн. сум
              </p>
              <p className='text-10 font-normal font-unbounded text-customGray2'>
                бюджет на месяц
              </p>
            </div>
            <Edit />
          </div>
          <div className='w-full h-9 bg-customGray3 rounded-25 overflow-hidden mt-[-8px]'>
            <div className='w-[50%] h-full bg-customGray2 rounded-25'></div>
          </div>
          <div className='flex justify-between gap-2'>
            <div className='bg-white rounded-2xl flex flex-col gap-1 p-3 flex-1'>
              <p className='font-semibold font-unbounded text-customGray2 text-center'>
                1,1 млн сум
              </p>
              <p className='font-normal text-10 text-customGray2 font-unbounded text-center'>
                потрачено за ноябрь
              </p>
            </div>
            <div className='bg-white rounded-2xl flex flex-col gap-1 p-3 flex-1'>
              <p className='font-semibold font-unbounded text-customGray2 text-center'>
                9,8 млн сум
              </p>
              <p className='font-normal text-10 text-customGray2 font-unbounded text-center'>
                осталось на ноябрь
              </p>
            </div>
          </div>
          <AnalyticsChart />
        </div>
        <OperationCards />
        <Link
          to={"add-expense"}
          className='fixed bottom-6 left-[50%] translate-x-[-50%] border-2 border-customGray6 rounded-full shadow-customshadow'
        >
          <div className='h-68 w-68 bg-customGray2 flex items-center justify-center rounded-full backdrop-blur-[50px]'>
            <Plus />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
