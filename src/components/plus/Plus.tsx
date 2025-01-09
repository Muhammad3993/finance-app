import Plus from "@/assets/icons/plus";
import { Link } from "react-router-dom";
interface IProps {
  link: string;
}

const PlusComponent = (props: IProps) => {
  const { link } = props;
  return (
    <div className="fixed bottom-6 left-[50%] translate-x-[-50%] border-4 border-00BF33-12 rounded-full shadow-green-shadow backdrop-blur-50">
      <Link
        to={link}
        className="h-60px w-60px bg-00BF33 flex items-center justify-center rounded-full backdrop-blur-[50px]"
      >
        <Plus />
      </Link>
    </div>
  );
};

export default PlusComponent;
