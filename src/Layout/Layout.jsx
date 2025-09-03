import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Page content will appear here */}
      </main>
      <Footer />
    </>
  );
};


export default Layout;



