import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

const CreateCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#72F9F3] via-[#72C6F9] to-[#72C6F9] shadow sm:w-full p-5 rounded">
      <Link href={"/addDengi"}>
        <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              नवीन देणगीदार
            </p>
            <hr />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <AiOutlineUserAdd size={30} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CreateCard;
