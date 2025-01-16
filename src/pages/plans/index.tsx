import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Plus from "@/assets/icons/plus";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import clsx from "clsx";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const Plans = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let link;
  if (location.pathname === "/plans/incomes") {
    link = "/plans-create/incomes";
  } else {
    link = "/plans-create/expense";
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate("/")}
        rightIcon={<Plus width={24} height={24} />}
        rightIconBoxClick={() => navigate(link)}
        isText
        isScroll
        text="Планы"
        textClass="text-white"
      />
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <NavLink
            to={"/plans"}
            className={clsx(
              "py-3 px-2 text-00BF33 w-full rounded-50 flex justify-center items-center text-10 font-medium font-unbounded plan_link",
              location.pathname === "/plans" ? "bg-00BF33-12" : "",
            )}
          >
            Расходы
          </NavLink>
          <NavLink
            to={"incomes"}
            className={clsx(
              "py-3 px-2 text-00BF33 w-full rounded-50 flex justify-center items-center text-10 font-medium font-unbounded plan_link",
              location.pathname === "/plans/incomes" ? "bg-00BF33-12" : "",
            )}
          >
            Доходы
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Plans;
