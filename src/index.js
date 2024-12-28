import "./styles.css";

class Task {
    static counter = 0;
    constructor(taskName, taskDescription, taskPriority, taskDate) {
        this.id = Task.counter++;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskDate = taskDate;
        this.isCompleted = false;
    }
}

class Project {
    static counter = 0;
    constructor(projectName) {
        this.id = Project.counter++;
        this.projectName = projectName;
        this.tasks = [];
    }
    
}