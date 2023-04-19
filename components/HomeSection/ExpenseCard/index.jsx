import Link from "next/link";
import { FcMoneyTransfer } from "react-icons/fc";

const ExpenseCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#C1F5A1] via-[#9EF569] to-[#81FC36] shadow sm:w-full p-5 rounded">
      <Link href={"/expense"}>
        <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              खर्च केलेले पैसे
            </p>
            <hr />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <FcMoneyTransfer size={30} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExpenseCard;
