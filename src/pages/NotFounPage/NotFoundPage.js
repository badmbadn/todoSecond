import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Article = styled.article`
  cursor: default;
  margin: 26px auto;
  text-align: center;
  max-width: 941px;
  padding: 20px;
  font-size: 18px;
  background: #ffffff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15));
  box-sizing: border-box;
`;

const NotFoundPage = () => {
  return (
    <Article>
      Page not found. Go back to <Link to="/">main page</Link>
    </Article>
  );
};

export default NotFoundPage;
