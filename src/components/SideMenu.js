import {
  FaBars,
  FaChartPie,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
  FaUsers,
  FaUserShield
} from "react-icons/fa";
//import { reducer } from "../store/reducer";
import OutsideAlerter from "./OutsideAlerter";
import msContactLogo from "../static/img/favicon.png";
import { Link, useLocation } from "react-router-dom";

import { useEffect,useContext } from "react";
import { ContextApp } from '../store/ContextApp';
import {homepage} from "./homepage";

export default function SideMenu(props) {

  const {state,dispatch} = useContext(ContextApp);

  const MenuBars = () => {
    if (!!state.sideMenu.active) {
      return <FaTimes className="menu-toggle-btn" />;
    } else {
      return <FaBars className="menu-toggle-btn" />;
    }
  };

  let location = useLocation();
  useEffect(() => {

    if (state.sideMenu.active) dispatch({ type: "SET_SIDE_MENU_INACTIVE" });
  }, [location]);

  return (
    <OutsideAlerter >
      <div className={`side-menu ${state.sideMenu.active ? "active" : ""}`}>
        <div
          className="menu-toggle-btn-wrapper"
          onClick={ () => dispatch({ type: "TOGGLE_SIDE_MENU" }) }
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
            <div className="menu-user-name">{state.login}</div>
            <div className="menu-user-role">{state.role}</div>
          </div>
          <Link to={`${homepage}/operator`}>
            <p>
              <FaHeadset className="menu-icon" /> <span>Оператор</span>
            </p>
          </Link>
          <Link to={`${homepage}/recruter`}>
            <p>
              <FaUsers className="menu-icon" /> <span>Рекрутер</span>
            </p>
          </Link>
          <Link to={`${homepage}/admin`}>
            <p>
              <FaUserShield className="menu-icon" /> <span>Администратор</span>
            </p>
          </Link>
          <Link to={`${homepage}/stat`}>
            <p>
              <FaChartPie className="menu-icon" /> <span>Статистка</span>
            </p>
          </Link>
          <Link to={`${homepage}/settings`}>
            <p>
              <FaCog className="menu-icon" /> <span>Настройки</span>
            </p>
          </Link>
          <Link to={`${homepage}/logout`}>
            <p onClick={ ()=>dispatch({type:"LOGOUT"})}>
              <FaSignOutAlt className="menu-icon"/>
              <span>Выйти</span>
            </p>
          </Link>
        </div>
      </div>
    </OutsideAlerter>
  );
}
