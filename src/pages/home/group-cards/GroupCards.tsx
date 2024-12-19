import { IGroups, useGetGroups, usePostGroups } from "@/data/hooks/groups";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import clsx from "clsx";
import GroupCard from "./GroupCard";
import { Link } from "react-router-dom";

export default function GroupCards() {
  const [groupsPer, setGroupsPer] = useState<IGroups[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { groups, isLoading, fetchGroups } = useGetGroups();
  const { isLoadingCreate } = usePostGroups();

  useEffect(() => {
    if (!isLoadingCreate) {
      fetchGroups();
    }
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className='w-full'>
        <Swiper
          key={groupsPer?.length || 0}
          slidesPerView={"auto"}
          centeredSlides={true}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          initialSlide={1}
          className='mySwiper px-10'
        >
          {groupsPer?.map((group: IGroups, index: number) => (
            <SwiperSlide key={index}>
              <Link
                to={`/card/${group.name}`}
                className={clsx(
                  "w-full h-342 rounded-35 p-5 flex flex-col justify-between items-center gap-4 bg-1B1A1E-50 backdrop-blur-50 shadow-swipe_box duration-300 overflow-hidden",
                  activeIndex === index ? "scale-100" : "scale-90",
                )}
              >
                <GroupCard group={group} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
