import PropTypes from 'prop-types';
import { use, useEffect, useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

// third-party
import { useForm } from 'react-hook-form';

// project-imports
import MainCard from 'components/MainCard';
import { emailSchema, passwordSchema } from 'utils/validationSchema';

// assets
import DarkLogo from 'assets/images/logo-dark.svg';
import { useNavigate } from 'react-router-dom';

import { login } from '../../api/services/auth-service'; // Assuming you have an API function for login

// ==============================|| AUTH LOGIN FORM ||============================== //

export default function AuthLoginForm({ className, link }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async () => {
    try {
      const { email, password } = getValues();
      const userData = {
        email: email, // Get email from form
        password: password // Get password from form
      };
      const resultAction = await dispatch(loginUser(formData));

      localStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('user', JSON.stringify(response));

      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/dashboard');
        reset();
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show toast, etc.)
    }
  };

  useEffect(() => {
    const isUserExists = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (isUserExists) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <MainCard className="mb-0">
      <div className="text-center">
        <a>
          <Image src={DarkLogo} alt="img" />
        </a>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={`text-center f-w-500 mt-4 mb-3 ${className}`}>Login</h4>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control
            type="email"
            placeholder="Email Address"
            {...register('email', emailSchema)}
            isInvalid={!!errors.email}
            className={className && 'bg-transparent border-white text-white border-opacity-25 '}
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password', passwordSchema)}
              isInvalid={!!errors.password}
              className={className && 'bg-transparent border-white text-white border-opacity-25 '}
            />
            <Button onClick={togglePasswordVisibility}>
              {showPassword ? <i className="ti ti-eye" /> : <i className="ti ti-eye-off" />}
            </Button>
          </InputGroup>
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Stack direction="horizontal" className="mt-1 justify-content-between align-items-center">
          <Form.Group controlId="customCheckc1">
            <Form.Check
              type="checkbox"
              label="Remember me?"
              defaultChecked
              className={`input-primary ${className ? className : 'text-muted'} `}
            />
          </Form.Group>
          <a href="#!" className={`text-secondary f-w-400 mb-0  ${className}`}>
            Forgot Password?
          </a>
        </Stack>
        <div className="text-center mt-4">
          <Button type="submit" className="shadow px-sm-4">
            Login
          </Button>
        </div>
        <Stack direction="horizontal" className="justify-content-between align-items-end mt-4">
          <h6 className={`f-w-500 mb-0 ${className}`}>Don't have an Account?</h6>
          <a href={link} className="link-primary">
            Create Account
          </a>
        </Stack>
      </Form>
    </MainCard>
  );
}

AuthLoginForm.propTypes = { className: PropTypes.string, link: PropTypes.string, resetLink: PropTypes.string };
