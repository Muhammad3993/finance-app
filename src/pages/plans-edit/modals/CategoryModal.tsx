import Card from "@/assets/icons/card";
import Category from "@/assets/icons/category";
import { ICategory } from "@/data/hooks/categories";
import clsx from "clsx";

interface IProps {
  isOpenCategory: boolean;
  setIsOpenCategory: (value: boolean) => void;
  isCategoryLoading: boolean;
  categories: ICategory[] | null;
  selectedCategory: ICategory | null;
  setSelectedCategory: (value: ICategory) => void;
}
const CategoryModal = (props: IProps) => {
  const {
    isOpenCategory,
    setIsOpenCategory,
    isCategoryLoading,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = props;
  return (
    <>
      <div
        className="flex-1 flex flex-col items-center justify-center gap-2"
        onClick={() => setIsOpenCategory(true)}
      >
        <div className="w-14 h-14 bg-00BF33-12 rounded-full flex justify-center items-center">
          <Category fill="#00BF33" />
        </div>
        <p className="text-9 font-unbounded font-medium text-white">
          {selectedCategory?.name || "Категория"}
        </p>
      </div>
      {isOpenCategory && (
        <div
          className="bg-black opacity-45 z-10 fixed top-0 left-0 w-full h-full"
          onClick={() => {
            setIsOpenCategory(false);
          }}
        ></div>
      )}
      <div
        className={clsx(
          "fixed w-full bg-1B1A1E-80 backdrop-blur-[100px] p-4 rounded-tl-35 rounded-tr-35 flex flex-col gap-4 z-20 duration-300 pb-8 left-0",
          isOpenCategory ? "bottom-0" : "bottom-[-100%]",
        )}
      >
        <p className="font-unbounded text-white text-center font-medium">
          Категория
        </p>
        <div className="grid grid-cols-3">
          {isCategoryLoading && <p>Loading...</p>}
          {!isCategoryLoading &&
            categories?.map((category: ICategory, index: number) => (
              <div
                className={clsx(
                  "flex flex-col items-center justify-center gap-3 relative",
                  selectedCategory?.id === category.id ? "opacity-1" : "",
                )}
                key={index}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsOpenCategory(false);
                }}
              >
                <div
                  className={clsx(
                    "w-76 h-76 flex items-center justify-center rounded-full backdrop-blur-50",
                    selectedCategory?.id === category.id
                      ? "bg-FAC21C-100 shadow-category_shadow shadow-FAC21C-12"
                      : "bg-FAC21C-1",
                  )}
                >
                  <Card
                    width={28}
                    height={28}
                    fill={
                      selectedCategory?.id !== category.id ? "#FAC21C" : "white"
                    }
                  />
                </div>
                <p
                  className={clsx(
                    "font-normal text-10 font-unbounded text-white",
                    selectedCategory?.id === category.id
                      ? "opacity-100"
                      : "opacity-50",
                  )}
                >
                  {category.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
