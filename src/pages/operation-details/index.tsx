import ArrowLeftShort from "@/assets/icons/arrowLeftShort";
import Card from "@/assets/icons/card";
import DateIcon from "@/assets/icons/dateIcon";
import EditIcon from "@/assets/icons/edit";
import Home from "@/assets/icons/home";
import ReverseIcon from "@/assets/icons/reverseIcon";
import { SettingMemo } from "@/assets/icons/setting";
import UserNavbar from "@/components/user-navbar/UserNavbar";
import { formatOperation } from "@/constants/useFormatBalance";
import { useGetOperation } from "@/data/hooks/operations";
import { useNavigate, useParams } from "react-router-dom";
import SettingsModal from "./modal/SettingsModal";
import { useState } from "react";
import DeleteOperation from "./modal/DeleteOperation";
import Savings from "@/assets/icons/savings";
import clsx from "clsx";

const OperationDetails = () => {
  const navigate = useNavigate();

  const [isOpenSettingsModal, setIsOpenSettingsModal] =
    useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const { card, operation_id } = useParams();

  const { data, isLoading } = useGetOperation(operation_id || "");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserNavbar
        leftIcon={<ArrowLeftShort />}
        leftIconBoxClick={() => navigate(-1)}
        rightIcon={<SettingMemo />}
        rightIconBoxClick={() => setIsOpenSettingsModal(true)}
      />
      <div className="flex flex-col items-center mt-2 px-4">
        {card === "Savings" ? (
          <div className="w-72px h-72px bg-008CBF flex items-center justify-center rounded-full">
            <Savings width={32} height={32} fill="white" />
          </div>
        ) : (
          <div className="w-72px h-72px bg-FA531C flex items-center justify-center rounded-full">
            <Home width={32} height={32} fill="white" />
          </div>
        )}
        <p className="mt-3 text-white text-2xl font-bold font-unbounded">
          {card !== "Savings" ? data?.category?.name : "Сбережения"}
        </p>
        {card !== "Savings" && (
          <div className="py-1 px-2 bg-FFFFFF-8 rounded-15 mt-1">
            <p className="text-9 text-FFFFFF-50 font-normal font-unbounded capitalize">
              {card}
            </p>
          </div>
        )}
        <div className="mt-24 w-full h-82 bg-DE3A31-8 rounded-25 flex items-center justify-center">
          <p
            className={clsx(
              "text-2xl font-unbounded font-bold",
              card === "Savings" ? "text-00BF33" : "text-DE3A31",
            )}
          >
            – {data && formatOperation(data.value)} UZS
          </p>
        </div>

        <div className="mt-24 w-full h-116 bg-1B1A1E-50 rounded-25 p-4 grid grid-cols-3">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14  rounded-full flex items-center justify-center",
                card === "Savings" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              <Card fill={card === "Savings" ? "#00BF33" : "#DE3A31"} />
            </div>
            <p className="text-white font-medium font-unbounded text-9">
              {data?.card?.card_name}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14  rounded-full flex items-center justify-center",
                card === "Savings" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              <DateIcon fill={card === "Savings" ? "#00BF33" : "#DE3A31"} />
            </div>
            <p className="text-white font-medium font-unbounded text-9">
              {data?.date}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div
              className={clsx(
                "w-14 h-14  rounded-full flex items-center justify-center",
                card === "Savings" ? "bg-00BF33-12" : "bg-DE3A31-12",
              )}
            >
              <ReverseIcon fill={card === "Savings" ? "#00BF33" : "#DE3A31"} />
            </div>
            <p className="text-white font-medium font-unbounded text-9">
              {data?.repeat}
            </p>
          </div>
        </div>
        {data?.description && (
          <div className="w-full bg-1B1A1E-50 mt-24 rounded-25 p-4 flex gap-2">
            <div className="w-5 h-5">
              <EditIcon width={20} height={20} />
            </div>
            <p className="text-FFFFFF-50 relative bottom-[3px]">
              {data?.description}
            </p>
          </div>
        )}
      </div>
      <SettingsModal
        isOpenSettingsModal={isOpenSettingsModal}
        setIsOpenSettingsModal={setIsOpenSettingsModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        card={card}
        operation_id={operation_id}
      />
      <DeleteOperation
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        operation_id={operation_id}
      />
    </>
  );
};

export default OperationDetails;
