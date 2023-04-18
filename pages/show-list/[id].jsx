import React, { useContext, useEffect, useState } from "react";
import Admin from "../../Layout/Admin";
import { useRouter } from "next/router";
import axios from "axios";
import { AdminContext } from "../../context/Admin.context";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

const ID = () => {
  const [dengidar, setDengidar] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { currentAdmin } = useContext(AdminContext);

  const getData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/getPavti/${id}`,
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

  const deleteData = async () => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/deletePavti/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentAdmin.accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("देणगीदाराची पावती डिलीट केली");
        router.push("/show-list");
      })
      .catch((err) => {
        toast.error("देणगीदाराची पावती डिलीट केली नाही");
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
        {dengidar && (
          <>
            <div>
              <p>पावती क्रमांक : {dengidar.pavti_no}</p>
              <p>तारीख : {dengidar.pavti_Date}</p>
              <p>देणगीदाराचे नाव : {dengidar.Dengidar_name}</p>
              <p>देणगीदाराचा पत्ता : {dengidar.Dengidar_Address}</p>
              <p>देणगीदाराचा फोन नंबर : {dengidar.mobile}</p>
              <p>देणगीदाराने दिलेली रक्कम : {dengidar.Dengidar_money} रुपये</p>
              <p>शेरा : {dengidar.Shera}</p>
            </div>
            <div className="flex md:flex-row sm:flex-col md:space-x-5 sm:space-x-0 md:space-y-0 sm:space-y-5">
              <button type="submit" className="btn-md w-full">
                <Link href={`/edit/${dengidar._id}`}>
                  <AiOutlineEdit
                    size={20}
                    className="h-4 w-4 opacity-50 absolute mr-auto text-white"
                  />
                  Edit
                </Link>
              </button>
              <button
                type="submit"
                className="btn-md-delete w-full bg-red-400 "
                onClick={() => deleteData()}
              >
                <AiOutlineDelete
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                  color="#fff"
                />
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

ID.layout = Admin;

export default ID;
