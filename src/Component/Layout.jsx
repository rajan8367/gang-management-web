import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="vertical-overlay"></div>
      <div className="main-content">
        {children}
        <Footer />
      </div>
    </>
  );
}
export default Layout;
