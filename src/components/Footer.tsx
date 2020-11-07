import React from "react";
import { Link, withPrefix } from "gatsby";
import "../styles/partials/_footer.scss";
import Option from "./Option";
import Select from "./Select";
import Checkbox from "./Checkbox";

interface Props {
  showForm: boolean;
}

const Footer: React.FC<Props> = props => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__flex">
            <div className="footer__left">
              <img loading="lazy" src="/media/img/logos/logo--tribe-horizontal.svg" alt="TribeSafe" />
              <small>© 2020 TribeTrace. All rights reserved.</small>
            </div>
            <div className="footer__center">
              <p>
                <strong>Our Address:</strong>
                <br />
                7700 Windrose
                <br />
                Plano TX 75024
              </p>
              <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:tracey@tribehealthsolutions.com">tracey@tribehealthsolutions.com</a>
              </p>
            </div>
            <div className="footer__right">
              <a href="/">
                <img src="/media/img/icons/icon--linkedin.svg" alt="Linkedin" />
              </a>
              <a href="/">
                <img src="/media/img/icons/icon--twitter.svg" alt="Twitter" />
              </a>
              <a href="/">
                <img src="/media/img/icons/icon--facebook.svg" alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
