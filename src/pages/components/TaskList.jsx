import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onDeleteTask, onToggleTaskStatus }) {
    return(
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem   
                    key={task.id}
                    task={task} 
                    onDelete={onDeleteTask}
                    onToggleTaskStatus={onToggleTaskStatus}
                />
            ))}
        </div>        
    );

}

export default TaskList;