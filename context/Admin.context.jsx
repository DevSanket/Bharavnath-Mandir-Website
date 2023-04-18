import { createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import axios from "axios";

export const AdminContext = createContext({
  currentAdmin: null,
  setCurrentAdmin: () => null,
});

export const AdminProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const value = { currentAdmin, setCurrentAdmin };

  useEffect(() => {
    if (hasCookie("authentication")) {
      try {
        JSON.parse(getCookie("authentication"));
      } catch (err) {
        console.log(err);
        deleteCookie("authentication");
        window.location = "/";
      }

      axios
        .get(`${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/admin/getUser`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(getCookie("authentication")).accessToken
            }`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setCurrentAdmin(response.data.user);
            setCookie("authentication", JSON.stringify(response.data.user));
          } else {
            deleteCookie("authentication");
          }
        })
        .catch((error) => {
          console.log(error);
          deleteCookie("authentication");
        });
    }
  }, []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
