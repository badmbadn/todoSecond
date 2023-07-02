import { configureStore } from '@reduxjs/toolkit';

import articlesListSlice, { getArticlesList } from './articlesList';
import openedArticleSlice, { getArticle, postArticle, deleteArticle, editeArticle } from './openedArticle';
import authorizationSlice, { signUp, signIn, getUserData, updateUserData } from './authorization';

export default configureStore({
  reducer: {
    articlesList: articlesListSlice.reducer,
    openedArticle: openedArticleSlice.reducer,
    authorization: authorizationSlice.reducer,
  },
});

const { setCurrentPage } = articlesListSlice.actions;
const { clearArticleError } = openedArticleSlice.actions;
const { logOut, clearAuthorizationErrors } = authorizationSlice.actions;
export {
  setCurrentPage,
  getArticlesList,
  getArticle,
  postArticle,
  deleteArticle,
  editeArticle,
  clearArticleError,
  signUp,
  signIn,
  logOut,
  getUserData,
  updateUserData,
  clearAuthorizationErrors,
};
