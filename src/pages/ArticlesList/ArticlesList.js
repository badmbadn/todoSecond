/* eslint-disable import/named */
import { useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import ArticleInfo from '../../components/ArticleInfo/ArticleInfo';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';
import { getArticlesList, setCurrentPage } from '../../store';

// import classes from './ArticlesList.module.scss';

const List = styled.ul`
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  & + .pagination {
    text-align: center;
  }
`;

const ListItem = styled.li`
  display: block;
  margin-bottom: 26px;
`;

const Article = styled.article`
  display: grid;
  grid-template-columns: 70% calc(30% - 58px) 58px;
  grid-row-gap: 4px;
  padding: 15px 15px 24px;
  border-radius: 5px;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
`;

function ArticlesList() {
  const dispatch = useDispatch();

  const totalPages = useSelector((state) => Math.ceil(state.articlesList.totalArticles));
  const currentPage = useSelector((state) => state.articlesList.currentPage);
  const userName = useSelector((state) => state.authorization.userName);
  const token = useSelector((state) => state.authorization.token);
  const articles = useSelector((state) => state.articlesList.articles);
  const error = useSelector((state) => state.articlesList.error);

  useEffect(() => {
    const data = {
      token,
      pageNumber: currentPage,
    };
    dispatch(getArticlesList(data));
  }, [userName, dispatch, currentPage]);

  if (!articles) return <Spinner />;

  if (error) return <ErrorMessage />;

  return (
    <>
      <List>
        {articles.map((article) => (
          <ListItem key={article.slug}>
            <Article>
              <ArticleInfo data={article} mod={'list'} />
            </Article>
          </ListItem>
        ))}
      </List>
      <Pagination
        current={currentPage}
        pageSize={5}
        onChange={(page) => dispatch(setCurrentPage(page))}
        showSizeChanger={false}
        total={totalPages}
        className="pagination"
      />
    </>
  );
}

export default ArticlesList;
