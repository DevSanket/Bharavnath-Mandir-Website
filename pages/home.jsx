import React, { useContext, useEffect } from "react";

import AdminCard from "../components/HomeSection/AdminCard";

import Admin from "../Layout/Admin";
import CreateCard from "../components/HomeSection/CreateCard";
import ShowListCard from "../components/HomeSection/ShowListCard";
import ExpenseCard from "../components/HomeSection/ExpenseCard";
import BankCard from "../components/HomeSection/BankCard";
import TransactionCard from "../components/HomeSection/TransactionCard";

const Home = () => {
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <AdminCard />
        <CreateCard />
        <ShowListCard />
        <ExpenseCard />
        <BankCard />
        <TransactionCard />
      </div>
    </React.Fragment>
  );
};

Home.layout = Admin;

export default Home;
