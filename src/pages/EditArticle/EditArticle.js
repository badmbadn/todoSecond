/* eslint-disable import/named */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router';

import { editeArticle, getArticle } from '../../store';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';
import { SIGNIN } from '../../constants/Constants';

const EditArticle = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { slug } = useParams();

  const token = useSelector((state) => state.authorization.token);
  useDispatch(getArticle(slug));
  const isLoading = useSelector((state) => state.authorization.loading);
  const isAuthorize = useSelector((state) => state.authorization.userName);
  const article = useSelector((state) => state.openedArticle.article);
  const error = useSelector((state) => state.openedArticle.error);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const articles = (
    <ArticleForm
      title={article?.title}
      description={article?.description}
      body={article?.body}
      tags={article?.tagList}
      componentTitle="Edit article"
      errorMessage="Failed to edit an article."
      onSubmit={async (input) => {
        const data = {};
        for (let field in input) {
          if (input[field]) data[field] = input[field];
        }
        dispatch(
          editeArticle({
            token,
            data,
            slug,
            cb: () => {
              navigate('/');
            },
          })
        );
      }}
    />
  );

  return !isAuthorize ? <Navigate to={SIGNIN} /> : articles;
};

export default EditArticle;
