import React, { useContext, useEffect, useState } from "react";
import Admin from "../../Layout/Admin";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineSave } from "react-icons/ai";
import { getCookie } from "cookies-next";

const Edit = () => {
  const [dengidar, setDengidar] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [pavti_no, setPavti_no] = useState("");
  const [pavti_Date, Set_pavti_Date] = useState(new Date());
  const [Dengidar_name, setDengidar_name] = useState("");
  const [Dengidar_Address, setDengidar_Address] = useState("");
  const [mobile, setMobile] = useState(0);
  const [Dengidar_money, setDengidar_money] = useState(0);
  const [Shera, setShera] = useState("");
  const [loading, setLoading] = useState(false);
  const currentAdmin = JSON.parse(getCookie("authentication"));

  const updateData = async () => {
    setLoading(true);
    if (pavti_no === "") {
      toast.error("पावती क्रमांक नाही!");
      setLoading(false);
      return;
    }

    if (pavti_Date === "") {
      toast.error("पावती दिनांक नाही!");
      setLoading(false);
      return;
    }

    if (Dengidar_name === "") {
      toast.error("देणगीदाराचे नाव नाही!");
      setLoading(false);
      return;
    }
    if (Dengidar_Address === "") {
      toast.error("देणगीदाराचा पत्ता नाही!");
      setLoading(false);
      return;
    }
    if (mobile === "") {
      toast.error("देणगीदाराचा फोन नंबर नाही!");
      setLoading(false);
      return;
    }
    if (Dengidar_money === "") {
      toast.error("देणगीदाराने दिलेली रक्कम नाही!");
      setLoading(false);
      return;
    }
    if (mobile.length < 10) {
      toast.error("देणगीदाराचा फोन नंबर चुकिचा आहे!");
      setLoading(false);
      return;
    }

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/pavti/updatePavti/${id}`,
        {
          pavti_no: parseInt(pavti_no),
          pavti_Date: String(pavti_Date),
          Dengidar_name,
          Dengidar_Address,
          mobile,
          Dengidar_money: parseFloat(Dengidar_money),
          Shera,
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
    setLoading(false);
  };

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
        console.log(res.data.pavti[0].pavti_Date);
        setDengidar(res.data.pavti[0]);
        setPavti_no(res.data.pavti[0].pavti_no);
        setDengidar_name(res.data.pavti[0].Dengidar_name);
        setDengidar_Address(res.data.pavti[0].Dengidar_Address);
        setMobile(res.data.pavti[0].mobile);
        setDengidar_money(
          parseFloat(res.data.pavti[0].Dengidar_money.$numberDecimal)
        );
        setShera(res.data.pavti[0].Shera);
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
        <div className="shadow bg-white rounded-md p-5">
          <div>
            <p className="text-center md:text-3xl sm:text-xl font-medium mb-5">
              अद्यतन देनगीदार
            </p>
            <hr />
          </div>
          <div className="flex flex-col space-y-5 mt-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="input-label">
                पावती क्रमांक
              </label>
              <input
                type="text"
                name="name"
                className="input-md"
                value={pavti_no}
                onChange={(event) => setPavti_no(event.target.value)}
                placeholder="पावती क्रमांक"
                required
              />
              <span className="input-error"></span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="input-label">
                पावती क्रमांक
              </label>
              <DatePicker
                selected={pavti_Date}
                className="input-md w-full"
                onChange={(date) => Set_pavti_Date(date)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="देणगीदाराचे नाव" className="input-label">
                देणगीदाराचे नाव
              </label>
              <input
                type="text"
                name="देणगीदाराचे नाव"
                className="input-md"
                value={Dengidar_name}
                onChange={(event) => setDengidar_name(event.target.value)}
                placeholder="देणगीदाराचे नाव"
                required
              />
              <span className="input-error"></span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="देणगीदाराचा पत्ता" className="input-label">
                देणगीदाराचा पत्ता
              </label>
              <input
                type="text"
                name="देणगीदाराचा पत्ता"
                className="input-md"
                value={Dengidar_Address}
                onChange={(event) => setDengidar_Address(event.target.value)}
                placeholder="देणगीदाराचा पत्ता"
                required
              />
              <span className="input-error"></span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="देणगीदाराचा फोन नंबर" className="input-label">
                देणगीदाराचा फोन नंबर
              </label>
              <input
                type="text"
                name="देणगीदाराचा फोन नंबर"
                className="input-md"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                placeholder="देणगीदाराचा फोन नंबर"
                required
              />
              <span className="input-error"></span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="देणगीदाराने दिलेली रक्कम" className="input-label">
                देणगीदाराने दिलेली रक्कम
              </label>
              <input
                type="text"
                name="देणगीदाराने दिलेली रक्कम"
                className="input-md"
                value={Dengidar_money}
                onChange={(event) => setDengidar_money(event.target.value)}
                placeholder="देणगीदाराने दिलेली रक्कम"
                required
              />
              <span className="input-error"></span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="input-label">
                शेरा
              </label>
              <input
                type="text"
                name="name"
                className="input-md"
                value={Shera}
                onChange={(event) => setShera(event.target.value)}
                placeholder="शेरा"
                required
              />
              <span className="input-error"></span>
            </div>
            <button
              onClick={() => updateData()}
              disabled={loading}
              className="btn-md w-full"
            >
              <AiOutlineSave
                size={20}
                className="h-4 w-4 opacity-50 absolute mr-auto"
              />
              Save
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </React.Fragment>
  );
};

Edit.layout = Admin;

export default Edit;
