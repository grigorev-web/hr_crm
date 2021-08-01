import {
  FaBars,
  FaChartPie,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUserCircle,
  FaUsers,
  FaUserShield
} from "react-icons/fa";
import { reducer } from "../store/reducer";
import OutsideAlerter from "./OutsideAlerter";
import msContactLogo from "../static/img/favicon.png";
import { Link, useLocation } from "react-router-dom";
import usePageViews from "./usePageViews";
import { useEffect } from "react";

export default function SideMenu(props) {
  const MenuBars = () => {
    if (!!props.active) {
      return <FaTimes className="menu-toggle-btn" />;
    } else {
      return <FaBars className="menu-toggle-btn" />;
    }
  };

  let location = useLocation();
  useEffect(() => {
    // console.log("location", location, "props", props);
    if (props.active) props.setSideMenuInactive();
  }, [location]);

  return (
    <OutsideAlerter clickOutsideMenu={props.clickOutsideMenu}>
      <div className={`side-menu ${props.active ? "active" : ""}`}>
        <div
          className="menu-toggle-btn-wrapper"
          onClick={props.onToggleMenuBtn}
        >
          <MenuBars />
        </div>
        <div className="menu-header">
          <div className="menu-logo">
            <img width="18px" src={msContactLogo} alt="HR CRM" />
            HR CRM
          </div>
        </div>
        <div className="menu-body">
          <div className="menu-user">
            <FaUserCircle className="menu-user-logo" />
            <div className="menu-user-name">Григорьев Д.В.</div>
            <div className="menu-user-role">Оператор</div>
          </div>
          <Link onClick={() => console.log("link operator")} to="/operator">
            <p>
              <FaHeadset className="menu-icon" /> <span>Оператор</span>
            </p>
          </Link>
          <Link to="/recruter">
            <p>
              <FaUsers className="menu-icon" /> <span>Рекрутер</span>
            </p>
          </Link>
          <Link to="/admin">
            <p>
              <FaUserShield className="menu-icon" /> <span>Администратор</span>
            </p>
          </Link>
          <Link to="/stat">
            <p>
              <FaChartPie className="menu-icon" /> <span>Статистка</span>
            </p>
          </Link>
          <Link to="/settings">
            <p>
              <FaCog className="menu-icon" /> <span>Настройки</span>
            </p>
          </Link>
          <Link to="/logout">
            <p>
              <FaSignOutAlt className="menu-icon" /> <span>Выйти</span>
            </p>
          </Link>
        </div>
      </div>
    </OutsideAlerter>
  );
}
