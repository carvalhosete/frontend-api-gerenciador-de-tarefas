import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function AddTaskForm({ onTaskCreated }) {
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

            // chama a função que recebemos via props.
            onTaskCreated(response.data); 

            //limpa os campos do formulário após a criação.
            setNewTaskTitle('');
            setNewTaskDescription('');

        } catch(error){
            console.error('Erro ao criar tarefa: ', error);
            alert('Não foi possível criar a tarefa.');
        }
    };

    return (
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
    );
}

export default AddTaskForm;