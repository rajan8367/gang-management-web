import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useUserContext } from "../hooks/userContext";

function Layout({ children }) {
  const { setMenuOpen, menuOpen } = useUserContext();
  return (
    <>
      <Header />
      <Sidebar />
      <div
        className="vertical-overlay"
        style={{ display: menuOpen && "block" }}
        onClick={() => setMenuOpen(false)}
      ></div>
      <div className="main-content">
        {children}
        <Footer />
      </div>
    </>
  );
}
export default Layout;
