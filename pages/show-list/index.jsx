import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/Admin.context";
import Admin from "../../Layout/Admin";
import React from "react";
import { AiOutlineRightCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const ShowList = () => {
  const { currentAdmin } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [ListData, setListData] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(
        "https://bhairavnath-madir-backend.onrender.com/api/v1/pavti/getAll",
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        setListData(data["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        <table className="table-auto  w-full">
          <thead>
            <tr className="border-b border-t border-slate-600">
              <th className="w-[30%]">पावती क्रमांक</th>
              <th className="w-[60%]">देणगीदाराचे नाव</th>
              <th className="w-[10%]"></th>
            </tr>
          </thead>
          <tbody>
            {ListData.length > 0 &&
              ListData.map((list, i) => (
                <tr
                  key={i}
                  className="border-b border-t border-slate-600 text-center "
                >
                  <td className="w-[30%]">{list.pavti_no}</td>
                  <td className="w-[60%] ">{list.Dengidar_name}</td>
                  <td className="w-[10%]">
                    <AiOutlineRightCircle
                      onClick={() => router.push(`/show-list/${list._id}`)}
                      className="mx-auto cursor-pointer hover:text-blue-300"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

ShowList.layout = Admin;

export default ShowList;
