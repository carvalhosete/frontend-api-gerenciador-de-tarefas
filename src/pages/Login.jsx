import './styles/Login.css';
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
      await axios.post('http://localhost:3000/api/login', {
        email: email,
        password: password
      });

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

  const handleRegisterClick = () => {
      navigate('/register'); //Redireciona o usuário para página de cadastro.
  };
  
  return (
  <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">Entrar</button>

    <div className="google-login-container">
      <a href="http://localhost:3000/api/google" style={{ textDecoration: 'none', width: '100%' }}>
        <button type="button" className="google-login-button">
          {/* Ícone do Google em SVG */}
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            <path fill="none" d="M1 1h22v22H1z"/>
          </svg>
          Entrar com Google
        </button>
      </a>
    </div>



      {/* Navegação para Cadastro*/}
    <div className="register-link-container">
      <p>Não tem uma conta? 
      <button type="button" onClick={handleRegisterClick} className='register-button'>
        Cadastre-se
      </button>
      </p>
    </div>
    </form>
  </div>
);

}

export default LoginPage;