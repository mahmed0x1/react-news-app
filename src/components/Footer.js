import React, { Component } from "react";

import "./styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <ul className="contact">
          <li>
            <a href="https://github.com/mahmed0x1">
            <i className="fa-brands fa-github-alt"></i>
            </a>
          </li>
        </ul>
        <p className="copyrights">
        &copy;
          Mohammed Ahmed &amp;{" "}
          <a
            href="https://newsapi.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            News API
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
