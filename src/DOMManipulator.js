import addProjectIcon from "./assets/images/add-project.svg";
import addTaskIcon from "./assets/images/add-task.svg";
import priorityIcon from "./assets/images/priority.svg";
import editTaskIcon from "./assets/images/edit.svg";
import deleteTaskIcon from "./assets/images/delete.svg";
import checkTaskIcon from "./assets/images/check.svg";
import inboxPageIcon from "./assets/images/inbox.svg";
import todayPageIcon from "./assets/images/today.svg";
import completedPageIcon from "./assets/images/completed.svg";
import expandTaskIcon from "./assets/images/arrow-down.svg";
import { format } from 'date-fns';

export { DOMManipulator };

// This class is responsible for rendering the DOM whenever a change occurs
// in the data or when the user asks for a different page.

class DOMManipulator {
    constructor() {
        this.eventListenersManager = null;
    };

    //Methods list
    setEventListenersManager() { };
    renderStaticSidebar() { };
    renderSidebarProjects() { };
    renderMainProjectPage() { }
    showCheckTask() { };
    renderAddProjectModal() { };
    renderAddTaskModal() { };
    renderEditTaskModal() { };
    renderEditProjectModal() { };
    renderInboxPage() { };
    renderTodayPage() { };
    renderCompletedPage() { };
    removeModal() { };
    createMainTask() { };

    setEventListenersManager(eventListenersManager) {
        this.eventListenersManager = eventListenersManager;
    };

    renderStaticSidebar() {
        const sidebar = document.querySelector(".sidebar");
        const logo = document.createElement("p");
        logo.classList.add("logo");
        logo.textContent = "LOGO";
        const menu = document.createElement("div");
        menu.classList.add("menu");
        const inbox = document.createElement("button");
        inbox.classList.add("inbox");
        const inboxIcon = document.createElement("img");
        inboxIcon.src = inboxPageIcon;
        inboxIcon.alt = "inbox button";
        const inboxP = document.createElement("p");
        inboxP.textContent = "Inbox";
        const today = document.createElement("button");
        today.classList.add("today");
        const todayIcon = document.createElement("img");
        todayIcon.src = todayPageIcon;
        todayIcon.alt = "today button";
        const todayP = document.createElement("p");
        todayP.textContent = "Today";
        const completed = document.createElement("button");
        completed.classList.add("completed");
        const completedIcon = document.createElement("img");
        completedIcon.src = completedPageIcon;
        completedIcon.alt = "completed button";
        const completedP = document.createElement("p");
        completedP.textContent = "Completed";
        const projectsList = document.createElement("div");
        projectsList.classList.add("projects-list");

        inbox.appendChild(inboxIcon);
        inbox.appendChild(inboxP);
        today.appendChild(todayIcon);
        today.appendChild(todayP);
        completed.appendChild(completedIcon);
        completed.appendChild(completedP);

        menu.appendChild(inbox);
        menu.appendChild(today);
        menu.appendChild(completed);
        sidebar.appendChild(logo);
        sidebar.appendChild(menu);
        sidebar.appendChild(projectsList);

        this.eventListenersManager.addStaticSidebarEventListeners();

    };

