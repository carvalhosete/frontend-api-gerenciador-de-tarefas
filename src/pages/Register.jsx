import { useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate
import './styles/Register.css';
import AddUserForm from './components/AddUseForm';

function RegisterPage() { 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleUserCreated = () =>{
    alert("Usuário criado com sucesso! Redirecionando para o login...");
    navigate('/login');
  };

  return (
    <div className="register-container"> 
      <div className="register-form-card"> 
        <h2>Cadastro</h2>
        <AddUserForm onUserCreated={handleUserCreated}/> 

        <div className="login-link-container">
          <p>Já tem uma conta? 
            <button type="button" onClick={handleLoginClick} className='login-link-button'>
              Faça o login
            </button>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default RegisterPage;
