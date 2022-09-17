import React, { useState } from 'react';
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
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { saveAuthInfo } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      });
      const info = res.data;
      saveAuthInfo(info);
      setUser({
        id: info.user.id,
        email: info.user.id,
        password: info.user.id,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <Container>
      <h1 className="mt-3 mb-3 text-center">Login</h1>
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

export default Login;
