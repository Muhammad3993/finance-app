import {
  IGroups,
  useGetGroupsBalance,
  usePostGroupsBudget,
} from "@/data/hooks/groups";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import clsx from "clsx";
import GroupCard from "./GroupCard";
import { Link } from "react-router-dom";

export default function GroupCards() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { groupsBudget, isLoading, fetchGroups } = useGetGroupsBalance();

  const { isLoadingCreate } = usePostGroupsBudget();

  useEffect(() => {
    fetchGroups();
  }, []);


  if (isLoading || isLoadingCreate) return <div className="h-342">Loading...</div>;

  return (
    <>
      <div className="w-full h-342">
        <Swiper
          key={groupsBudget?.length || 0}
          slidesPerView={"auto"}
          centeredSlides={true}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          initialSlide={1}
          className="mySwiper px-10"
        >
          {groupsBudget?.map((group: IGroups, index: number) => (
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
