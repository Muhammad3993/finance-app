import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./operations.css";
import OperationCard from "@/components/operation-cards/OperationCard";
import CalendarIcon from "@/assets/icons/calendar";
import { useGetOperations } from "@/data/hooks/operations";
import { formatOperation } from "@/constants/useFormatBalance";

const Operations = () => {
  const navigate = useNavigate();

  const { card } = useParams();

  const { data: operations, isLoading } = useGetOperations(card);

  const value =
    operations?.reduce((acc, operation) => acc + +operation.value, 0) || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClass="cursor-pointer"
        leftIconBoxClick={() => navigate(-1)}
        isText
        isScroll
        text="Операции"
        textClass="text-white"
      />
      <div className="h-38 px-4 grid grid-cols-3">
        <NavLink
          to={"/card/Necessary/operations"}
          className="text-FFFFFF-50 text-10 font-medium font-unbounded flex items-center justify-center operations_link rounded-50"
        >
          Необходимые
        </NavLink>
        <NavLink
          to={"/card/Desired/operations"}
          className="text-FFFFFF-50 text-10 font-medium font-unbounded flex items-center justify-center operations_link rounded-50"
        >
          Желаемые
        </NavLink>
        <NavLink
          to={"/card/Savings/operations"}
          className="text-FFFFFF-50 text-10 font-medium font-unbounded flex items-center justify-center operations_link rounded-50"
        >
          Сбережения
        </NavLink>
      </div>
      <div className="px-4">
        {operations === null ? (
          <div className="flex flex-col items-center justify-center h-20 w-full gap-4">
            <CalendarIcon />
            <p className="text-FFFFFF-25 text-9 font-unbounded font-normal">
              Сегодня расходов не было
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mt-4 border-b border-FFFFFF-15 pb-2">
              <p className="font-medium font-unbounded text-xs text-FFFFFF-50">
                Сегодня
              </p>
              <p className="font-medium font-unbounded text-xs text-FFFFFF-50">
                – {formatOperation(value)} UZS
              </p>
            </div>
            <div className="mt-3">
              {operations?.map((operation, i: number) => (
                <OperationCard operation={operation} key={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Operations;
