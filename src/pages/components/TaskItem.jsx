function TaskItem({ task, onDelete, onToggleTaskStatus }) {
    return (
        <div className={`task-item ${task.isDone ? 'completed' : ''}`}>
            
            <div>
                <h3 className="task-title">{task.title}</h3>
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
            </div>

            <div className="task-actions">
                <button onClick={() => onDelete(task.id)}>Excluir</button>
            </div>
        </div>
    );

}

export default TaskItem;