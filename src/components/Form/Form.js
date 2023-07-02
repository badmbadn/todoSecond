/* eslint-disable no-useless-escape */
import { useController } from 'react-hook-form';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 14px;
  line-height: 22px;
`;

const InputField = styled.input`
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  line-height: 22px;
  &::placeholder {
    color: #8c8c8c;
  }
  &.invalid {
    border-color: #f5222d;
  }
  &[type='submit'] {
    background-color: #1890ff;
    color: #fff;
    cursor: pointer;
    &:disabled {
      background-color: rgba(#1890ff, 0.6);
      cursor: not-allowed;
    }
  }
  ${(props) =>
    props.bord &&
    `
      border-color: #f5222d;
    `}
`;

const Section = styled.section`
  margin-top: -12px;
  margin-bottom: 12px;
  color: #f5222d;
  text-align: left;
  font-size: 14px;
  line-height: 22px;
`;

const LabelCheckBox = styled.label`
  display: flex;
  align-items: flex-start;
  margin-top: 9px;
  margin-bottom: 21px;
  padding-top: 8px;
  border-top: 1px solid #e8e8e8;
  color: #595959;
  & input {
    margin: 0;
    margin-right: 8px;
    margin-top: 4px;
  }
`;

const InputCheckBox = styled.input`
  margin: 0;
  margin-right: 8px;
  margin-top: 4px;
`;

const FormFields = styled.form`
  display: flex;
  flex-direction: column;
  align-self: center;
  padding: 48px 32px;
  margin-top: 20px;
  width: 340px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0px 22px 106px rgba(0, 0, 0, 0.07), 0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198),
    0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035),
    0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802);
  background-color: #fff;
  color: #262626;
`;

const Footer = styled.footer`
  margin-top: -4px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #8c8c8c;
  & a {
    color: #1890ff;
    text-decoration: none;
  }
`;

const SubTitle = styled.h2`
  margin-block-start: 0;
  margin-block-end: 21px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
`;

function Input({ label, placeholder, fieldProps, error, warrning }) {
  return (
    <>
      <Label>{label}</Label>
      <InputField placeholder={placeholder} {...fieldProps} bord={error} />
      <Section>{warrning}</Section>
    </>
  );
}

function Username({ control, serverError, onChange, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'username',
    rules: {
      onChange,
      required,
      minLength: 3,
      maxLength: 20,
    },
  });

  const warrning =
    (fieldState.invalid && 'Your name needs to be at least 3 and not longer then 20 characters.') ||
    (serverError && 'This name is already taken.');

  return (
    <Input
      label="Username"
      placeholder="Username"
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  );
}

function Email({ control, serverError, onChange, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'email',
    rules: { onChange, required, pattern: /\S+@\S+\.\S+/ },
  });

  const warrning =
    (fieldState.invalid && 'Entered value does not match email format.') ||
    (serverError && 'This email is already taken.');

  return (
    <Input
      label="Email address"
      placeholder="Email address"
      fieldProps={field}
      error={fieldState.invalid || serverError}
      warrning={warrning}
    />
  );
}

function Password({
  control,
  warrning,
  required = true,
  label = 'Password',
  rules = {
    required,
    minLength: 6,
    maxLength: 40,
  },
}) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    rules,
    name: 'password',
  });

  return (
    <Input
      label={label}
      placeholder={label}
      fieldProps={{ ...field, type: 'password' }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && warrning}
    />
  );
}

function AvatarUrl({ control, required = true }) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name: 'image',
    rules: {
      required,
      pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    },
  });
  return (
    <Input
      label="Avatar image"
      placeholder="Avatar image"
      fieldProps={{ ...field }}
      error={fieldState.invalid}
      warrning={fieldState.invalid && 'Entered value does not match url format.'}
    />
  );
}

function Checkbox({ control, required = true }) {
  const { field } = useController({
    control,
    defaultValue: '',
    name: 'checkbox',
    rules: { required },
  });

  return (
    <LabelCheckBox>
      <InputCheckBox type="checkbox" {...field} />I agree to the processing of my personal information
    </LabelCheckBox>
  );
}

function Submit({ control, value, error }) {
  const { formState } = useController({
    control,
    defaultValue: '',
    name: 'submit',
  });
  return (
    <>
      <InputField type="submit" value={value} disabled={!formState.isValid} />
      {error && <Section>Email or password is invalid.</Section>}
    </>
  );
}
function Form({ title, children, footer, onSubmit }) {
  return (
    <FormFields onSubmit={onSubmit}>
      <SubTitle>{title}</SubTitle>
      {children}
      <Footer>{footer}</Footer>
    </FormFields>
  );
}

export default Form;

export { Checkbox, Email, Input, AvatarUrl, Password, Submit, Username };
