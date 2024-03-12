import React from "react";
import styles from "./navigation.module.scss"; 

function Navigation() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.largeNavbar}`}>
      <div className={`container-fluid ${styles.navContainer}`}>
        <div className={`${styles.leftContent}`}>
        <a className={`${styles.navbarBrand} text-white`} href="#">
        LearnHub.mk
        </a>
        <div className={`navbar-collapse`} id="navbarNav">
            <ul className={`navbar-nav ${styles.horizontalNav}`}>
              <li className={`nav-item ${styles.navLink}`}>
                <a className={`nav-link text-white`} href="#">
                  Визија
                </a>
              </li>
              <li className={`nav-item ${styles.navLink}`}>
                <a className={`nav-link text-white`} href="#">
                  Цели
                </a>
              </li>
              <li className={`nav-item ${styles.navLink}`}>
                <a className={`nav-link text-white`} href="#">
                  Контакт
                </a>
              </li>
              <li className={`nav-item ${styles.navLink}`}>
                <a className={`nav-link text-white`} href="#">
                  Блог
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`d-flex ${styles.rightContent}`}>
          <button className={`btn btn-outline-success me-4 ${styles.customButton1} btn-lg`} type="submit">
            Sign In
          </button>
          <button className={`btn btn-outline-primary ms-2 ${styles.customButton} btn-lg`} type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;