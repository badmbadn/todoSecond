import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import apiService from '../../service/apiService';
import placeholder from '../../assets/images/author-dummy.png';
import likeActive from '../../assets/images/like-active.svg';
import likes from '../../assets/images/likes.svg';

const HeaderInfo = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  justify-self: left;
  display: flex;
  align-items: center;
`;

const TitleLink = styled(Link)`
  margin: 0 13px 0 0;
  margin-block: 0;
  padding: 0;
  font-size: 20px;
  font-weight: normal;
  line-height: 28px;
  color: #1890ff;
  text-decoration: none;
  overflow-wrap: anywhere;
  &_list {
    overflow: hidden;
    max-height: 28px;
  }
`;
const LikeButton = styled.button`
  margin: 0;
  padding: 0;
  padding-left: 21px;
  border: none;
  font-size: 12px;
  line-height: 22px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  gap: 5px;
  background: {
    color: rgba(255, 255, 255, 0);
    repeat: no-repeat;
    position: left;
  }
`;

const UserName = styled.section`
  grid-area: 1 / 2 / 2 / 3;
  justify-self: right;
  font-size: 18px;
  line-height: 28px;
  max-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  overflow: hidden;
  overflow-wrap: anywhere;
`;

const UserImg = styled.img`
  grid-area: 1 / 3 / 3 / 4;
  margin-left: 12px;
  height: 46px;
  width: 46px;
  border-radius: 50%;
`;

const List = styled.ul`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-wrap: wrap;
  margin-block: 0;
  padding: 0;
  & .tag {
    display: block;
    padding: 2px 5px 3px;
    margin-right: 8px;
    border: 1px solid;
    border-radius: 2px;
    font-size: 12px;
    line-height: 15px;
    &_list {
      color: rgba(0, 0, 0, 0.75);
      border-color: rgba(0, 0, 0, 0.75);
    }
    &_opened {
      color: rgba(0, 0, 0, 0.5);
      border-color: rgba(0, 0, 0, 0.5);
    }
  }
  list-style: none;
  &_list {
    overflow: hidden;
    height: 22px;
  }
`;

const ListItem = styled.li`
  display: block;
  padding: 2px 5px 3px;
  margin-right: 8px;
  border: 1px solid;
  border-radius: 2px;
  font-size: 12px;
  line-height: 15px;
  color: rgba(0, 0, 0, 0.75);
  border-color: rgba(0, 0, 0, 0.75);
`;

const SectionCreated = styled.section`
  grid-area: 2 / 2 / 3 / 3;
  justify-self: right;
  margin-top: -8px;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.5);
  white-space: nowrap;
`;

const SectionDescription = styled.section`
  grid-area: 3 / 1 / 4 / 2;
  justify-self: left;
  overflow-wrap: anywhere;
  max-height: 40px;
  overflow: hidden;
`;

function ArticleInfo({ data }) {
  const { slug, title, favoritesCount, favorited, author, tagList, createdAt, description } = data;
  const [_favoritesCount, setFavoritesCount] = useState(favoritesCount);
  const [_favorited, setFavorited] = useState(favorited);

  const userName = !!useSelector((state) => state.authorization.userName);
  const token = useSelector((state) => state.authorization.token);

  const tagListDisplay = tagList.map((tag, i) => <ListItem key={i}>{tag}</ListItem>);

  const createdAtPost = format(new Date(createdAt), 'MMMM d, yyyy');

  const like = async () => {
    try {
      const res = await apiService.favoriteArticle(slug, token, _favorited);
      if (res.ok) {
        setFavoritesCount(_favoritesCount + (_favorited ? -1 : 1));
        setFavorited(!_favorited);
      }
    } catch {
      return;
    }
  };

  return (
    <>
      <HeaderInfo>
        <TitleLink to={`/articles/${data.slug}`}>{title}</TitleLink>
        <LikeButton onClick={userName ? like : undefined}>
          <img src={!_favorited ? likes : likeActive} />
          <span>{_favoritesCount}</span>
        </LikeButton>
      </HeaderInfo>

      <UserName>{author.username}</UserName>

      <UserImg src={author.image || null} alt="author avatar" onError={(e) => (e.target.src = placeholder)} />

      <List>{tagListDisplay}</List>

      <SectionCreated>{createdAtPost}</SectionCreated>
      <SectionDescription>{description}</SectionDescription>
    </>
  );
}

export default ArticleInfo;
