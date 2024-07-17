import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo_opt_gray.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { MantineProvider } from "@mantine/core";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck";
import outSideClickHandlers from "react-outside-click-handler";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [sticky, setSticky] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);
  return (
    <nav className={`nav ${sticky ? "dark-nav" : ""}`}>
      <div className=" paddings innerWidth h-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="nav-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Proporties</NavLink>

            <a href="mailto:himansu.sahu11@gmail.com">Contact</a>

            {/* add property  */}
            <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <MantineProvider>
                <ProfileMenu user={user} logout={logout} />
              </MantineProvider>
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
