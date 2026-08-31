import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function DashboardLayout() {
    return (
        <div className="dashboard-container">
            <SideBar />
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};