import axios from "axios";
import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import Admin from "../Layout/Admin";

const AllTransaction = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [dengi, setDengi] = useState(0);
  const [expense, setExpense] = useState(0);
  const [bank, setBank] = useState(0);
  const [limit, setLimit] = useState(5);

  const IncreaseLimit = () => {
    setLimit(limit + 5);
  };

  const descreseLimit = () => {
    setLimit(2);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/getAllInfo`)
      .then((res) => {
        console.log(res.data);
        const { expense_rs, dengi_rs, bank_rs, allTransactions } = res.data;
        setAllTransactions(allTransactions.reverse());
        setDengi(dengi_rs);
        setBank(bank_rs);
        setExpense(expense_rs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <div className="shadow bg-white rounded-md p-5 space-y-3">
          <div className="w-full">
            <p className="text-center md:text-2xl sm:text-xl font-medium mb-5">
              सर्व माहिती
            </p>
            <hr />
          </div>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            मिळालेली देणगीची रक्कम - {dengi} रुपये
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            खर्च केलेली रक्कम - {expense} रुपये
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            बॅंकेचे व्याज - {bank} रुपये
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            एकूण मिळालेली रक्कम - {bank + dengi} रुपये
          </p>
          <p className="text-start md:text-xl sm:text-sm font-medium mb-5">
            शिल्लक राहिलेली रक्कम - {bank + dengi - expense} रुपये
          </p>
        </div>
        {allTransactions.length ? (
          allTransactions
            .slice(0, limit)
            .map((details, i) => (
              <TransactionCard
                date={details.date}
                money={details.money}
                name={details.name}
                status={details.status}
                key={i}
              />
            ))
        ) : (
          <p>Loading...</p>
        )}
        {limit < allTransactions.length ? (
          <button onClick={() => IncreaseLimit()} className="btn-md w-full">
            View more
          </button>
        ) : (
          <button onClick={() => descreseLimit()} className="btn-md w-full">
            View Less
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

AllTransaction.layout = Admin;

export default AllTransaction;
