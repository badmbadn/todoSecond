/* eslint-disable react/jsx-key */
import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Form, { Email, Password, Submit } from '../../components/Form/Form';
import Spinner from '../../components/Spinner/Spinner';
import { signIn, clearAuthorizationErrors } from '../../store';
import { SIGNUP } from '../../constants/Constants';

function SignIn() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(clearAuthorizationErrors());
  }, []);

  const { handleSubmit, control } = useForm({ mode: 'onBlur' });

  const error = useSelector((state) => state.authorization.errors);
  const isLoading = useSelector((state) => state.authorization.loading);
  const userName = useSelector((state) => state.authorization.userName);

  if (isLoading) return <Spinner />;
  if (userName) return <Navigate to="/" />;

  const onSubmit = ({ email, password }) => {
    dispatch(signIn({ email, password }));
  };

  return (
    <Form
      title="Sign in"
      footer={['Don’t have an account? ', <Link to={SIGNUP}>Sign Up.</Link>]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Email control={control} />

      <Password control={control} warrning="Password required." rules={{ required: true }} />

      <Submit control={control} value="Login" error={error} />
    </Form>
  );
}

export default SignIn;
