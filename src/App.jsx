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
import GangList from "./Pages/Private/GangList";
import SafetyEquipmentList from "./Pages/Private/SafetyEquipementList";
import GangCategoryList from "./Pages/Private/GangCategoryList";
import ConsumableItem from "./Pages/Private/ConsumableItems";
import Dispatchers from "./Pages/Private/DispatcherList";
import RegisterDispatcher from "./Pages/public/RegisterDispatcher";
import FeedbackMaster from "./Pages/Private/FeedbackMaster";
import RoleMaster from "./Pages/Private/RoleMaster";
import EscaltionMaster from "./Pages/Private/EscalationMatrix";

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
          path="/complaint-detail/:id"
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
        <Route
          path="/gang-list"
          element={
            <>
              <PageTitle title="Gang List | Complaint Management System UPPCL" />
              <GangList />
            </>
          }
        />
        <Route
          path="/equipment-list"
          element={
            <>
              <PageTitle title="Safety Checklist | Complaint Management System UPPCL" />
              <SafetyEquipmentList />
            </>
          }
        />
        <Route
          path="/category-list"
          element={
            <>
              <PageTitle title="Gang Category List | Complaint Management System UPPCL" />
              <GangCategoryList />
            </>
          }
        />
        <Route
          path="/item-list"
          element={
            <>
              <PageTitle title="Consumable Item List | Complaint Management System UPPCL" />
              <ConsumableItem />
            </>
          }
        />
        <Route
          path="/dispatcher-list"
          element={
            <>
              <PageTitle title="Dispatcher List | Complaint Management System UPPCL" />
              <Dispatchers />
            </>
          }
        />
        <Route
          path="/dispatcher-register"
          element={
            <>
              <PageTitle title="Dispatcher Registration | Complaint Management System UPPCL" />
              <RegisterDispatcher />
            </>
          }
        />
        <Route
          path="/feedback-master"
          element={
            <>
              <PageTitle title="Feedback Master | Complaint Management System UPPCL" />
              <FeedbackMaster />
            </>
          }
        />
        <Route
          path="/role-master"
          element={
            <>
              <PageTitle title="Role Master | Complaint Management System UPPCL" />
              <RoleMaster />
            </>
          }
        />
        <Route
          path="/escalation-matrix"
          element={
            <>
              <PageTitle title="Escalation Matrix | Complaint Management System UPPCL" />
              <EscaltionMaster />
            </>
          }
        />
      </Routes>
      <ContentHolder />
    </AppProvider>
  );
}

export default App;
