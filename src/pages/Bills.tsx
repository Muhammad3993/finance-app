import ArrowLeft from "@/assets/icons/arrowLeft";
import Card from "@/assets/icons/card";
import Plus from "@/assets/icons/plus";
import Navigation from "@/components/navigation/Navigation";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { Link, useNavigate } from "react-router-dom";

const Bills = () => {
  const navigate = useNavigate();
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
      {false ? (
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
          <div className='bg-customGray8 p-5 rounded-20 h-180 flex flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <div className='bg-white w-44px h-44px flex justify-center items-center rounded-xl'>
                  <Card width={20} height={20} />
                </div>
                <p className='text-sm font-normal font-unbounded text-customGray2'>
                  HUMO
                </p>
              </div>
            </div>
            <div className='flex justify-between items-end'>
              <div>
                <p className='text-11 font-normal font-unbounded'>
                  9860 **** **** 4820
                </p>
                <p className='text-2xl font-medium font-unbounded'>
                  12 млн. сум
                </p>
              </div>
              <div>
                <p className='text-11 text-customGray2 opacity-35 font-unbounded font-normal'>
                  07/27
                </p>
              </div>
            </div>
          </div>
          <div className='bg-customGray8 p-5 rounded-20 h-180 flex flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <div className='bg-white w-44px h-44px flex justify-center items-center rounded-xl'>
                  <Card width={20} height={20} />
                </div>
                <p className='text-sm font-normal font-unbounded text-customGray2'>
                  HUMO
                </p>
              </div>
            </div>
            <div className='flex justify-between items-end'>
              <div>
                <p className='text-11 font-normal font-unbounded'>
                  9860 **** **** 4820
                </p>
                <p className='text-2xl font-medium font-unbounded'>
                  12 млн. сум
                </p>
              </div>
              <div>
                <p className='text-11 text-customGray2 opacity-35 font-unbounded font-normal'>
                  07/27
                </p>
              </div>
            </div>
          </div>
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
