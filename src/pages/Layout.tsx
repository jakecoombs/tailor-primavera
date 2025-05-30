import { Outlet } from "react-router-dom";

function Layout() {
    return (
      <>
        <header>
        Sastre de Primavera (Tailor of Primavera)
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
  
  export default Layout;