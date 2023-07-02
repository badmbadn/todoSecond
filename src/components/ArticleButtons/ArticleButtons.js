import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteArticle } from '../../store';

const Buttons = styled.div`
  grid-area: 3 / 2 / 4 / 4;
  justify-self: right;
  position: relative;
  & button {
    margin-left: 12px;
    border: 1px solid;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    font: {
      family: inherit;
      size: 14px;
    }
    line-height: 20px;
    padding: 5px 10px;
    &:hover {
      color: #fff;
    }
  }
`;

const ButtonDelete = styled.button`
  color: #52c41a;
  &:before {
    content: 'Delete';
    line-height: 20px;
  }
  color: #f5222d;
  border-color: #f5222d;
  &:hover {
    background-color: #f5222d;
  }
`;

const ButtonDeleteTag = styled.button`
  color: #595959;
  border-radius: 4px;
  border: 1px solid #595959;
`;

const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 82px;
  padding: 12px 16px 12px 40px;
  width: 184px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
  border-radius: 4px;
  background: {
    color: #fff;
    image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM6.5 3.625C6.5 3.55625 6.55625 3.5 6.625 3.5H7.375C7.44375 3.5 7.5 3.55625 7.5 3.625V7.875C7.5 7.94375 7.44375 8 7.375 8H6.625C6.55625 8 6.5 7.94375 6.5 7.875V3.625ZM7 10.5C6.80374 10.496 6.61687 10.4152 6.47948 10.275C6.3421 10.1348 6.26515 9.9463 6.26515 9.75C6.26515 9.5537 6.3421 9.36522 6.47948 9.225C6.61687 9.08478 6.80374 9.00401 7 9C7.19626 9.00401 7.38313 9.08478 7.52052 9.225C7.6579 9.36522 7.73485 9.5537 7.73485 9.75C7.73485 9.9463 7.6579 10.1348 7.52052 10.275C7.38313 10.4152 7.19626 10.496 7 10.5Z' fill='%23FAAD14'/%3E%3C/svg%3E%0A");
    repeat: no-repeat;
    position: top 16px left 17px;
  }
  z-index: 1;
  background: #fff;
  & button {
    margin-left: 8px;
    padding: 1px 8px;
    color: #595959;
    border: {
      radius: 4px;
      color: #d9d9d9;
    }
    &:hover {
      background: #1890ff;
      color: #fff;
    }
  }
  &::before {
    display: block;
    position: absolute;
    height: 12px;
    width: 12px;
    left: -5px;
    content: '';
    background-color: #fff;
    clip-path: polygon(50% 0, 50% 100%, 0 50%);
    z-index: 2;
  }
  & div {
    text-align: right;
    margin-top: 12px;
  }
`;

const ButtonInner = styled.div``;

const ButtonEditTag = styled.button`
  color: #52c41a;
  border-color: #52c41a;
  &:hover {
    background-color: #52c41a;
  }
`;

const ArticleButtons = () => {
  const dispatch = useDispatch();

  const [popupOpened, setPopupOpened] = useState(false);

  const token = useSelector((state) => state.authorization.token);
  const slug = useSelector((state) => state.openedArticle.article.slug);

  const navigate = useNavigate();

  useEffect(() => {
    const closePopup = (e) => {
      if (e.target.nodeName !== 'BUTTON' && e.target.className !== 'Popup') setPopupOpened(false);
    };
    window.addEventListener('click', closePopup);
    return () => window.removeEventListener('click', closePopup);
  });

  return (
    <Buttons>
      <ButtonDelete onClick={() => setPopupOpened(!popupOpened)} />

      {popupOpened && (
        <Popup>
          Are you sure to delete this article?
          <ButtonInner>
            <ButtonDeleteTag onClick={() => setPopupOpened(false)}>No</ButtonDeleteTag>
            <ButtonDeleteTag
              onClick={() => {
                dispatch(
                  deleteArticle({
                    token,
                    slug,
                    data: null,
                    cb: () => {
                      navigate('/');
                    },
                  })
                );
              }}
            >
              Yes
            </ButtonDeleteTag>
          </ButtonInner>
        </Popup>
      )}

      <ButtonEditTag onClick={() => navigate(`/articles/${slug}/edit/`)}>Edit</ButtonEditTag>
    </Buttons>
  );
};

export default ArticleButtons;
