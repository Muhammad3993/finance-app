import CloseIcon from "@/assets/icons/closeIcon";
import Free from "@/assets/icons/free";
import formatBalance from "@/constants/useFormatBalance";
import useUserData from "@/constants/useUserData";
import { IGroups, useGetGroups } from "@/data/hooks/groups";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GroupCards() {
  const userData = useUserData();
  const [groupsPer, setGroupsPer] = useState<IGroups[] | null>(null);
  const { groups, isLoading, fetchGroups } = useGetGroups();

  console.log(groups);

  useEffect(() => {
    fetchGroups();
  }, []);

  const totalValue = groups?.reduce((accumulator, currentGroup) => {
    if (currentGroup.value !== undefined) {
      return accumulator + currentGroup.value;
    }
    return accumulator;
  }, 0);
  useEffect(() => {
    if (totalValue) {
      const groupsWithPercentage: IGroups[] | undefined = groups?.map(
        (group) => {
          if (group.value !== undefined) {
            const spendPercentage = (group.value / totalValue) * 100;
            return { ...group, spendPercentage };
          }
          return group;
        },
      );
      if (groupsWithPercentage) {
        setGroupsPer(groupsWithPercentage);
      }
    } else {
      console.log("Total value is 0 or undefined.");
    }
  }, [totalValue]);

  console.log(totalValue);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='grid grid-cols-2 grid-rows-2 gap-3 px-4'>
      {groupsPer?.map((group: IGroups, index: number) => (
        <Link
          to={`/card/${group.name}`}
          className={`col-span-1 last:col-span-2 bg-customGray p-3.5 rounded-22 first:col-span-2 first:row-span-2 h-full first:flex first:flex-col justify-between relative`}
          key={index}
        >
          <div className='flex items-center gap-2'>
            <p className='text-10 font-medium font-unbounded text-customGray2'>
              {group.name}
            </p>
          </div>
          <div>
            <p className='text-customGray2 font-bold font-unbounded'>
              {formatBalance(group.value)} сум
            </p>
            <p className='text-customGray2 opacity-50 text-10 font-unbounded'>
              осталось на ноябрь
            </p>
            <div className='w-full h-9 bg-customGray3 rounded-25 overflow-hidden mt-2'>
              <div className='w-[50%] h-full bg-customGray2 rounded-25'></div>
            </div>
          </div>
          <div className='p-1 rounded-7 bg-customGray7 w-max text-10 font-bold font-unbounded text-customGray2 absolute top-[15px] right-[15px]'>
            {group.spendPercentage}%
          </div>
        </Link>
      ))}
      <div
        className={`col-span-1 last:col-span-2 bg-customGray8 p-3.5 rounded-25 first:col-span-1 first:row-span-2 h-full last:flex justify-between`}
      >
        <div className='flex gap-4'>
          <Free />
          <div>
            <p className='text-sm font-unbounded font-bold text-customGray2'>
              {formatBalance(userData.reminderCash)} сум
            </p>
            <p className='text-10 font-normal font-unbounded text-customGray2 opacity-50'>
              Не входят в бюджет
            </p>
            <div className='font-unbounded font-medium text-8 border border-customGray2 w-max py-2 px-3 rounded-25 mt-3'>
              Добавить
            </div>
          </div>
        </div>
        <div>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
