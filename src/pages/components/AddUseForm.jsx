import { useState } from 'react';
import axios from 'axios';

function AddUserForm( { onUserCreated }){
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const navigate = useNavigate ();

    const handleCreateUser = async(event) => {
        event.preventDefault();

        if(newUserPassword !== confirmPassword){
            alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/users',{
                email: newUserEmail,
                name: newUserName,
                password: newUserPassword
            }
            );

            onUserCreated(response.data);

            //limpa os campos do formulário após a criação
            setNewUserName('');
            setNewUserEmail('');
            setNewUserPassword('');

        } catch(error){
            if(error.response){
                alert(error.response.data.message);
            } else {
                alert("Não foi possível conectar com o servidor. Tente novamente mais tarde.");
            }
        }
    };

    return (
        <form onSubmit={handleCreateUser}>
            <div className="form-group">
                <label htmlFor='name'>Nome: </label>
                <input
                    type="text"
                    id="name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor='email'>E-mail: </label>
                <input
                    type="email"
                    id="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor='password'>Senha: </label>
                <input
                    type="password"
                    id="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Confirmação de Senha: </label>
                <input
                    type="password"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            {confirmPassword && newUserPassword !== confirmPassword && (
            <p style={{ color: 'red' }}>As senhas não coincidem.</p>)}
            <button type="submit" className="register-submit-button">Cadastrar</button>
        </form>
    );

}

export default AddUserForm;