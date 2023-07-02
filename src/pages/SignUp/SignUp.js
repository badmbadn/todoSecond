/* eslint-disable react/jsx-key */
import { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Spinner from '../../components/Spinner/Spinner';
import Form, { Checkbox, Email, Input, Password, Submit, Username } from '../../components/Form/Form';
import { clearAuthorizationErrors, signUp } from '../../store';
import { SIGNIN } from '../../constants/Constants';

function SignUp() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(clearAuthorizationErrors());
  }, []);

  const serverErrors = useSelector((state) => state.authorization.errors);
  const isLoading = useSelector((state) => state.authorization.loading);
  const userName = useSelector((state) => state.authorization.userName);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setNameError(!!serverErrors?.username);
    setEmailError(!!serverErrors?.email);
  }, [serverErrors]);

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({ mode: 'onBlur' });

  if (isLoading) return <Spinner />;
  if (userName) return <Navigate to="/" />;

  const onSubmit = ({ username, email, password }) => {
    dispatch(signUp({ username, email, password }));
  };

  return (
    <Form
      title="Create new account"
      footer={['Already have an account? ', <Link to={SIGNIN}>Sign In.</Link>]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Username control={control} serverError={nameError} onChange={() => setNameError(false)} />

      <Email control={control} serverError={emailError} onChange={() => setEmailError(false)} />

      <Password
        control={control}
        warrning="
          Password needs to be at least 6 and not longer then 40
          characters."
      />

      <Input
        label="Repeat Password"
        placeholder="Password"
        error={formErrors?.repeatPassword}
        warrning={formErrors?.repeatPassword && 'Your passwords do no match.'}
        fieldProps={{
          ...register('repeatPassword', {
            required: true,
            validate: (value) => value === watch('password'),
          }),
          type: 'password',
        }}
      />

      <Checkbox control={control} />

      <Submit control={control} value="Create" />
    </Form>
  );
}

export default SignUp;
