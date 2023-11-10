import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate();

  const handleLogin = () => {
      if (email === '' && password === ''){
          navigate('/dashboard');
      }else{
          alert('E-mail ou senha inválidos!')
      }
  }
  return (
    <Container>
        
        <Input
        placeholder='E-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder='Senha'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>
            <ButtonText>ENTRAR</ButtonText>
        </Button>
    </Container>
  );

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 95vh;
    border: 2px
`;

const Input = styled.input`
    border: 0.5px solid #ccc;
    border-radius: 5px;
    padding: 9px;
    margin: 10px;
    width: 28%;
`;

const Button = styled.button`
    background-color: #2D81C2;
    border: 0.5px solid #ccc;
    border-radius: 5px;
    padding: 9px;
    width: 28%;
`;

const ButtonText = styled.span`
    color: #fff;
    font-weight: bold;
    // font-size: 20px
`;

export default Login;
