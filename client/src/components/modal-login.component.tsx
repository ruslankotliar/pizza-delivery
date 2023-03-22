import React, { useState } from 'react';

import { Form, Input, Button, Checkbox, Modal, Typography, theme } from 'antd';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleSquareFilled } from '@ant-design/icons';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { UserLoginData } from '../types';

import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authActions';
import { AppDispatch } from '../app/store';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const ModalLoginComponent = ({ isModalOpen, setIsModalOpen }: any) => {
  const { token } = theme.useToken();
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: UserLoginData) => {
    dispatch(login(values));
    setTimeout(() => {
      window.location.href = '/';
    }, 250);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as UserLoginData,
    validationSchema: LoginSchema,
    onSubmit: handleSubmit,
  });

  const handleRememberChange = (e: any) => {
    setRemember(e.target.checked);
  };

  // google login
  useGoogleOneTapLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
    onError: () => console.error('Login Error'),
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

  return (
    <Modal open={isModalOpen} footer={null}>
      <Typography.Title
        style={{ textAlign: 'center', marginTop: 20 }}
        level={3}
      >
        Login
      </Typography.Title>
      <Form
        layout='vertical'
        onFinish={formik.handleSubmit}
        style={{ padding: '0 5em', marginBottom: 20 }}
      >
        <Form.Item
          label='Email'
          required
          validateStatus={
            formik.touched.email && formik.errors.email ? 'error' : ''
          }
          help={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ''
          }
        >
          <Input
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label='Password'
          required
          validateStatus={
            formik.touched.password && formik.errors.password ? 'error' : ''
          }
          help={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ''
          }
        >
          <Input.Password
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={remember} onChange={handleRememberChange}>
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{
              width: '100%',
              fontWeight: 600,
              color: token.colorPrimaryActive,
            }}
          >
            Log in
          </Button>
        </Form.Item>
        <Button
          className={'login-button login-button-google'}
          icon={
            <GoogleSquareFilled
              style={{
                fontSize: '1.5em',
                backgroundColor: '#000',
                color: 'white',
              }}
            />
          }
          type='primary'
          onClick={() => handleGoogleLogin()}
        >
          Google
        </Button>
        <div style={{ border: '1px dashed #ccc', margin: '16px 0' }} />
        <div style={{ marginTop: '16px' }}>
          Not a member yet? <a href='/register'>Register now</a>
        </div>
      </Form>
    </Modal>
  );
};
