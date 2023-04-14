import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { AdminContext } from "../context/Admin.context";
import { getCookie, setCookie } from "cookies-next";

const Login = () => {
  const { currentAdmin, setCurrentAdmin } = useContext(AdminContext);

  useState(() => {
    if (currentAdmin != null) {
      Router.push("/home");
    }
  }, [currentAdmin]);

  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   
   await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/admin/login`,
        inputFields
      )
      .then((response) => {
     
        if (response.status == 200) {
          setCurrentAdmin(response.data.adminData);
          setCookie("authentication", JSON.stringify(response.data.adminData));
          Router.push("/home");
          toast.success("Logged in successfully");
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <section className="h-[100vh] bg-blue-50 w-full flex justify-center items-center">
        {/* Login Card (Start) */}
        <figure className="rounded-lg shadow-lg bg-white tablet:w-1/4">
          <form
            onSubmit={(event) => handleFormSubmit(event)}
            className="px-10 py-14 text-center space-y-5"
          >
            {/* Login */}
            <div>
              <h1 className="font-semibold text-2xl mb-2">भैरवनाथ मंदिर संवर्धन</h1>
              <p className="text-xs text-slate-600 mb-6">
              प्रशासक लॉगिन
              </p>
            </div>

            {/* Email address */}
            <div className="flex flex-col">
              <label htmlFor="email" className="input-label">
              आपला ई - मेल
              </label>
              <input
                type="email"
                value={inputFields.email}
                onChange={(event) => handleInputChange(event)}
                name="email"
                className="input-md"
                placeholder="आपला ई - मेल"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="input-label">
              "तुमचा पासवर्ड
              </label>
              <input
                type="password"
                value={inputFields.password}
                onChange={(event) => handleInputChange(event)}
                name="password"
                className="input-md"
                placeholder="तुमचा पासवर्ड"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="btn-md w-full">
                <AiOutlineLock
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Sign in
              </button>
            </div>

            {/* Forgot Password */}
            {/* <div>
              <p className="text-slate-600 text-xs">
                Forgot your password ?{" "}
                <Link
                  href={"/forgot-password"}
                  className="font-medium text-xs text-ascent hover:text-ascent-dark"
                >
                  Reset password
                </Link>
              </p>
            </div> */}
          </form>
        </figure>
        {/* Login Card (End) */}
      </section>
    </React.Fragment>
  );
};

export default Login;
