import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/Admin.context";
import Admin from "../../Layout/Admin";
import React from "react";

const ShowList = () => {
    const {currentAdmin} = useContext(AdminContext);
    const [loading, setLoading] = useState(false);
    const [ListData, setListData] = useState([]);
    const [search, setSearch] = useState("");

    const RefreshData = async () => {
        
        setLoading(true);
        await axios
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
        setLoading(false);
      };
    
      useEffect(() => {
        RefreshData();
      }, []);
    return ( 
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">

<table className="table-auto border-collapse border border-slate-500 w-full">
    <thead>
        <tr>
        <th className="border border-slate-600 w-[30%]">पावती क्रमांक</th>
        <th className="border border-slate-600 w-[60%]">देणगीदाराचे नाव</th>
        <th className="border border-slate-600 w-[10%]"></th>
        </tr>
    </thead>
    <tbody>
        {ListData.length > 0 && ListData.map((list,i) => (
           <tr key={i}>
           <td className="border border-slate-600 w-[30%]">{list.pavti_no}</td>
           <td className="border border-slate-600 w-[60%]">{list.Dengidar_name}</td>
           <td className="border border-slate-600 w-[10%]">{list.pavti_no}</td>
         </tr>
        ))}
    </tbody>
</table>


</div>
    </React.Fragment> );
}

ShowList.layout = Admin;
 
export default ShowList;