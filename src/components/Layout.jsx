import { Outlet } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'


export default function Layout() {
    return (
      <div className="d-flex flex-column">
        <Header />
        <main style={{ minHeight: "100vh", flex: 1, }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}