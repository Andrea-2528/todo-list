import { ProjectList } from './TaskManagement.js';
export { StateManager };

// The StateManager has methods to call each method in TaskManagement, and every
// other module has to go through the StateManager to access the data

class StateManager {
    constructor() {
        this.projectList = new ProjectList();
        this.loadFromLocalStorage();
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
    getCompletedTasks() { };
    getNotCompletedTasks() { };
    orderEarliestLatest() { };
    orderLatestEarliest() { };
    getTodayTasks() { };
    saveToLocalStorage() { };
    loadFromLocalStorage() { };

    addProject(projectName) {
        this.projectList.addProject(projectName);
        this.saveToLocalStorage();
    };
    editProject(index, newName) {
        this.projectList.editProject(index, newName);
        this.saveToLocalStorage();
    };
    deleteProject(index) {
        this.projectList.deleteProject(index);
        this.saveToLocalStorage();
    };
    getProjectByIndex(index) {
        return this.projectList.getProjectByIndex(index);
    };
    getAllProjects() {
        return this.projectList.getAllProjects();
    };
    addTask(projectIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].addTask(taskName, taskDescription, taskPriority, taskDate);
        this.saveToLocalStorage();
    };
    editTask(projectIndex, taskIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].editTask(taskIndex, taskName, taskDescription, taskPriority, taskDate);
        this.saveToLocalStorage();
    };
    deleteTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].deleteTask(taskIndex);
        this.saveToLocalStorage();
    };
    checkTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].checkTask(taskIndex);
        this.saveToLocalStorage();
    };
    getTaskByIndex(projectIndex, taskIndex) {
        return this.projectList.projects[projectIndex].getTaskByIndex(taskIndex);
    };
    getAllTasks(projectIndex) {
        return this.projectList.projects[projectIndex].getAllTasks();
    };

    getCompletedTasks() {
        const completedTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.isCompleted) {
                    completedTasks.push(task);
                };
            });
        });
        return completedTasks;
    };

    getNotCompletedTasks() {
        const notCompletedTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (!task.isCompleted) {
                    notCompletedTasks.push(task);
                };
            });
        });
        return notCompletedTasks;
    };

    orderEarliestLatest(tasks) {
        return tasks.sort((a, b) => a.taskDate - b.taskDate);
    };

    orderLatestEarliest(tasks) {
        return tasks.sort((a, b) => b.taskDate - a.taskDate);
    };

    getTodayTasks() {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const todayTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.taskDate >= startOfToday && task.taskDate < endOfToday) {
                    todayTasks.push(task);
                };
            });
        });
        return todayTasks;
    };

    saveToLocalStorage() {
        const serializedData = JSON.stringify(this.projectList.projects.map(project => ({
            ...project,
            tasks: project.tasks.map(task => ({
                ...task,
                taskDate: `${task.taskDate.getFullYear()}-${String(task.taskDate.getMonth() + 1).padStart(2, '0')}-${String(task.taskDate.getDate()).padStart(2, '0')}`
            }))
        })));
        localStorage.setItem('todoData', serializedData);
    }
    

    loadFromLocalStorage() {
        const data = localStorage.getItem('todoData');
        if (data) {
            const projectsArray = JSON.parse(data);
            projectsArray.forEach(projectData => {
                // Add project through StateManager
                this.addProject(projectData.projectName);
                const projectIndex = this.projectList.projects.length - 1;
    
                projectData.tasks.forEach(taskData => {
                    // Use the date string directly
                    this.addTask(
                        projectIndex,
                        taskData.taskName,
                        taskData.taskDescription,
                        taskData.taskPriority,
                        taskData.taskDate // Pass taskDate directly as 'yyyy-MM-dd'
                    );
                    // Mark the task as completed if applicable
                    if (taskData.isCompleted) {
                        this.checkTask(projectIndex, this.projectList.projects[projectIndex].tasks.length - 1);
                    }
                });
            });
        } else {
            // Add a default project if no data exists
            this.addProject("Default");
        }
    }

};