import React, { Component } from "react";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";
import "./styles/NewsCard.css";

class ArticleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      default: null
    };
  }

  static propTypes = {
    src: PropTypes.string.isRequired
  };

  imageCallBack = e => {
    this.setState({ imageLoaded: true });
  };

  imageCallBackError = () => {
    this.setState({
      imageLoaded: true,
      default: "https://reactjs.org/logo-og.png"
    });
  };

  render() {
    return (
      <div className="image">
        {!this.state.imageLoaded ? (
          <Spinner className="spinner" color="light" />
        ) : null}
        <img
          className="image"
          onLoad={this.imageCallBack}
          onError={this.imageCallBackError}
          alt="Article"
          src={this.state.default ? this.state.default : this.props.src}
        />
      </div>
    );
  }
}

export default ArticleImage;
