import './styles/Dashboard.css';
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
            await axios.delete(`http://localhost:3000/api/tasks/${taskId}` ); //url com ID da tarefa
            setTasks(tasks.filter(task => task.id !== taskId));
            alert('Tarefa excluída com sucesso!');

        } catch(error){
            console.error('Erro ao excluir tarefa: ', error);
            if(error.response && error.response.status === 401){
                navigate('/login');
            } else {
                alert('Não foi possível excluir a tarefa.');
            }
        }
    };

    const handleToggleTaskStatus = async (taskID, currentStatus) => {
        console.log(`Atualizar status da tarefa${taskID} para ${!currentStatus}`);
        
        try {
            const response = await axios.put(`http://localhost:3000/api/tasks/${taskID}`, {isDone: !currentStatus});

            const updatedTasks = tasks.map(task => {
                if (task.id === taskID){
                    return response.data;
                }
                return task;
            });

            setTasks(updatedTasks);


        } catch(error) {
            console.error('Erro ao atualizar Tarefa: ', error);

            if(error.response && error.response.status === 401){
                navigate('/login');
            } else {
                alert('Não foi possível atualizar a tarefa.')
            }
        }
    };



    useEffect(() =>{
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/tasks');
                setTasks(response.data);

            } catch(error) {
                console.error('Erro ao buscar tarefas: ', error);
                
                if(error.response && error.response.status === 401){
                    navigate('/login');
                } else{
                    alert('Não foi possível carregar as tarefas');
                }
                
            }
        };

    fetchTasks(); //chama a função de busca
    }, [navigate]);
    
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/logout' );
            navigate('/login');
        } catch(error){
            console.error('Erro ao fazer o logout: ', error);
            navigate('/login'); //mesmo se falhar força o redirecionamento
        }
    }

    return (
        <div className="dashboard-container">
            
            <header className="dashboard-header">
            <h1>Dashboard de Tarefas</h1>
            <button onClick={handleLogout} className="logout-button">Sair</button>
            </header>
            <section className="dashboard-card">
            <h2>Criar Nova Tarefa</h2>
            <AddTaskForm onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />
            </section>
            <section className="dashboard-card">
            <h2>Minhas Tarefas</h2>
            {tasks.length === 0 ? (
                <p>Você ainda não tem tarefas.</p>
            ) : (
                <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onToggleTaskStatus={handleToggleTaskStatus}
                />
            )}
            </section>
        </div>
    );
}

export default DashboardPage;