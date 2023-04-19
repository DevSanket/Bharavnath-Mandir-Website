import Link from "next/link";
import { BsBank } from "react-icons/bs";

const BankCard = () => {
  return (
    <div className="bg-gradient-to-r from-[#95FAD9] via-[#75F8CC] to-[#4FF9C0] shadow sm:w-full p-5 rounded">
      <Link href={"/bank-statement"}>
        <div className="bg-white rounded-md shadow w-full h-full flex flex-col justify-center items-center p-5 space-y-5">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              बँकेचे व्याज
            </p>
            <hr />
          </div>
          <div className="bg-white p-2 rounded-full shadow">
            <BsBank size={30} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BankCard;
