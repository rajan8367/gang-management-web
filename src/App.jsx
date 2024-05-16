import Dashboard from "./Pages/Private/Dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "./Component/PageTitle";
import { AppProvider, useUserContext } from "./hooks/userContext";
import Login from "./Pages/public/Login";
import ComplaintList from "./Pages/Private/ComplaintList";
import ComplaintDetail from "./Pages/Private/ComplaintDetail";
import ShutdownList from "./Pages/Private/Shutdown-list";
import ComplaintTracking from "./Pages/Private/ComplaintTracking";
import ContentHolder from "./Component/ContentHolder";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="SignIn | UPPCL" />
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Complaint Management System UPPCL" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/complaint-list"
          element={
            <>
              <PageTitle title="Complaints List | Complaint Management System UPPCL" />
              <ComplaintList />
            </>
          }
        />
        <Route
          path="/complaint-detail"
          element={
            <>
              <PageTitle title="Complaint Detail | Complaint Management System UPPCL" />
              <ComplaintDetail />
            </>
          }
        />
        <Route
          path="/shutdown-list"
          element={
            <>
              <PageTitle title="Shutdown List | Complaint Management System UPPCL" />
              <ShutdownList />
            </>
          }
        />
        <Route
          path="/complaint-tracking"
          element={
            <>
              <PageTitle title="Complaint Tracking | Complaint Management System UPPCL" />
              <ComplaintTracking />
            </>
          }
        />
      </Routes>
      <ContentHolder />
    </AppProvider>
  );
}

export default App;
