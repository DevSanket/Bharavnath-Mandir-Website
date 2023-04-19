import Link from "next/link";
import { FcTodoList } from "react-icons/fc";

const TransactionCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#EA97FB] via-[#E372F9] to-[#DF5BF9] shadow sm:w-full p-5 rounded">
      <Link href={"/all-transactions"}>
        <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              सर्व माहिती
            </p>
            <hr />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <FcTodoList size={30} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TransactionCard;
