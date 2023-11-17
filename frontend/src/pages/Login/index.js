import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha: password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        alert('Login bem-sucedido!');
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setError('Erro ao realizar login. Por favor, tente novamente.');
    }
  };

  const handleCadastroRedirect = () => {
    navigate('/cadastro');
  };

  return (
    <Container>
      <Input
        placeholder='Login'
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        placeholder='Senha'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button onClick={handleLogin}>
        <ButtonText>ENTRAR</ButtonText>
      </Button>
      <StyledCadastrarButton onClick={handleCadastroRedirect}>
        Cadastrar
      </StyledCadastrarButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 95vh;
  border: 2px;
`;

const Input = styled.input`
  border: 0.5px solid #ccc;
  border-radius: 5px;
  padding: 9px;
  margin: 10px;
  width: 28%;
`;

const Button = styled.button`
  background-color: #2d81c2;
  border: 0.5px solid #ccc;
  border-radius: 5px;
  padding: 9px;
  width: 28%;
`;

const ButtonText = styled.span`
  color: #fff;
  font-weight: bold;
`;

const StyledCadastrarButton = styled.p`
  color: #a9a9a9;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
  font-weight: bold;
`;

export default Login;
