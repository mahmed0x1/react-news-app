import React, { Component } from "react";
import { connect } from "react-redux";

import { changePage } from "../actions/newsActions";

class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null
    };
  }

  changePage(page) {
    this.scrollToTop();
    this.props.changePage(page);
  }

  switchPage(active, direction) {
    if (!active) return;
    this.changePage(
      direction === "next"
        ? this.props.activePage + 1
        : this.props.activePage - 1
    );
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 5);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), 1);
    this.setState({ intervalId: intervalId });
  }

  pagination() {
    let template = [];
    for (let i = 1; i <= this.props.pages; i++) {
      if (i === this.props.activePage)
        template.push(
          <li className="page-item active" key={i}>
            <span
              className="page-link"
              onClick={this.changePage.bind(this, i)}
              href="#"
            >
              {i}
            </span>
          </li>
        );
      else
        template.push(
          <li className="page-item" key={i}>
            <span
              className="page-link"
              onClick={this.changePage.bind(this, i)}
              href="#"
            >
              {i}
            </span>
          </li>
        );
    }
    return template;
  }

  render() {
    const previousActive = this.props.activePage === 1 ? false : true;
    const nextActive =
      this.props.activePage === this.props.pages ? false : true;
    return (
      <div className="articles-pagination">
        <ul className="pagination justify-content-center">
          <li className={previousActive ? "page-item" : "page-item disabled"}>
            <span
              className="page-link"
              onClick={this.switchPage.bind(this, previousActive, "previous")}
              tabIndex="-1"
            >
              Previous
            </span>
          </li>
          {this.pagination()}
          <li className={nextActive ? "page-item" : "page-item disabled"}>
            <span
              className="page-link"
              onClick={this.switchPage.bind(this, nextActive, "next")}
            >
              Next
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.news.pages,
    activePage: state.news.activePage
  };
};

export default connect(mapStateToProps, { changePage })(Paginator);
