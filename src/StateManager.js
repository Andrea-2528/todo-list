import { ProjectList } from './TaskManagement.js';
export { StateManager };

// The StateManager has methods to call each method in TaskManagement, and every
// other module has to go through the StateManager to access the data

class StateManager {
    constructor() {
        this.projectList = new ProjectList();
    };
    
    //Methods list
    addProject() { };
    editProject() { };
    deleteProject() { };
    getProjectByIndex() { };
    getAllProjects() { };
    addTask() { };
    editTask() { };
    deleteTask() { };
    checkTask() { };
    getTaskByIndex() { };
    getAllTasks() { };

    addProject(projectName) {
        this.projectList.addProject(projectName);
    };
    editProject(index, newName) {
        this.projectList.editProject(index, newName);
    };
    deleteProject(index) {
        this.projectList.deleteProject(index);
    };
    getProjectByIndex(index) {
        return this.projectList.getProjectByIndex(index);
    };
    getAllProjects() {
        return this.projectList.getAllProjects();
    };
    addTask(projectIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].addTask(taskName, taskDescription, taskPriority, taskDate);
    };
    editTask(projectIndex, taskIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].editTask(taskIndex, taskName, taskDescription, taskPriority, taskDate);
    };
    deleteTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].deleteTask(taskIndex);
    };
    checkTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].checkTask(taskIndex);
    };
    getTaskByIndex(projectIndex, taskIndex) {
        return this.projectList.projects[projectIndex].getTaskByIndex(taskIndex);
    };
    getAllTasks(projectIndex) {
        return this.projectList.projects[projectIndex].getAllTasks();
    };
};