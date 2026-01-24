import { Outlet } from "react-router-dom";
import MainBar from "../navigation/MainBar";

const Layout = () => {   
  return(
    <>
      <MainBar />
      <div className="corporate-layout">
        <div className="heading-corporate">
          <h2 
          className="heading-sub u-center-text">Un préstamo que</h2>
          <h2 
          className="heading-sub u-center-text">te ayuda de verdad</h2>
          <h1
            className="brand"
          >
            k<span className="blue">r</span>edi
          </h1>
        </div>
        <div className="corporate-content-container">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout;
