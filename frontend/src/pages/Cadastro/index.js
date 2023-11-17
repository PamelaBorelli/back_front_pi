import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo_nome from "../../components/Footer/imagens/logo_nome.png"; 

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          login,
          senha,
        }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro ao realizar cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <Container>
      {/* Adicione a imagem da sua logo aqui */}
      <img className="logo_nome" src={logo_nome} alt="Logo" />

      <Input
        placeholder='Nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Input
        placeholder='E-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder='Login'
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        placeholder='Senha'
        type='password'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Button onClick={handleCadastro}>
        <ButtonText>CADASTRAR</ButtonText>
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
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

const LogoImage = styled.img`
  width: 150px; 
  height: 150px;
  margin-bottom: 20px;
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

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;
export default Cadastro;
