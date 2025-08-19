import { useState } from 'react';
import axios from 'axios';

function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); //Impede o carregamento padrão da página.
    console.log('Dados para enviar:', { email, password });
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email: email,
        password: password
      });

      //Em caso de chamada bem sucedida, o token estará em response.data.token
      console.log('Login realizado com sucesso!');
      console.log('Token:', response.data.token);

    } catch(error) {
      console.error('Erro no login:', error.response.data.message);
      alert('Erro: ' + error.response.data.message);
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