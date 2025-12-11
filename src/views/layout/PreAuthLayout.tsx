import { Outlet } from "react-router-dom";
import Footer from "../../composites/footer/Footer";

function PreAuthLayout() {
  return (
    <div>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default PreAuthLayout;
