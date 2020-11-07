import React from "react";
import { Link } from "gatsby";
import "../styles/partials/_navigation.scss";

interface Props {
  showButton: boolean;
}

const Navigation: React.FC<Props> = props => {
  const { showButton } = props;

  return (
    <nav role="navigation" aria-label="Main" className="nav">
      <div className="container">
        <div className="menu__wrapper">
          <a href="/" className="logo">
            <picture>
              <source srcSet="/media/img/logos/logo--craft2care-horizontal.png" media="(min-width: 576px)" />
              <img src="/media/img/logos/logo--craft2care.svg" alt="TribeSafe" />
            </picture>
          </a>
          {/* <div className="menu">
            <button id="toggle" aria-label="Toggle dark mode">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
