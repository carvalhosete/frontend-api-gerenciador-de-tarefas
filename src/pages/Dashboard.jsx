import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import AddTaskForm from './components/AddTaskForm.jsx';
import TaskList from './components/TaskList.jsx';


function DashboardPage() {
    const[tasks, setTasks] = useState([]); //cria um estado para as tarefas começando com um array vazio
    
    const navigate = useNavigate ();

    
    const handleDeleteTask = async (taskId) => {
        console.log("Excluir tarefa com ID:", taskId);
        if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")){
            return; //se cancelar para aqui.
        }

        try{
            const token = localStorage.getItem('token');
            if(!token) {
                navigate('/login');
                return;
            }

            await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, //url com ID da tarefa
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }    
            );

            const updatedTasks = tasks.filter(task => task.id !== taskId);

            setTasks(updatedTasks);

            alert('Tarefa excluída com sucesso!');

        } catch(error){
            console.error('Erro ao excluir tarefa: ', error);
            alert('Não foi possível excluir a tarefa.');
        }
    };

    const handleToggleTaskStatus = async (taskID, currentStatus) => {
        console.log(`Atualizar status da tarefa${taskID} para ${!currentStatus}`);
        
        try {
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/login');
                return;
            }

            const response = await axios.put(`http://localhost:3000/api/tasks/${taskID}`,
                {isDone: !currentStatus},
                {headers:{Authorization: `Bearer ${token}` } }
            );

            const updatedTasks = tasks.map(task => {
                
                if (task.id === taskID){
                    return response.data;
                }
                return task;
            });

            setTasks(updatedTasks);


        } catch(error) {
            console.error('Erro ao atualizar Tarefa: ', error);
            alert('Não foi possível atualizar a tarefa.')
        }
    };



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

            <hr />
            
            <AddTaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
            
            <hr />    

            <div>
                <h2>Minhas Tarefas</h2>
                {tasks.length === 0 ? (
                    <p>Você ainda não tem tarefas.</p>
                ) : (
                    <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTaskStatus={handleToggleTaskStatus}/>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;