    renderSidebarProjects(projectsArray) {
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

        projectsArray.forEach((project, projectIndex) => {
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
                const sidebarTaskPriorityImg = document.createElement("img");
                sidebarTaskPriorityImg.src = priorityIcon;
                sidebarTaskPriorityImg.alt = "priority color";
                sidebarTaskPriorityImg.dataset.taskPriority = task.taskPriority;
                sidebarTaskPriorityImg.dataset.isCheck = task.isCompleted;
                const sidebarTaskName = document.createElement("p");
                sidebarTaskName.classList.add("sidebar-task-name");
                sidebarTaskName.textContent = task.taskName;
                sidebarTaskName.dataset.isCheck = task.isCompleted;
                const sidebarTaskCheck = document.createElement("button");
                sidebarTaskCheck.classList.add("sidebar-task-check");
                const sidebarTaskCheckImg = document.createElement("img");
                sidebarTaskCheckImg.src = checkTaskIcon;
                sidebarTaskCheckImg.alt = "check task button";
                sidebarTaskCheckImg.dataset.taskCheck = task.isCompleted;
                // const sidebarTaskEdit = document.createElement("button");
                // sidebarTaskEdit.classList.add("sidebar-task-edit");
                // const sidebarTaskEditImg = document.createElement("img");
                // sidebarTaskEditImg.src = editTaskIcon;
                // sidebarTaskEditImg.alt = "edit task button";
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
                // sidebarTaskEdit.appendChild(sidebarTaskEditImg);
                // sidebarTask.appendChild(sidebarTaskEdit);
                sidebarTaskDelete.appendChild(sidebarTaskDeleteImg);
                sidebarTask.appendChild(sidebarTaskDelete);
                sidebarProject.appendChild(sidebarTask);
            });

            projectList.appendChild(sidebarProject);

        });

        this.eventListenersManager.addSidebarEventListeners();

    };

    renderMainProjectPage(Project, projectIndex) {
        const mainPage = document.querySelector(".main-page");
        mainPage.dataset.mainContent = "project-page"
        mainPage.innerHTML = "";

        const titleBar = document.createElement("div");
        titleBar.classList.add("title-bar");
        titleBar.dataset.projectIndex = projectIndex;
        const titleBarName = document.createElement("p");
        titleBarName.textContent = Project.projectName;
        const titleBarEdit = document.createElement("button");
        titleBarEdit.classList.add("title-bar-edit");
        const titleBarEditImg = document.createElement("img");
        titleBarEditImg.src = editTaskIcon;
        titleBarEditImg.alt = "edit project button";
        const titleBarDelete = document.createElement("button");
        titleBarDelete.classList.add("title-bar-delete");
        const titleBarDeleteImg = document.createElement("img");
        titleBarDeleteImg.src = deleteTaskIcon;
        titleBarDeleteImg.alt = "delete project button";

        titleBar.appendChild(titleBarName);
        titleBarEdit.appendChild(titleBarEditImg);
        titleBarDelete.appendChild(titleBarDeleteImg);
        titleBar.appendChild(titleBarEdit);
        titleBar.appendChild(titleBarDelete);
        mainPage.appendChild(titleBar);

        const bulletBoard = document.createElement("div");
        bulletBoard.classList.add("bullet-board");

        Project.tasks.forEach((task, taskIndex) => {
            const mainTask = this.createMainTask(task, taskIndex, projectIndex);

            bulletBoard.appendChild(mainTask);
        });

        mainPage.appendChild(bulletBoard);

        this.eventListenersManager.addMainpageEventListeners(projectIndex);

    }

    showCheckTask(projectIndex, taskIndex) {

        const projectElement = document.querySelector(`.sidebar-project[data-project-index="${projectIndex}"]`);
        const taskElement = projectElement.querySelector(`.sidebar-task[data-task-index="${taskIndex}"]`);

        // Makes the icons and text change data-attribute and therefore style in the sidebar
        const checkImgElement = taskElement.querySelector(".sidebar-task-check > img");
        const taskNameElement = taskElement.querySelector(".sidebar-task-name");
        const taskPriorityElement = taskElement.querySelector(".sidebar-task-priority > img");
        checkImgElement.dataset.taskCheck = checkImgElement.dataset.taskCheck === "false" ? "true" : "false";
        taskNameElement.dataset.isCheck = taskNameElement.dataset.isCheck === "false" ? "true" : "false";
        taskPriorityElement.dataset.isCheck = taskPriorityElement.dataset.isCheck === "false" ? "true" : "false";


        // Makes the icons and text change data-attribute and therefore style in the project page IF the relative project page is open
        const bulletBoard = document.querySelector(".bullet-board");

        if (bulletBoard !== null) {
            const titleProjectElement = document.querySelector(".title-bar");
            const titleProjectIndex = titleProjectElement.dataset.projectIndex;
            if (titleProjectIndex == projectIndex) {                                // Unfortunately the == is to account for the index sometimes being a string and sometimes an int, but it should overall work
                const mainTask = bulletBoard.querySelector(`.main-task[data-task-index="${taskIndex}"]`);
                const taskPriorityImg = mainTask.querySelector(".task-priority > img");
                const taskNameElement = mainTask.querySelector(".task-name");
                const taskCheckImg = mainTask.querySelector(".task-check > img");
                taskPriorityImg.dataset.isCheck = taskPriorityImg.dataset.isCheck === "false" ? "true" : "false";
                taskNameElement.dataset.isCheck = taskNameElement.dataset.isCheck === "false" ? "true" : "false";
                taskCheckImg.dataset.taskCheck = taskCheckImg.dataset.taskCheck === "false" ? "true" : "false";
            };
        };

        // Makes the icon and the text change data-attribute and therefore style in the Inbox and Today pages IF they're open
        const mainPage = document.querySelector(".main-page");
        if (mainPage.dataset.mainContent === "inbox-page" || mainPage.dataset.mainContent === "today-page" || mainPage.dataset.mainContent === "completed-page") {
            const mainTask = document.querySelector(`.main-task[data-project-index="${projectIndex}"][data-task-index="${taskIndex}"]`);
            if (mainTask !== null) {
                const taskPriorityImg = mainTask.querySelector(".task-priority > img");
                const taskNameElement = mainTask.querySelector(".task-name");
                const taskCheckImg = mainTask.querySelector(".task-check > img");
                taskPriorityImg.dataset.isCheck = taskPriorityImg.dataset.isCheck === "false" ? "true" : "false";
                taskNameElement.dataset.isCheck = taskNameElement.dataset.isCheck === "false" ? "true" : "false";
                taskCheckImg.dataset.taskCheck = taskCheckImg.dataset.taskCheck === "false" ? "true" : "false";
            };
        };

    };

    renderAddProjectModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
                            <div class="modal-content">
                                <input type="text" id="projectNameInput" placeholder="Enter project name" />
                                <button id="addProjectButton">Add</button>
                            </div>
                            `;

        document.body.appendChild(modal);

        this.eventListenersManager.addProjectModalListeners(modal);
    };

    renderAddTaskModal(index) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
                            <div class="modal-content">
                                <input type="text" id="taskNameInput" placeholder="Enter task name" />
                                <textarea id="taskDescriptionInput" placeholder="Enter task description"></textarea>
                                <div>
                                    <label>Priority:</label>
                                    <input type="radio" id="priorityLow" name="taskPriority" value="low" />
                                    <label for="priorityLow">Low</label>
                                    <input type="radio" id="priorityMedium" name="taskPriority" value="medium" />
                                    <label for="priorityMedium">Medium</label>
                                    <input type="radio" id="priorityHigh" name="taskPriority" value="high" />
                                    <label for="priorityHigh">High</label>
                                </div>
                                <input type="date" id="taskDateInput" placeholder="Enter task date" />
                                <button id="addTaskButton">Add</button>
                            </div>
                            `;

        document.body.appendChild(modal);

        this.eventListenersManager.addTaskModalListeners(modal, index);
    };

    renderEditTaskModal(projectIndex, taskIndex, projectsArray) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const date = format(projectsArray[projectIndex].tasks[taskIndex].taskDate, 'yyyy-MM-dd');

        modal.innerHTML = `
                            <div class="modal-content">
                                <input type="text" id="taskNameInput" value="${projectsArray[projectIndex].tasks[taskIndex].taskName}" />
                                <textarea id="taskDescriptionInput">${projectsArray[projectIndex].tasks[taskIndex].taskDescription}</textarea>
                                <div>
                                    <label>Priority:</label>
                                    <input type="radio" id="priorityLow" name="taskPriority" value="low" />
                                    <label for="priorityLow">Low</label>
                                    <input type="radio" id="priorityMedium" name="taskPriority" value="medium" />
                                    <label for="priorityMedium">Medium</label>
                                    <input type="radio" id="priorityHigh" name="taskPriority" value="high" />
                                    <label for="priorityHigh">High</label>
                                </div>
                                <input type="date" id="taskDateInput" value="${date}"/>
                                <button id="editTaskButton">Edit</button>
                            </div>
                            `;
        document.body.appendChild(modal);

        this.eventListenersManager.editTaskModalListeners(modal, projectIndex, taskIndex);

    };

    renderEditProjectModal(projectIndex, projectsArray) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
                            <div class="modal-content">
                                <input type="text" id="projectNameInput" value="${projectsArray[projectIndex].projectName}" />
                                <button id="editProjectButton">Edit</button>
                            </div>
                            `;
        document.body.appendChild(modal);

        this.eventListenersManager.editProjectModalListeners(modal, projectIndex);
    };

    renderInboxPage(orderedTasks, projectsArray) {
        const mainPage = document.querySelector(".main-page");
        mainPage.dataset.mainContent = "inbox-page";
        mainPage.innerHTML = "";

        if (orderedTasks.length === 0) {
            const emptyPageMessage = document.createElement("p");
            emptyPageMessage.classList.add("empty-page-message");
            emptyPageMessage.textContent = "No tasks found :)";
            mainPage.appendChild(emptyPageMessage);
            return;
        };

        let uniqueDays = [];
        for (const task of orderedTasks) {
            const taskDate = format(task.taskDate, 'yyyy-MM-dd');
            if (!uniqueDays.includes(taskDate)) {
                uniqueDays.push(taskDate);
            };
        };

        console.log(uniqueDays);

        let projectIndex;
        let taskIndex;
        // In each iteration it creates a new day-tasks-container
        for (let i = 0; i < uniqueDays.length; i++) {
            const dayTasksContainer = document.createElement("div");
            dayTasksContainer.classList.add("day-tasks-container");
            dayTasksContainer.dataset.taskDate = uniqueDays[i];
            const dayDate = document.createElement("div");
            dayDate.classList.add("day-date");
            const paraDate = document.createElement("p");
            paraDate.textContent = format(uniqueDays[i], 'd MMM, y');
            dayDate.appendChild(paraDate);
            dayTasksContainer.appendChild(dayDate);
            const dayTasks = document.createElement("div");
            dayTasks.classList.add("day-tasks");

            for (let j = 0; j < orderedTasks.length; j++) {
                if (format(orderedTasks[j].taskDate, 'yyyy-MM-dd') === uniqueDays[i]) {
                    // Search orderedTask[j] in projectsArray and save relative projectIndex and taskIndex
                    for (let k = 0; k < projectsArray.length; k++) {
                        for (let l = 0; l < projectsArray[k].tasks.length; l++) {
                            if ((orderedTasks[j].taskName + orderedTasks[j].taskDescription) === (projectsArray[k].tasks[l].taskName + projectsArray[k].tasks[l].taskDescription)) {
                                projectIndex = k;
                                taskIndex = l;
                            };
                        };
                    };
                    const mainTask = this.createMainTask(orderedTasks[j], taskIndex, projectIndex);
                    dayTasks.appendChild(mainTask);
                };
            };

            dayTasksContainer.appendChild(dayTasks);
            mainPage.appendChild(dayTasksContainer);
        };

        this.eventListenersManager.addInboxTodayCompletedPageListeners();
    };

    renderTodayPage(todayTasks, projectsArray) {
        const mainPage = document.querySelector(".main-page");
        mainPage.dataset.mainContent = "today-page";
        mainPage.innerHTML = "";

        console.log(todayTasks);

        // Remove elements from todayTasks that are already completed
        todayTasks = todayTasks.filter(task => task.isCompleted === false);

        console.log(todayTasks);

        if (todayTasks.length === 0) {
            const emptyPageMessage = document.createElement("p");
            emptyPageMessage.classList.add("empty-page-message");
            emptyPageMessage.textContent = "No tasks today :)";
            mainPage.appendChild(emptyPageMessage);
            return;
        };

        // Render top of the page (today's date)
        const todayDateBox = document.createElement("div");
        todayDateBox.classList.add("day-date");
        const todayDate = document.createElement("p");
        todayDate.textContent = format(new Date(), 'd MMM, y');
        todayDateBox.appendChild(todayDate);
        mainPage.appendChild(todayDateBox);

        // Render tasks
        let projectIndex;
        let taskIndex;
        for (let i = 0; i < todayTasks.length; i++) {
            // Search todayTasks[i] in projectsArray and save relative projectIndex and taskIndex
            for (let j = 0; j < projectsArray.length; j++) {
                for (let k = 0; k < projectsArray[j].tasks.length; k++) {
                    if ((todayTasks[i].taskName + todayTasks[i].taskDescription) === (projectsArray[j].tasks[k].taskName + projectsArray[j].tasks[k].taskDescription)) {
                        projectIndex = j;
                        taskIndex = k;
                    };
                };
            };
            const mainTask = this.createMainTask(todayTasks[i], taskIndex, projectIndex);
            mainPage.appendChild(mainTask);
        };

        this.eventListenersManager.addInboxTodayCompletedPageListeners();

    };

    renderCompletedPage(completedTasks, projectsArray) {
        const mainPage = document.querySelector(".main-page");
        mainPage.dataset.mainContent = "completed-page";
        mainPage.innerHTML = "";

        console.log(completedTasks);

        if (completedTasks.length === 0) {
            const emptyPageMessage = document.createElement("p");
            emptyPageMessage.classList.add("empty-page-message");
            emptyPageMessage.textContent = "No task completed :(";
            mainPage.appendChild(emptyPageMessage);
            return;
        };

        // Render top of the page (Completed title)
        const titleBox = document.createElement("div");
        titleBox.classList.add("day-date");
        const title = document.createElement("p");
        title.textContent = "Completed";
        titleBox.appendChild(title);
        mainPage.appendChild(titleBox);

        // Render tasks
        let projectIndex;
        let taskIndex;
        for (let i = 0; i < completedTasks.length; i++) {
            // Search completedTasks[i] in projectsArray and save relative projectIndex and taskIndex
            for (let j = 0; j < projectsArray.length; j++) {
                for (let k = 0; k < projectsArray[j].tasks.length; k++) {
                    if ((completedTasks[i].taskName + completedTasks[i].taskDescription) === (projectsArray[j].tasks[k].taskName + projectsArray[j].tasks[k].taskDescription)) {
                        projectIndex = j;
                        taskIndex = k;
                    };
                };
            };
            const mainTask = this.createMainTask(completedTasks[i], taskIndex, projectIndex);
            mainPage.appendChild(mainTask);
        };

        this.eventListenersManager.addInboxTodayCompletedPageListeners();

    };

    removeModal(modal) {
        modal.remove();
    };

    createMainTask(task, taskIndex, projectIndex) {
        const mainTask = document.createElement("div");
        mainTask.classList.add("main-task");
        mainTask.dataset.taskIndex = taskIndex;
        mainTask.dataset.projectIndex = projectIndex;
        const taskHeader = document.createElement("div");
        taskHeader.classList.add("task-header");
        const taskTop = document.createElement("div");
        taskTop.classList.add("task-top");
        const taskPriority = document.createElement("div");
        taskPriority.classList.add("task-priority");
        const taskPriorityImg = document.createElement("img");
        taskPriorityImg.dataset.taskPriority = task.taskPriority;
        taskPriorityImg.dataset.isCheck = task.isCompleted;
        taskPriorityImg.src = priorityIcon;
        taskPriorityImg.alt = "priority color";
        const taskTitle = document.createElement("p");
        taskTitle.classList.add("task-name");
        taskTitle.dataset.isCheck = task.isCompleted;
        taskTitle.textContent = task.taskName;
        const taskExpDate = document.createElement("div");
        taskExpDate.classList.add("task-date");
        taskExpDate.textContent = format(task.taskDate, 'd MMM, y');
        taskPriority.appendChild(taskPriorityImg);
        taskTop.appendChild(taskPriority);
        taskTop.appendChild(taskTitle);
        taskHeader.appendChild(taskTop);
        taskHeader.appendChild(taskExpDate);
        mainTask.appendChild(taskHeader);
        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = task.taskDescription;
        mainTask.appendChild(taskDescription);
        const taskExpand = document.createElement("button");
        taskExpand.classList.add("task-expand");
        taskExpand.dataset.taskIndex = taskIndex;
        const taskExpandImg = document.createElement("img");
        taskExpandImg.src = expandTaskIcon;
        taskExpandImg.alt = "expand task button";
        taskExpand.appendChild(taskExpandImg);
        mainTask.appendChild(taskExpand);
        const taskButtons = document.createElement("div");
        taskButtons.classList.add("task-buttons");
        const taskDelete = document.createElement("button");
        taskDelete.classList.add("task-delete");
        taskDelete.dataset.taskIndex = taskIndex;
        const taskDeleteImg = document.createElement("img");
        taskDeleteImg.src = deleteTaskIcon;
        taskDeleteImg.alt = "delete task button";
        taskDelete.appendChild(taskDeleteImg);
        taskButtons.appendChild(taskDelete);
        const taskEdit = document.createElement("button");
        taskEdit.classList.add("task-edit");
        taskEdit.dataset.taskIndex = taskIndex;
        const taskEditImg = document.createElement("img");
        taskEditImg.src = editTaskIcon;
        taskEditImg.alt = "edit task button";
        taskEdit.appendChild(taskEditImg);
        taskButtons.appendChild(taskEdit);
        const taskCheck = document.createElement("button");
        taskCheck.classList.add("task-check");
        taskCheck.dataset.taskIndex = taskIndex;
        const taskCheckImg = document.createElement("img");
        taskCheckImg.dataset.taskCheck = task.isCompleted;
        taskCheckImg.src = checkTaskIcon;
        taskCheckImg.alt = "check task button";
        taskCheck.appendChild(taskCheckImg);
        taskButtons.appendChild(taskCheck);
        mainTask.appendChild(taskButtons);
        return mainTask;
    }

};