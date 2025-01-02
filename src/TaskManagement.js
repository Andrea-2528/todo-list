import { parse } from 'date-fns';
export { Task, Project, ProjectList };

// The here defined classes are used to store the data of trask and projects,
// and is overall accessible through the StateManager

class Task {
    constructor(taskName, taskDescription, taskPriority, taskDate) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskDate = parse(taskDate, 'yyyy-MM-dd', new Date());
        this.isCompleted = false;
    };
};

class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.tasks = [];
    };

    //Methods list
    addTask() { };
    editTask() { };
    deleteTask() { };
    checkTask() { };
    getTaskByIndex() { };
    getAllTasks() { };

    addTask(taskName, taskDescription, taskPriority, taskDate) {
        this.tasks.push(new Task(taskName, taskDescription, taskPriority, taskDate));
    };
    editTask(index, taskName, taskDescription, taskPriority, taskDate) {
        this.tasks[index].taskName = taskName;
        this.tasks[index].taskDescription = taskDescription;
        this.tasks[index].taskPriority = taskPriority;
        this.tasks[index].taskDate = taskDate;
    };
    deleteTask(index) {
        this.tasks.splice(index, 1);
    };
    checkTask(index) {
        this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    };
    getTaskByIndex(index) {
        return this.tasks[index];
    };
    getAllTasks() {
        return this.tasks;
    };
};

class ProjectList {
    constructor() {
        this.projects = [];
    };

    //Methods list
    addProject() { };
    editProject() { };
    deleteProject() { };
    getProjectByIndex() { };
    getAllProjects() { };

    addProject(projectName) {
        this.projects.push(new Project(projectName));
    };
    editProject(index, newName) {
        this.projects[index].projectName = newName;
    };
    deleteProject(index) {
        this.projects.splice(index, 1);
    };
    getProjectByIndex(index) {
        return this.projects[index];
    };
    getAllProjects() {
        return this.projects;
    };
};