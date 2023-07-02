/* eslint-disable react/no-children-prop */
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import ArticleButtons from '../../components/ArticleButtons/ArticleButtons';
import ArticleInfo from '../../components/ArticleInfo/ArticleInfo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';
import { getArticle } from '../../store';

const ArticleBody = styled.article`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 24px;
  border-radius: 5px;
  min-height: calc(100vh - 200px);
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 70% calc(30% - 58px) 58px;
  grid-row-gap: 4px;
`;

const MarkDown = styled.div`
  margin: 0;
  &:first-child {
    margin-block-start: 0;
    margin-top: 20px;
  }
  & * {
    color: rgba(0, 0, 0, 0.75);
    word-break: break-all;
  }
  & img {
    width: 100%;
  }
`;

function Article() {
  const dispatch = useDispatch();

  const article = useSelector((state) => state.openedArticle.article);
  const error = useSelector((state) => state.openedArticle.error);
  const userName = useSelector((state) => state.authorization.userName);
  const token = useSelector((state) => state.authorization.token);

  const isAllowInteract = article?.author.username === userName;

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getArticle({ slug, token: userName ? token : null }));
  }, [userName]);

  if (!article) return <Spinner />;

  if (error) return <ErrorMessage />;

  return (
    <ArticleBody>
      <Info>
        <ArticleInfo data={article} mod={'opened'} />
        {isAllowInteract && <ArticleButtons />}
      </Info>
      <MarkDown>
        <ReactMarkdown children={article?.body} remarkPlugins={[remarkGfm]} />
      </MarkDown>
    </ArticleBody>
  );
}

export default Article;
