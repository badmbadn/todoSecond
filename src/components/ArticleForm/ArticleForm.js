import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';

import { clearArticleError } from '../../store';

// import classes from './ArticleForm.module.scss';

const FormArticle = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  padding: 48px 32px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0px 22px 106px rgba(0, 0, 0, 0.07), 0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198),
    0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035),
    0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802);
  background-color: #fff;
  color: #262626;
`;

const TitleArticle = styled.h2`
  margin-block-start: 0;
  margin-block-end: 21px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 22px;
`;

const Input = styled.input`
  padding: 8px 12px;
  margin-bottom: 21px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  line-height: 24px;
  resize: none;
  &::hover {
    background-color: #1890ff;
  }
  &::placeholder {
    color: #bfbfbf;
  }
  ${(props) => props.requiredField && 'border-color: #f5222d'};
`;

const InputSubmit = styled.input.attrs({ type: 'submit' })`
  padding: 8px 12px;
  margin-bottom: 21px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  line-height: 24px;
  resize: none;
  &::placeholder {
    color: #bfbfbf;
  }
  &[type='submit'] {
    max-width: 320px;
    margin: 0;
    background-color: #1890ff;
    color: #fff;
    cursor: pointer;
    &:disabled {
      background-color: rgba(24, 144, 255, 0.6);
      cursor: not-allowed;
    }
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  margin-bottom: 21px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  line-height: 24px;
  resize: none;
  &::placeholder {
    color: #bfbfbf;
  }
  ${(props) => props.requiredField && 'border-color: #f5222d'};
`;

const List = styled.ul`
  margin: 0;
  margin-block: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  margin: 0;
  margin-block: 0;
`;

const ButtonDelete = styled.button`
  margin-left: 18px;
  background-color: #fff;
  border: 1px solid;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  font-family: inherit;
  padding: 7px 36px;
  color: #f5222d;
  border-color: #f5222d;
`;

const ButtonAdd = styled.button`
  margin-left: 18px;
  background-color: #fff;
  border: 1px solid;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  font-family: inherit;
  padding: 7px 40px;
  color: #1890ff;
  border-color: #1890ff;
`;

const Section = styled.section`
  color: #f5222d;
  text-align: left;
  font-size: 14px;
  line-height: 22px;
`;

const ArticleForm = ({ componentTitle, errorMessage, onSubmit, title, description, body, tags = [] }) => {
  const newTagField = useRef(null);

  useEffect(() => {
    dispatch(clearArticleError());
  }, []);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.openedArticle.error);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { title, description, body, tagList: [...tags] },
  });

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'tagList',
  });

  return (
    <FormArticle onSubmit={handleSubmit(onSubmit)}>
      <TitleArticle>{componentTitle}</TitleArticle>

      <Label>Title</Label>
      <Input
        placeholder={errors?.title ? 'Requied' : 'Important Article Title'}
        {...register('title', {
          required: true,
        })}
        requiredField={errors?.title}
      ></Input>

      <Label>Short description</Label>
      <Input
        placeholder={errors?.description ? 'Requied' : 'Some short description that displays in atricles list'}
        {...register('description', {
          required: true,
        })}
        requiredField={errors?.description}
      ></Input>

      <Label>Text</Label>
      <TextArea
        rows={6}
        placeholder={errors?.body ? 'Requied' : 'Text (Use markdown)'}
        {...register('body', {
          required: true,
        })}
        requiredField={errors?.body}
      ></TextArea>

      <Label>Tags</Label>
      <List>
        {fields.map((tag, index) => {
          return (
            <Item key={tag.id}>
              <Input
                placeholder={errors?.tagList ? 'Requied' : 'Tag'}
                {...register(`tagList[${index}]`, {
                  required: true,
                })}
                requiredField={errors?.tagList && index === fields.length - 1}
              />
              <ButtonDelete type="button" onClick={() => remove(index)}>
                Delete
              </ButtonDelete>
              {index < fields.length - 1 ? null : (
                <ButtonAdd type="button" onClick={() => append('')}>
                  Add tag
                </ButtonAdd>
              )}
            </Item>
          );
        })}
        {fields.length === 0 && (
          <Item>
            <Input placeholder="Tag" ref={newTagField} />
            <ButtonAdd
              type="button"
              onClick={() => {
                if (newTagField.current.value) append(newTagField.current.value);
                else newTagField.current.focus();
              }}
            >
              Add tag
            </ButtonAdd>
          </Item>
        )}
      </List>

      <InputSubmit disabled={!isValid}></InputSubmit>
      {error && <Section>{errorMessage}</Section>}
    </FormArticle>
  );
};

export default ArticleForm;
