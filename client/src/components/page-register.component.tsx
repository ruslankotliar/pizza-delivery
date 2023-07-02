import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Upload, Input, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserRegistrationData } from '../types';

import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authActions';
import { AppDispatch } from '../app/store';

export const RegistrationPageComponent = () => {
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: UserRegistrationData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: undefined,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleAvatarChange = (info: any) => {
    setAvatar(info.file);
  };

  const handleSubmit = async (values: UserRegistrationData) => {
    dispatch(register({ ...values, avatar: avatar }));
    // setTimeout(() => {
    //   window.location.href = '/';
    // }, 250);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10em',
        paddingBottom: '5em',
        minHeight: '40em',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form>
            <Row gutter={[16, 16]}>
              <Col
                span={6}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Upload
                  onChange={handleAvatarChange}
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <div
                    style={{
                      width: '15em',
                      height: '15em',
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#f0f0f0',
                    }}
                  >
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt='Avatar'
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                        }}
                      >
                        <span style={{ color: '#8c8c8c' }}>
                          <i className='fas fa-user-secret'></i>
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                        background: '#000',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'opacity 0.3s',
                      }}
                    >
                      <UploadOutlined style={{ fontSize: '24px' }} />
                      <input
                        type='file'
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          handleAvatarChange({
                            file: e.target.files ? e.target.files[0] : {},
                            status: 'done',
                            originFileObj: e.target.files
                              ? e.target.files[0]
                              : {},
                          })
                        }
                      />
                    </div>
                  </div>
                </Upload>
              </Col>
              <Col span={18}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Field name='firstName'>
                      {({ field }: any) => (
                        <div>
                          <Input {...field} placeholder='First Name' />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='firstName' component='div' />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col span={12}>
                    <Field name='lastName'>
                      {({ field }: any) => (
                        <div>
                          <Input {...field} placeholder='Last Name' />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='lastName' component='div' />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col span={24}>
                    <Field name='email'>
                      {({ field }: any) => (
                        <div>
                          <Input {...field} placeholder='Email' />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='email' component='div' />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col span={24}>
                    <Field name='password'>
                      {({ field }: any) => (
                        <div>
                          <Input.Password {...field} placeholder='Password' />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage name='password' component='div' />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                  <Col span={24}>
                    <Field name='confirmPassword'>
                      {({ field }: any) => (
                        <div>
                          <Input.Password
                            {...field}
                            placeholder='Confirm Password'
                          />
                          <div style={{ color: 'red' }}>
                            <ErrorMessage
                              name='confirmPassword'
                              component='div'
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button type='primary' htmlType='submit'>
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
