import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function DashboardPage() {
    const[tasks, setTasks] = useState([]); //cria um estado para as tarefas começando com um array vazio
    const navigate = useNavigate ();

    useEffect(() =>{
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token){
                    //se não houver token, não continua
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}` //o formato que a API espera
                    }
                } );

                setTasks(response.data); //atualiza o estado com as tarefas recebidas na API
            } catch(error) {
                console.error('Erro ao buscar tarefas: ', error);
                alert('Não foi possível carregar as tarefas');
            }
        };

    fetchTasks(); //chama a função de busca


    }, [navigate]);
    
    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login'); //evita o usuário voltar para a porta de entrada.
    }


    return(
        <div>
            <h1>Dashboard de Tarefas</h1>
            <p>Bem-vindo! Suas tarefas aparecerão aqui.</p>
            <button onClick={handleLogout}>Sair</button>

            <div>
                <h2>Minhas Tarefas</h2>
                {tasks.length === 0 ? (
                    <p>Você ainda não tem tarefas.</p>
                ) : (
                    <ul>
                        {tasks.map(tasks => (
                            <li key={tasks.id}>
                                <h3>{tasks.title}</h3>
                                <p>{tasks.description}</p>
                                <p>Status: {tasks.isDone ? 'Concluída' : 'Pendente'}</p>
                            </li>    
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;