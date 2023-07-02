/* eslint-disable import/named */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { updateUserData } from '../../store';
import { SIGNIN } from '../../constants/Constants';
import Form, { Email, AvatarUrl, Password, Submit, Username } from '../../components/Form/Form';

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.authorization.token);
  const userName = useSelector((state) => state.authorization.userName);
  const serverErrors = useSelector((state) => state.authorization.errors);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setNameError(!!serverErrors?.username);
    setEmailError(!!serverErrors?.email);
  }, [serverErrors]);

  const { handleSubmit, reset, control } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const user = {};
    for (let field in data) {
      if (data[field]) user[field] = data[field];
    }
    dispatch(
      updateUserData({
        token,
        user,
        cb: () => {
          reset();
        },
      })
    );
    navigate('/');
  };

  if (!userName) return <Navigate to={SIGNIN} />;

  return (
    <Form title="Edit Profile" onSubmit={handleSubmit(onSubmit)}>
      <Username
        control={control}
        reguired={true}
        serverError={nameError}
        onChange={() => setNameError(false)}
        required={true}
      />

      <Email
        control={control}
        reguired={true}
        serverError={emailError}
        onChange={() => setEmailError(false)}
        required={true}
      />

      <Password
        control={control}
        label="New password"
        warrning="Password must be between 6 and 40 characters"
        required={true}
      />

      <AvatarUrl control={control} required={false} />

      <Submit control={control} value="Save" />
    </Form>
  );
}

export default EditProfile;
