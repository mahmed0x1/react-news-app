import {
  LOAD_NEWS,
  VIEW_NEWS,
  LOAD_NEWS_FAILD,
  CHANGE_PAGE,
  LOAD_ARTICLE,
  VIEW_ARTICLE,
  UNLOAD_ARTICLE
} from "./types";
import { headlinesURL, everythingURL } from "../api";

export const loadNews = query => dispatch => {
  dispatch({
    type: LOAD_NEWS
  });
  let endpoint;
  if (query.endpoint === "headlines") {
    endpoint = headlinesURL;
    endpoint = endpoint.replace("country=country", `country=${query.country}`);
  } else if (query.endpoint === "everything") {
    endpoint = everythingURL;
    endpoint = endpoint.replace("q=query", `q=${encodeURI(query.search)}`);
  } else {
    dispatch({
      type: LOAD_NEWS_FAILD
    });
    return;
  }
  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: VIEW_NEWS,
        payload: data.articles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        )
      });
    })
    .catch(err => {
      dispatch({
        type: LOAD_NEWS_FAILD,
        payload: err
      });
    });
};

export const changePage = page => dispatch => {
  dispatch({
    type: CHANGE_PAGE,
    payload: page
  });
};

export const loadArticle = index => dispatch => {
  dispatch({
    type: LOAD_ARTICLE
  });

  setTimeout(() => {
    dispatch({
      type: VIEW_ARTICLE,
      payload: index
    });
  }, 1500);
};

export const unloadArticle = () => dispatch => {
  dispatch({
    type: UNLOAD_ARTICLE
  });
};
