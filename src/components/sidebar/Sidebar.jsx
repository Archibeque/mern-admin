import "./sidebar.css";
import LineStyle from "@mui/material/Icon";
import Timeline from "@mui/material/Icon";
import TrendingUp from "@mui/material/Icon";
import PermIdentity from "@mui/material/Icon";
import Storefront from "@mui/material/Icon";
import AttachMoney from "@mui/material/Icon";
import BarChart from "@mui/material/Icon";
import MailOutline from "@mui/material/Icon";
import DynamicFeed from "@mui/material/Icon";
import ChatBubbleOutline from "@mui/material/Icon";
import WorkOutline from "@mui/material/Icon";
import Report from "@mui/material/Icon";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem disabled">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem disabled">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem disabled">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem disabled">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem disabled">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem disabled">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem disabled">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem disabled">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem disabled">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem disabled">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
