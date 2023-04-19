import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineSave } from "react-icons/ai";
import Admin from "../Layout/Admin";

const BankStatement = () => {
  const [money, setMoney] = useState(0.0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const SaveData = () => {};

  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              बँकेचे व्याज
            </p>
            <hr />
          </div>
          <div className="flex flex-col space-y-5 mt-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="input-label">
                तारीख
              </label>
              <DatePicker
                selected={date}
                className="input-md w-full"
                onChange={(date) => setDate(date)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="पैसे" className="input-label">
                पैसे
              </label>
              <input
                type="text"
                name="पैसे"
                className="input-md"
                value={money}
                onChange={(event) => setMoney(event.target.value)}
                placeholder="पैसे"
                required
              />
              <span className="input-error"></span>
            </div>
            <button
              disabled={loading}
              onClick={SaveData}
              className="btn-md w-full"
            >
              <AiOutlineSave
                size={20}
                className="h-4 w-4 opacity-50 absolute mr-auto"
              />
              Save
            </button>
          </div>
          {/* <div className="mt-5 space-y-3">
            {expenses.length ? (
              expenses.slice(0, limit).map((expense, i) => {
                return (
                  <ExpenseCard
                    key={i}
                    title={expense.title}
                    date={expense.date}
                    money={expense.money.$numberDecimal}
                    DeleteExpense={DeleteExpense}
                    id={expense._id}
                  />
                );
              })
            ) : (
              <p>No Transaction Yet!!</p>
            )}
            {limit < expenses.length ? (
              <button onClick={() => IncreaseLimit()} className="btn-md w-full">
                View more
              </button>
            ) : (
              <button onClick={() => descreseLimit()} className="btn-md w-full">
                View Less
              </button>
            )}
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

BankStatement.layout = Admin;

export default BankStatement;
