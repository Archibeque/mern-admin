import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";

export default function Topbar() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">NNADIDAN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">1</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img
            src={
              currentUser?.img ||
              "https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            }
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
