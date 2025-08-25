function TaskItem({ task, onDelete, onToggleTaskStatus }) {
    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        
                        onChange={() => onToggleTaskStatus(task.id, task.isDone)}
                    />
                    Status: {task.isDone ? 'Concluída' : 'Pendente'}
                </label>
            </div>
            <button onClick={() => onDelete(task.id)}>Excluir</button>
        </li>
    );
}

export default TaskItem;