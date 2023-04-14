import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import AdminCard from "../components/HomeSection/AdminCard";
import { AdminContext } from "../context/Admin.context";
import Admin from "../Layout/Admin";
import CreateCard from "../components/HomeSection/CreateCard";
import ShowListCard from "../components/HomeSection/ShowListCard";


const Home = () => {



    return ( <React.Fragment>
       
        <div className="md:max-w-[800px] sm:w-w-full py-10 mx-auto sm:px-5 space-y-4">
            <AdminCard />
            <CreateCard />
            <ShowListCard />
        </div>
    </React.Fragment> );
}

Home.layout = Admin;

export default Home;