import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Spinner, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";

import "./styles/Article.css";

function LoadingIndicator() {
  return (
    <div className="article-loader">
      <Spinner
        style={{ width: "3rem", height: "3rem", margin: "0.5rem" }}
        type="grow"
      />
      <p>Loading Article...</p>
    </div>
  );
}

function ArticleBody(props) {
  return (
    <div>
      <div className="article-header" >
        
        <div className="description" style={{backgroundImage: `url("${props.article.urlToImage}")`, backgroundSize: "cover", backgroundPosition: "center"}}>
          <FontAwesomeIcon
            color="#fff"
            size="2x"
            style={{ float: "right" }}
            icon={faQuoteRight}
          />
          <p>{props.article.description || "Description Placeholder"}</p>
          <FontAwesomeIcon
            color="#fff"
            size="2x"
            style={{ float: "left" }}
            icon={faQuoteLeft}
          />
        </div>
      </div>
      <div>
        <p className="content">{props.article.content}</p>
      </div>
      <Button
        style={{ float: "right" }}
        href={props.article.url}
        target="_blank"
        outline
        color="primary"
      >
        Read Full Article at {props.article.source.name}
        
      </Button>
    </div>
  );
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    loadingArticle: PropTypes.bool.isRequired,
    article: PropTypes.any
  };

  render() {
    return (
      <div className="article-body">
        {this.props.articles.length < 1 ? <Redirect to="/" /> : null}
        {this.props.article ? (
          <ArticleBody article={this.props.article} />
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingArticle: state.news.loadingArticle,
    article: state.news.article,
    articles: state.news.articles
  };
};

export default connect(mapStateToProps, {})(withRouter(Article));
