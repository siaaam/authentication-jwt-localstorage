import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Field should contain a valid e-mail')
      .max(255)
      .required('E-mail is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Registration = () => {
  const navigate = useNavigate();
  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, username, password } = data;

    try {
      const res = await axios.post(
        'http://localhost:1337/api/auth/local/register',
        {
          username,
          email,
          password,
        }
      );
      saveAuthInfo(res.data);
      navigate('/');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <Container>
      <h1 className="mt-3 mb-3 text-center text-danger">Registration</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            {...register('email')}
            isInvalid={errors?.email?.message}
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Username"
            {...register('username')}
            isInvalid={errors?.username?.message}
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            {...register('password')}
            isInvalid={errors?.password?.message}
          />
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default Registration;
