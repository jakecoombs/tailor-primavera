import { Outlet } from "react-router-dom";
import { getAccessToken } from "../lib/spotify";

function Layout() {
    const token = getAccessToken();
    return (
      <>
        <header>
        Sastre de Primavera (Tailor of Primavera)
        <nav>
            {token ? (
                <button onClick={() => {localStorage.clear();window.location.href = "/"}}>Log out</button>
            ) : (
                <span>Not logged in</span>
            )}
        </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </>
    );
  }
  
  export default Layout;