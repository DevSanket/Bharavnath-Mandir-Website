import React, { useEffect } from "react";
import Router from 'next/router';

const Index = () => {

  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
        Router.push('/login')
    }
  });

  return (
    <React.Fragment>
      <h1>Redirecting...</h1>
    </React.Fragment>
  );
}

export default Index;