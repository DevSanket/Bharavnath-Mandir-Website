import React, { useContext, useEffect, useState } from "react";
import Admin from "../Layout/Admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineLock, AiOutlineSave } from "react-icons/ai";
import { AdminContext } from "../context/Admin.context";
import moment from "moment";
import ExpenseCard from "../components/ExpenseCard";

const AddDengi = () => {
  const { currentAdmin } = useContext(AdminContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [money, setMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimit] = useState(2);

  const IncreaseLimit = () => {
    setLimit(limit + 5);
  };

  const descreseLimit = () => {
    setLimit(2);
  };

  const SaveData = async () => {
    setLoading(true);
    if (title === "") {
      toast.error("कारण नाही!");
      setLoading(false);
      return;
    }

    if (description === "") {
      toast.error("सर्व तपशील नाही!");
      setLoading(false);
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/expense`,
        {
          title,
          description,
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
    setTitle("");
    setDescription("");
    setMoney(0);
    setLoading(false);
  };

  const DeleteExpense = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/expense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/expenses`, {
        headers: {
          Authorization: `Bearer ${currentAdmin.accessToken}`,
        },
      })
      .then((res) => {
        setExpenses(res.data.expenses.reverse());
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
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              खर्च केलेले पैसे
            </p>
            <hr />
          </div>
          <div className="flex flex-col space-y-5 mt-5">
            <div className="flex flex-col">
              <label htmlFor="कारण" className="input-label">
                कारण
              </label>
              <input
                type="text"
                name="name"
                className="input-md"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="कारण"
                required
              />
              <span className="input-error"></span>
            </div>
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
              <label htmlFor="सर्व तपशील" className="input-label">
                सर्व तपशील
              </label>
              <input
                type="text"
                name="सर्व तपशील"
                className="input-md"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="सर्व तपशील"
                required
              />
              <span className="input-error"></span>
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

AddDengi.layout = Admin;

export default AddDengi;
