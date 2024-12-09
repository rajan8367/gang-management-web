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
import InventoryList from "./Pages/Private/InventoryList";
import Users from "./Pages/Private/UserList";
import VanList from "./Pages/Private/VanList";
import ComplaintInfo from "./Pages/public/ComplaintInfo";
import ChangePassword from "./Pages/Private/ChangePassword";

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
              <PageTitle title="SignIn | Field Force Management" />
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Field Force Management" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/complaint-list"
          element={
            <>
              <PageTitle title="Complaints List | Field Force Management" />
              <ComplaintList />
            </>
          }
        />
        <Route
          path="/complaint-detail/:id"
          element={
            <>
              <PageTitle title="Complaint Detail | Field Force Management" />
              <ComplaintDetail />
            </>
          }
        />
        <Route
          path="/shutdown-list"
          element={
            <>
              <PageTitle title="Shutdown List | Field Force Management" />
              <ShutdownList />
            </>
          }
        />
        <Route
          path="/complaint-tracking"
          element={
            <>
              <PageTitle title="Complaint Tracking | Field Force Management" />
              <ComplaintTracking />
            </>
          }
        />
        <Route
          path="/gang-list"
          element={
            <>
              <PageTitle title="Gang List | Field Force Management" />
              <GangList />
            </>
          }
        />
        <Route
          path="/equipment-list"
          element={
            <>
              <PageTitle title="Safety Checklist | Field Force Management" />
              <SafetyEquipmentList />
            </>
          }
        />
        <Route
          path="/category-list"
          element={
            <>
              <PageTitle title="Gang Category List | Field Force Management" />
              <GangCategoryList />
            </>
          }
        />
        <Route
          path="/item-list"
          element={
            <>
              <PageTitle title="Consumable Item List | Field Force Management" />
              <ConsumableItem />
            </>
          }
        />
        <Route
          path="/dispatcher-list"
          element={
            <>
              <PageTitle title="Dispatcher List | Field Force Management" />
              <Dispatchers />
            </>
          }
        />
        <Route
          path="/dispatcher-register"
          element={
            <>
              <PageTitle title="Dispatcher Registration | Field Force Management" />
              <RegisterDispatcher />
            </>
          }
        />
        <Route
          path="/feedback-master"
          element={
            <>
              <PageTitle title="Feedback Master | Field Force Management" />
              <FeedbackMaster />
            </>
          }
        />
        <Route
          path="/role-master"
          element={
            <>
              <PageTitle title="Role Master | Field Force Management" />
              <RoleMaster />
            </>
          }
        />
        <Route
          path="/escalation-matrix"
          element={
            <>
              <PageTitle title="Escalation Matrix | Field Force Management" />
              <EscaltionMaster />
            </>
          }
        />

        <Route
          path="/inventory-list/:gangId"
          element={
            <>
              <PageTitle title="Inventory List | Field Force Management" />
              <InventoryList />
            </>
          }
        />
        <Route
          path="/user-list"
          element={
            <>
              <PageTitle title="Users List | Field Force Management" />
              <Users />
            </>
          }
        />
        <Route
          path="/van-list"
          element={
            <>
              <PageTitle title="Van List | Field Force Management" />
              <VanList />
            </>
          }
        />

        <Route
          path="/complaint-info/:complaintId"
          element={
            <>
              <PageTitle title="Complaint Info | Field Force Management" />
              <ComplaintInfo />
            </>
          }
        />
        <Route
          path="/change-password"
          element={
            <>
              <PageTitle title="Change Password | Field Force Management" />
              <ChangePassword />
            </>
          }
        />
      </Routes>
      <ContentHolder />
    </AppProvider>
  );
}

export default App;
