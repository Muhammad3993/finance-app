import IconClose from "@/assets/icons/iconClose";
import useUserData from "@/constants/useUserData";

const Profile = () => {
  const userData = useUserData();
  console.log(userData);
  return (
    <div className="px-4 mt-[110px]">
      <div className="bg-1B1A1E-50 w-full h-92 py-4 px-5 rounded-25 flex items-center justify-start gap-5">
        <div className="w-60px h-60px rounded-full overflow-hidden">
          <img src={userData.photo} alt="" />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-unbounded font-medium leading-22 text-white">
            {userData.name}
          </p>
          <p className="font-unbounded font-normal text-xs leading-4 text-FFFFFF-50">
            @{userData.username}
          </p>
        </div>
      </div>

      <div className="w-full py-4 px-5 rounded-25 bg-00BF33-12 mt-4 relative">
        <div className="w-6 h-6 bg-293c31 rounded-50 flex items-center justify-center absolute right-4">
          <IconClose />
        </div>
        <p className="font-unbounded font-medium text-00BF33 uppercase">
          finapp pro
        </p>
        <p className="font-unbounded font-normal text-10 text-white">
          Больше функций с подпиской PRO
        </p>
        <div className="bg-00BF33-12 border border-00BF33 rounded-25 w-max py-2 px-4 mt-[10px]">
          <p className="text-10 text-00BF33 font-unbounded font-medium">
            Перейти
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
