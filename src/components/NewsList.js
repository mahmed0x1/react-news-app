import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Spinner,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUndo,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import { loadNews } from "../actions/newsActions";
import NewsCard from "./NewsCard";
import Paginator from "./Paginator";

function NewsLoadError(props) {
  return (
    <div className="news-loader">
      <FontAwesomeIcon
        icon={faExclamationCircle}
        size="2x"
        style={{ margin: "5px" }}
      />
      <p>Load failed... Please, check your internet connection</p>
      <button className="btn btn-secondary" onClick={props.reload}>
        <FontAwesomeIcon
          icon={faUndo}
          size="1x"
          style={{ marginRight: "5px" }}
        />
        Reload
      </button>
    </div>
  );
}

function SearchHelper(props) {
  return (
    <div className="news-loader">
      <FontAwesomeIcon icon={faSearch} size="3x" style={{ margin: "10px" }} />
      <p>Please, enter a vaild search in the search box.</p>
    </div>
  );
}

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "headlines",
      dropdownOpen: false,
      country: "USA",
      page: 1,
      search: ""
    };
  }

  static propTypes = {
    loadNews: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.loadNews();
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  selectCountry(country) {
    this.setState({ country }, () => {
      this.loadNews();
    });
  }

  changeEndpoint(endpoint) {
    this.setState({ endpoint }, () => {
      this.loadNews();
    });
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.search.length >= 3) this.loadNews();
    });
  };

  loadNews = () => {
    const query = {
      endpoint: this.state.endpoint,
      search: this.state.search,
      country: this.state.country === "USA" ? "us" : "kr"
    };
    if (this.state.endpoint === "everything" && this.state.search.length < 3)
      return;
    this.props.loadNews(query);
  };

  render() {
    return (
      <div className="news-container">
        <div className="news-header">
          {this.state.endpoint === "headlines" ? (
            <div className="news-type">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle color="secondary" caret>
                  Country: {this.state.country}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.selectCountry.bind(this, "USA")}>
                    USA
                  </DropdownItem>
                  <DropdownItem
                    onClick={this.selectCountry.bind(this, "Korea")}
                  >
                    Korea
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : null}
          <div
            className={
              "news-type" +
              (this.state.endpoint === "headlines" ? " active" : "")
            }
            onClick={this.changeEndpoint.bind(this, "headlines")}
          >
            Top Headlines
          </div>
          <div
            className={
              "news-type" +
              (this.state.endpoint === "everything" ? " active" : "")
            }
            onClick={this.changeEndpoint.bind(this, "everything")}
          >
            Everything
          </div>
        </div>
        {this.state.endpoint === "everything" ? (
          <div className="news-input">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="1x"
                    style={{ padding: "2px" }}
                  />
                </div>
              </div>
              <input
                type="search"
                name="search"
                className="form-control news-input"
                value={this.state.search}
                onChange={this.handleInput}
                placeholder="Search Article..."
              />
            </div>
          </div>
        ) : null}
        {this.state.endpoint === "everything" &&
        this.state.search.length < 3 ? (
          <SearchHelper />
        ) : this.props.isLoading ? (
          <div className="news-loader">
            <Spinner
              style={{ width: "3rem", height: "3rem", margin: "0.5rem" }}
              type="grow"
            />
            <p>Fetching News...</p>
          </div>
        ) : this.props.error ? (
          <NewsLoadError reload={this.loadNews} />
        ) : (
          <>
          <div className="news-list">
            {this.props.articles
              .slice(
                (this.props.activePage - 1) * 12,
                this.props.activePage * 12
              )
              .map(article => (
                <NewsCard article={article} key={uuidv4()} />
              ))}
          </div>
                      <Paginator />
                      </>
          
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.news.articles,
    isLoading: state.news.isLoading,
    error: state.news.error,
    activePage: state.news.activePage
  };
};

export default connect(mapStateToProps, { loadNews })(NewsList);
