import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onDeleteTask, onToggleTaskStatus }) {
    return(
        <ul>
            {tasks.map(task => (
                <TaskItem   
                    key={task.id}
                    task={task} 
                    onDelete={onDeleteTask}
                    onToggleTaskStatus={onToggleTaskStatus} //repassa o prop para o filho
                    />
            ))}
        </ul>        
    );
}

export default TaskList;