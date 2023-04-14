import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { AdminContext } from "../context/Admin.context";
import { hasCookie, getCookie } from "cookies-next";
import Header from "../components/Header";


const Admin = ({ children }) => {

  const { pathname } = useRouter();

  const { currentAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!hasCookie('authentication')) {
      Router.push('/login');
    }
  },[currentAdmin]);
  const [sidebar,setSidebar] = useState(false);

  

  useEffect(() => {

    if (currentAdmin) {
      if (currentAdmin.role == "ADMIN") {
        if (pathname.includes('admin-access')) {
          Router.push('/admin/dashboard');
        }
        if (pathname.includes('subscription')) {
          Router.push('/admin/dashboard');
        }
      }
    }
    
    setSidebar(false);
  },[pathname,currentAdmin]);

  if(currentAdmin == null) {
    return "Loading...";
  }

  return (
    <React.Fragment>
       <Header />
       {children}
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  console.log(getCookie('authentication'));
  return {
    props: ''
  }
}

export default Admin;