import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineSave } from "react-icons/ai";
import Admin from "../Layout/Admin";
import { AdminContext } from "../context/Admin.context";
import BankMoneyCard from "../components/BankMoneyCard/Index";
import moment from "moment";

const BankStatement = () => {
  const [money, setMoney] = useState(0.0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [bankMoney, setBankMoney] = useState([]);
  const { currentAdmin } = useContext(AdminContext);
  const [limit, setLimit] = useState(2);

  const IncreaseLimit = () => {
    setLimit(limit + 5);
  };

  const descreseLimit = () => {
    setLimit(2);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/bank`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        setBankMoney(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch");
      });
  };

  const deleteData = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/bank/${id}`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        toast.success(" डिलीट केली");
        getData();
      })
      .catch((err) => {
        toast.error("डिलीट केली नाही");
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const SaveData = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/bank/create`,
        {
          money,
          date: moment(date).format("dddd MMMM Do YYYY, h:mm A"),
        },
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("महिती जतन झाली");
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("महिती जतन झाली नाही");
      });
    setDate(new Date());

    setMoney(0);
    setLoading(false);
  };

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
          <div className="mt-5 space-y-3">
            {bankMoney.length ? (
              bankMoney.slice(0, limit).map((expense, i) => {
                return (
                  <BankMoneyCard
                    key={i}
                    date={expense.date}
                    money={expense.money.$numberDecimal}
                    DeleteExpense={deleteData}
                    id={expense._id}
                  />
                );
              })
            ) : (
              <p>No Transaction Yet!!</p>
            )}
            {limit < bankMoney.length ? (
              <button onClick={() => IncreaseLimit()} className="btn-md w-full">
                View more
              </button>
            ) : (
              <button onClick={() => descreseLimit()} className="btn-md w-full">
                View Less
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

BankStatement.layout = Admin;

export default BankStatement;
