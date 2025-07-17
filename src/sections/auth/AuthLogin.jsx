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
import { useDispatch } from 'react-redux';
import { addUserData } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';

// ==============================|| AUTH LOGIN FORM ||============================== //

export default function AuthLoginForm({ className, link }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        email: email,
        password: password
      };
      // const response = await login(userData);
      const response = {
        success: true,
        message: 'Login successful',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiYjUyMmU2NmE0YTM5ODI1ZmM4NGQiLCJpYXQiOjE3NTIwNDE1ODYsImV4cCI6MTc1MjY0NjM4Nn0.MVeTnZFPyntMPbTHGfwNhDGljIitS1fQIhLLSnh-DEc',
        user: {
          id: '686bb522e66a4a39825fc84d',
          username: 'testuser',
          email: 'test@hpcl.com',
          role: 'user',
          profile: {
            firstName: 'Test',
            lastName: 'User',
            department: 'Logistics',
            employeeId: 'EMP001'
          },
          lastLogin: '2025-07-09T06:13:06.521Z'
        }
      };

      dispatch(addUserData(response));
      toast.success(response?.message || 'Login successful!');
      localStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem(
        'selectedRoute',
        JSON.stringify({
          id: 24,
          bu_code: '1146',
          location: 'MEERUT DEPOT',
          row_labels: '0041025372',
          customer_name: 'MOTI FILLING STATION',
          badge1: 'Reject',
          badge2: 'Get Route'
        })
      );
      localStorage.setItem(
        'routeData',
        JSON.stringify({
          route: {
            id: '68720afde66a4a398260468b',
            routeId: 'RT1752304381828QNQC4',
            routeName: 'MEERUT DEPOT to MOTI FILLING STATION',
            fromCode: '1146',
            fromName: 'MEERUT DEPOT',
            toCode: '0041025372',
            toName: 'MOTI FILLING STATION',
            totalDistance: 79.85000000000053,
            estimatedDuration: 120,
            liveMapLink:
              'https://www.google.com/maps/dir/28.94966,77.65907/29.00264,77.64778/29.04554,77.69698/29.1035,77.71146/29.19274,77.71915/29.24784,77.72425/29.30014,77.72028/29.38893,77.70152/29.44968,77.73611/29.53461,77.73553',
            coordinates: {
              start: {
                latitude: 28.94966,
                longitude: 77.65907
              },
              end: {
                latitude: 29.53461,
                longitude: 77.73553
              }
            },
            gpsTracking: {
              totalPoints: 1878,
              startPoint: '28.94966, 77.65907',
              endPoint: '29.53461, 77.73553',
              parseErrors: 1,
              accuracy: 'excellent'
            }
          },
          processing: {
            totalLinesProcessed: 1879,
            validGPSPoints: 1878,
            parseErrors: 1,
            successRate: '100%',
            trackingAccuracy: 'excellent'
          },
          errors: [
            {
              line: 1,
              error: 'Invalid coordinate values (not numbers)',
              data: 'Latitude,Longitude'
            }
          ],
          nextSteps: [
            'GPS route has been created with detailed tracking points',
            'You can view the route on Google Maps using the live link',
            'Use /api/routes/:id/collect-all-data to gather comprehensive route data',
            'Individual GPS points are stored for detailed analysis',
            'Route is ready for risk assessment and analysis'
          ]
        })
      );
      // console.log('API Response:', response);
      navigate('/');
      reset();
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error?.message || 'Login failed. Please try again.');
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
        <h2>JMS Maps</h2>
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
        <Stack direction="horizontal" className="justify-content-center row align-items-center mt-4" style={{ textAlign: 'center' }}>
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
