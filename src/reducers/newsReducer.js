import {
  LOAD_NEWS,
  VIEW_NEWS,
  LOAD_NEWS_FAILD,
  CHANGE_PAGE,
  LOAD_ARTICLE,
  VIEW_ARTICLE,
  UNLOAD_ARTICLE
} from "../actions/types";

const initialState = {
  articles: [],
  isLoading: false,
  error: null,
  pages: 0,
  activePage: 0,
  loadingArticle: false,
  article: null
};

export default function newsRedcuer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NEWS:
      document.title = "NewsApp";
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case VIEW_NEWS:
      document.title = `(${action.payload.length.toString()}) NewsApp`;
      const articles = action.payload.map((article, index) => ({
        ...article,
        index: index + 1
      }));
      return {
        ...state,
        articles,
        isLoading: false,
        pages: Math.ceil(action.payload.length / 12),
        activePage: 1
      };
    case LOAD_NEWS_FAILD:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CHANGE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };
    case LOAD_ARTICLE:
      return {
        ...state,
        loadingArticle: true
      };
    case VIEW_ARTICLE:
      return {
        ...state,
        article: state.articles[action.payload - 1],
        loadingArticle: false
      };
    case UNLOAD_ARTICLE:
      return {
        ...state,
        article: null
      };
    default:
      return state;
  }
}
