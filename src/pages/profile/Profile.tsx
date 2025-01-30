import useUserData from "@/constants/useUserData";

const Profile = () => {
  const userData = useUserData();
  console.log(userData);
  return (
    <div className="px-4">
      <div>
        <div>
          <img src={userData.photo} alt="" />
        </div>
        <div>
          <p>{userData.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
