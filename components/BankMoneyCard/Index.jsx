import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";

const BankMoneyCard = ({ money, date, DeleteExpense, id }) => {
  return (
    <div className="flex shadow rounded-md p-2 items-center space-x-2 relative">
      <BsTrash
        onClick={() => DeleteExpense(id)}
        size={20}
        className="absolute top-2 right-2"
      />
      <FcMoneyTransfer size={50} />
      <div>
        <p className="md:text-md sm:text-sm">
          <b>पैसे - </b> {money} रुपये
        </p>

        <p className="sm:text-[12px]">{date}</p>
      </div>
    </div>
  );
};

export default BankMoneyCard;
