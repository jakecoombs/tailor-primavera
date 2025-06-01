import { Outlet } from "react-router-dom";
import { getAccessToken } from "../lib/spotify";

function Layout() {
    const token = getAccessToken();
    return (
      <>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", backgroundColor: "#282c34", color: "white" }}>
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