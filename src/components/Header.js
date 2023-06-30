import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unloadArticle } from "../actions/newsActions";
import { changeRoute } from "../actions/routeActions";

import "./styles/Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    article: PropTypes.object,
    unloadArticle: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  unloadArticle = () => {
    this.props.unloadArticle();
  };

  changeRoute(route) {
    this.unloadArticle();
    this.props.changeRoute(route);
  }

  render() {
    return (
      <div className="header-container">
        <div className="header" style={{display: this.props.article ? "flex" : "block"}}>
          {this.props.article ? (
            <Link to="/" className="back-button" onClick={this.unloadArticle}>
            <i className="fa-solid fa-chevron-left"></i>
            </Link>
          ) : null}
          <h1 className={"header-name" + (this.props.article ? " scroll" : "")}>
            {this.props.article ? this.props.article.title : "NewsApp"}
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.news.article,
    route: state.router.route
  };
};

export default connect(mapStateToProps, { unloadArticle, changeRoute })(Header);
