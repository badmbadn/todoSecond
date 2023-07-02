/* eslint-disable import/named */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router';

import ArticleForm from '../../components/ArticleForm/ArticleForm';
import Spinner from '../../components/Spinner/Spinner';
import { postArticle } from '../../store';
import { SIGNIN } from '../../constants/Constants';

const CreateArticle = () => {
  const dispatch = useDispatch();

  const history = useNavigate();

  const token = useSelector((state) => state.authorization.token);
  const isLoading = useSelector((state) => state.authorization.loading);
  const isAuthorize = useSelector((state) => state.authorization.userName);

  if (isLoading) return <Spinner />;
  if (!isAuthorize) return <Navigate to={SIGNIN} />;

  return (
    <ArticleForm
      componentTitle="Create new article"
      errorMessage="Failed to create an article."
      onSubmit={async (input) => {
        const data = {};
        for (let field in input) {
          if (input[field] && input[field].length !== 0) data[field] = input[field];
        }
        dispatch(
          postArticle({
            token,
            data,
            cb: () => {
              history('/');
            },
          })
        );
      }}
    />
  );
};

export default CreateArticle;
