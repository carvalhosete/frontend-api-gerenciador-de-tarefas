import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); //Impede o carregamento padrão da página.
    //console.log('Dados para enviar:', { email, password });
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: email,
        password: password
      });

      localStorage.setItem('token', response.data.token); //Salva o token no LocalStorage do navegador.

      navigate('/dashboard'); //Rediceriona o usuário para a página de dashboard

    } catch(error) {
      console.error('Erro no login:', error.response.data.message);
      alert('Erro: ' + error.response.data.message);

      if(error.response){
        alert('Erro: ' + error.response.data.message);
      } else {
        alert('Erro: Não foi possível conectar ao servidor.');
      }
    }
  };
  
  return (
      <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
        type="email" 
        id="email" 
        name="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input 
        type="password" 
        id="password" 
        name="password" 
        value ={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  </div>    
  );
}

export default LoginPage;