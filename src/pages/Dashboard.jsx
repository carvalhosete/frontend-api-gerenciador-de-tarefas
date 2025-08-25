import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function DashboardPage() {
    const[tasks, setTasks] = useState([]); //cria um estado para as tarefas começando com um array vazio
    const[newTaskTitle, setNewTaskTitle] =  useState('');
    const[newTaskDescription, setNewTaskDescription] = useState('');

    const navigate = useNavigate ();

    const handleCreateTask = async(event) => {
        event.preventDefault();

        if(!newTaskTitle) {
            alert('O título da tarefa é obrigatório');
            return;
        }


        try {
            const token = localStorage.getItem('token');
            if(!token){
                //Se o token sumiu ou expirou, envia o usuário de volta para tela de login.
                navigate('/login');
                return;
            }

            //chamar o POST da API com axios.
            const response = await axios.post('http://localhost:3000/api/tasks',{
                title: newTaskTitle,
                description: newTaskDescription,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`                   
                }
            }
            );
            
            //pra atualizar a pagina com a task nova.

            const newTask = response.data;

            //Usa o setTasks pra criar um NOVO array que contém todas as tarefas(antigas e novas).
            setTasks([...tasks, newTask]);

            //limpa os campos do formulário após a criação.
            setNewTaskTitle('');
            setNewTaskDescription('');

        } catch(error){
            console.error('Erro ao criar tarefa: ', error);
            alert('Não foi possível criar a tarefa.');
        }
    }

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

                <form onSubmit={handleCreateTask}>
                    <h3>Criar Nova Tarefa</h3>
                    <div>
                        <label htmlFor='title'>Título: </label>
                        <input
                            type="text"
                            id="title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor='description'>Descrição: </label>
                        <input
                            type="text"
                            id="description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit">Adicionar Tarefa</button>
                </form>
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