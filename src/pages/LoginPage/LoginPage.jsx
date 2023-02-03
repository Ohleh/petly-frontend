import { Title, LinkText, StyledLink, BackgroundContainer } from '../../components/Auth/Auth.styled';
import GoogleIcon from '../../components/Auth/GoogleSignIn/GoogleIcon';
import { selectIsLogin } from 'redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

export default function LoginPage() {

  const isLogin = useSelector(selectIsLogin);

  if (isLogin) {
    return <Navigate to="/user" />;
  }

  const handleGoogleClick = () => {
    
  }

  return (
    <>
      <BackgroundContainer>
        <Title>Login</Title>
        <LoginForm />
        <GoogleIcon onClick={handleGoogleClick} />
        <LinkText>Don't have an account? <StyledLink to="/register">Register</StyledLink></LinkText>
        <LinkText>Forgot your password? <StyledLink to="/restore">Password recovery</StyledLink></LinkText>
      </BackgroundContainer>
      </>
  )
};