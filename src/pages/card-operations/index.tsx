import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { useGetCard } from "@/data/hooks/cards";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./style/index.css";
import clsx from "clsx";

const CardOperations = () => {
  const { bill } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: card, isLoading } = useGetCard(bill);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-[100px]">
      <UserNavbar
        isText
        text={card?.card_name}
        textClass="text-white capitalize"
        isScroll
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate(-1)}
      />
      <div className="px-4">
        <div className="mt-4 mb-2 grid grid-cols-3 bg-00BF33-12 h-54 rounded-50 overflow-hidden p-1">
          <Link
            to={""}
            className={clsx(
              "flex items-center justify-center bg-transparent rounded-50 text-FFFFFF-50 font-unbounded font-medium text-10 card_operation_link",
              !location.pathname.includes(
                "/bills/" + bill + "/operations/adjustments",
              ) &&
                !location.pathname.includes(
                  "/bills/" + bill + "/operations/income",
                )
                ? "active"
                : "",
            )}
          >
            Расходы
          </Link>
          <Link
            to={"income"}
            className={clsx(
              "flex items-center justify-center bg-transparent rounded-50 text-FFFFFF-50 font-unbounded font-medium text-10 card_operation_link",
              location.pathname.includes(
                "/bills/" + bill + "/operations/income",
              )
                ? "active"
                : "",
            )}
          >
            Доходы
          </Link>
          <Link
            to={"adjustments"}
            className={clsx(
              "flex items-center justify-center bg-transparent rounded-50 text-FFFFFF-50 font-unbounded font-medium text-10 card_operation_link",
              location.pathname.includes(
                "/bills/" + bill + "/operations/adjustments",
              )
                ? "active"
                : "",
            )}
          >
            Корректировки
          </Link>
        </div>
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CardOperations;
