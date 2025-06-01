import { Outlet } from "react-router-dom";
import { getAccessToken } from "../lib/spotify";
import { redirectToSpotifyLogin } from "../auth/spotifyAuth";

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a
      href={to}
      style={{
        margin: "0 10px",
        color: "white",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

function Navigation() {
  const token = getAccessToken();
  if (!token) {
    return (
      <nav>
        <button onClick={redirectToSpotifyLogin}>Log in</button>
      </nav>
    );
  }
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/your-artists">Your Artists</NavLink>
      <NavLink to="/lineup">Lineup</NavLink>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Log out
      </button>
    </nav>
  );
}

function Layout() {
  if (!getAccessToken()) {
    if (
      !(["/", "/callback"].includes(
        window.location.pathname
      ))
    ) {
      window.location.href = "/";
    }
  }
  
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#282c34",
          color: "white",
        }}
      >
        <a
          href="/"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Sastre de Primavera (Tailor of Primavera)
        </a>
        <Navigation />
      </header>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
