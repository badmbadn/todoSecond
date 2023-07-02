/* eslint-disable import/named */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Wrapper from '../Wrapper/Wrapper';
import MainPage from '../../pages/MainPage/MainPage';
import Article from '../../pages/Article/Article';
import ArticlesList from '../../pages/ArticlesList/ArticlesList';
import CreateArticle from '../../pages/CreateArticle/CreateArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';
import EditProfile from '../../pages/EditProfile/EditProfile';
import NotFoundPage from '../../pages/NotFounPage/NotFoundPage';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import { getUserData } from '../../store/authorization';
import { LIST, ARTICLE, EDIT, CREATE, PROFILE, SIGNIN, SIGNUP } from '../../constants/Constants';

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authorization.token);

  useEffect(() => {
    dispatch(getUserData(token));
  }, []);

  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<ArticlesList />}></Route>

            <Route path={CREATE} element={<CreateArticle />} />

            <Route path={EDIT} element={<EditArticle />} />

            <Route path={ARTICLE} element={<Article />} />

            <Route path={LIST} element={<ArticlesList />} />

            <Route path={SIGNUP} element={<SignUp />} />

            <Route path={SIGNIN} element={<SignIn />} />

            <Route path={PROFILE} element={<EditProfile />} />

            <Route to="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
