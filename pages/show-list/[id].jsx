import React, { useContext, useEffect, useState } from "react";
import Admin from "../../Layout/Admin";
import { useRouter } from "next/router";
import axios from "axios";
import { AdminContext } from "../../context/Admin.context";
import { toast } from "react-toastify";

const ID = () => {
  const [dengidar, setDengidar] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { currentAdmin } = useContext(AdminContext);

  const getData = async () => {
    await axios
      .get(
        `https://bhairavnath-madir-backend.onrender.com/api/v1/pavti/getPavti/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        setDengidar(res.data.pavti[0]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch");
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        {dengidar && (
          <div>
            <p>पावती क्रमांक : {dengidar.pavti_no}</p>
            <p>तारीख : {dengidar.pavti_Date}</p>
            <p>देणगीदाराचे नाव : {dengidar.Dengidar_name}</p>
            <p>देणगीदाराचा पत्ता : {dengidar.Dengidar_Address}</p>
            <p>देणगीदाराचा फोन नंबर : {dengidar.mobile}</p>
            <p>देणगीदाराने दिलेली रक्कम : {dengidar.Dengidar_money}</p>
            <p>शेरा : {dengidar.Shera}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

ID.layout = Admin;

export default ID;
