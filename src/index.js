import "./styles.css";
import addProjectIcon from "./assets/images/add-project.svg";
import addTaskIcon from "./assets/images/add-task.svg";
import priorityIcon from "./assets/images/priority.svg";
import editTaskIcon from "./assets/images/edit.svg";
import deleteTaskIcon from "./assets/images/delete.svg";
import checkTaskIcon from "./assets/images/check.svg";

class Task {
    constructor(taskName, taskDescription, taskPriority, taskDate) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.taskDate = taskDate;
        this.isCompleted = false;
    };
};

class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.tasks = [];
    };

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

class StateManager {
    constructor() {
        this.projectList = new ProjectList();
    };

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

class DOMManipulator {
    constructor() {
        this.eventListenersManager = null;
    };

    setEventListenersManager(eventListenersManager) {
        this.eventListenersManager = eventListenersManager;
    };

    renderSidebarProjects(projectArray) {
        console.log(projectArray);
        //Elements are separated by hierarchy in the DOM

        const projectList = document.querySelector(".projects-list");
        projectList.innerHTML = "";

        const projectsTitle = document.createElement("div");
        projectsTitle.classList.add("projects-title");

        const projectTitlePara = document.createElement("p");
        projectTitlePara.textContent = "Projects";
        const addProjectButton = document.createElement("button");
        addProjectButton.classList.add("add-project");
        const addProjectImg = document.createElement("img");        
        addProjectImg.src = addProjectIcon;
        addProjectImg.alt = "add project button";

        addProjectButton.appendChild(addProjectImg);

        projectsTitle.appendChild(projectTitlePara);
        projectsTitle.appendChild(addProjectButton);

        projectList.appendChild(projectsTitle);

        projectArray.forEach((project, projectIndex) => {
            const sidebarProject = document.createElement("div");
            sidebarProject.classList.add("sidebar-project");
            sidebarProject.dataset.projectIndex = projectIndex;

            const sidebarProjectTitle = document.createElement("div");
            sidebarProjectTitle.classList.add("sidebar-project-title");
            const sidebarProjectName = document.createElement("button");
            sidebarProjectName.classList.add("sidebar-project-name");
            sidebarProjectName.textContent = project.projectName;
            const sidebarAddTask = document.createElement("button");
            sidebarAddTask.classList.add("sidebar-add-task");
            const sidebarAddTaskImg = document.createElement("img");
            sidebarAddTaskImg.src = addTaskIcon;
            sidebarAddTaskImg.alt = "add task button";

            sidebarAddTask.appendChild(sidebarAddTaskImg);
            sidebarProjectTitle.appendChild(sidebarProjectName);
            sidebarProjectTitle.appendChild(sidebarAddTask);
            sidebarProject.appendChild(sidebarProjectTitle);
            
            project.tasks.forEach((task, taskIndex) => {
                const sidebarTask = document.createElement("div");
                sidebarTask.classList.add("sidebar-task");
                sidebarTask.dataset.taskIndex = taskIndex;

                const sidebarTaskPriority = document.createElement("div");
                sidebarTaskPriority.classList.add("sidebar-task-priority");
                sidebarTaskPriority.dataset.taskPriority = task.taskPriority;
                const sidebarTaskPriorityImg = document.createElement("img");
                sidebarTaskPriorityImg.src = priorityIcon;
                sidebarTaskPriorityImg.alt = "priority color";
                const sidebarTaskName = document.createElement("p");
                sidebarTaskName.classList.add("sidebar-task-name");
                sidebarTaskName.textContent = task.taskName;
                const sidebarTaskCheck = document.createElement("button");
                sidebarTaskCheck.classList.add("sidebar-task-check");
                const sidebarTaskCheckImg = document.createElement("img");
                sidebarTaskCheckImg.src = checkTaskIcon;
                sidebarTaskCheckImg.alt = "check task button";
                const sidebarTaskEdit = document.createElement("button");
                sidebarTaskEdit.classList.add("sidebar-task-edit");
                const sidebarTaskEditImg = document.createElement("img");
                sidebarTaskEditImg.src = editTaskIcon;
                sidebarTaskEditImg.alt = "edit task button";
                const sidebarTaskDelete = document.createElement("button");
                sidebarTaskDelete.classList.add("sidebar-task-delete");
                const sidebarTaskDeleteImg = document.createElement("img");
                sidebarTaskDeleteImg.src = deleteTaskIcon;
                sidebarTaskDeleteImg.alt = "delete task button";

                sidebarTaskPriority.appendChild(sidebarTaskPriorityImg);
                sidebarTask.appendChild(sidebarTaskPriority);
                sidebarTask.appendChild(sidebarTaskName);
                sidebarTaskCheck.appendChild(sidebarTaskCheckImg);
                sidebarTask.appendChild(sidebarTaskCheck);
                sidebarTaskEdit.appendChild(sidebarTaskEditImg);
                sidebarTask.appendChild(sidebarTaskEdit);
                sidebarTaskDelete.appendChild(sidebarTaskDeleteImg);
                sidebarTask.appendChild(sidebarTaskDelete);
                sidebarProject.appendChild(sidebarTask);
            });

            projectList.appendChild(sidebarProject);

        });
    };
};

class EventListenersManager {
    constructor(stateManager, domManipulator) {
        this.stateManager = stateManager;
        this.domManipulator = domManipulator;
    };
};

class MainController {
    constructor() {
        this.stateManager = new StateManager();
        this.domManipulator = new DOMManipulator();
        this.eventListenersManager = new EventListenersManager(this.stateManager, this.domManipulator);
        this.domManipulator.setEventListenersManager(this.eventListenersManager);
    };

    initialize() {
        //For the moment I'll pretend to load previous state by declaring a setup in initialize
        this.stateManager.addProject("Work");
        this.stateManager.addProject("Home");
        this.stateManager.addProject("Hobbies");
        this.stateManager.addTask(0, "Check Inventory", "Here's a description", "low", "2023-01-01");
        this.stateManager.addTask(0, "Prepare meeting", "Here's a description", "medium", "2023-01-02");
        this.stateManager.addTask(0, "Do actual work", "Here's a description", "high", "2023-01-03");
        this.stateManager.addTask(1, "Clean bedroom", "Here's a description", "medium", "2023-01-01");
        this.stateManager.addTask(1, "Buy groceries", "Here's a description", "high", "2023-01-02");
        this.stateManager.addTask(1, "Change light bulb", "Here's a description", "low", "2023-01-03");
        this.stateManager.addTask(2, "Practice guitar", "Here's a description", "low", "2023-01-01");
        this.stateManager.addTask(2, "Code for fun", "Here's a description", "medium", "2023-01-02");
        this.stateManager.checkTask(0, 2);
        console.log(this.stateManager);

        this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
    };
};

const mainController = new MainController();
mainController.initialize();