import React from "react";
import App from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { AdminProvider } from "../context/Admin.context";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class MyApp extends App {
  render() {

    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <AdminProvider>
          <Head>
            <title>Admin Panel</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AdminProvider>
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnHover={false} />
      </React.Fragment>
    );
  }
}