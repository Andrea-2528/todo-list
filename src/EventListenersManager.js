import { parse } from 'date-fns';
export { EventListenersManager };

// The EventListenersManager has methods to attach event listeners to the DOM
// and it's called whenever a new interactive element is added to the DOM.

class EventListenersManager {
    constructor(stateManager, domManipulator) {
        this.stateManager = stateManager;
        this.domManipulator = domManipulator;
    };

    addSidebarEventListeners() { };
    addMainpageEventListeners() { };
    addProjectModalListeners() { };
    addTaskModalListeners() { };
    editTaskModalListeners() { };
    editProjectModalListeners() { };

    // TODO
    // Load inbox, today or completed
    addStaticSidebarEventListeners() {

        // Calls DOMManipulator method to render the inbox page
        const inboxButton = document.querySelector(".inbox");
        inboxButton.addEventListener("click", () => {
            this.domManipulator.renderInboxPage(this.stateManager.orderEarliestLatest(this.stateManager.getNotCompletedTasks()), this.stateManager.getAllProjects());
        });

        // TODO
        // Calls DOMManipulator method to render the today page
        const todayButton = document.querySelector(".today");
        todayButton.addEventListener("click", () => {
            this.domManipulator.renderTodayPage();                              //TODO
        });

        // TODO
        // Calls DOMManipulator method to render the completed page
        const completedButton = document.querySelector(".completed");
        completedButton.addEventListener("click", () => {
            this.domManipulator.renderCompletedPage();                          //TODO
        });
    };

    // Delete task, Edit task, Check task, Expand task
    addInboxPageListeners() {

        // Calls StateManager to delete task and DOMManipulator to update sidebar and mainpage
        const deleteTaskButton = document.querySelectorAll(".task-delete")
        deleteTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.dataset.taskIndex;
                const projectIndex = button.closest(".main-task").dataset.projectIndex;
                this.stateManager.deleteTask(projectIndex, taskIndex);
                this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
                this.domManipulator.renderInboxPage(this.stateManager.orderEarliestLatest(this.stateManager.getNotCompletedTasks()), this.stateManager.getAllProjects());
            });
        });

        // Calls DOMManipulator method to show a modal to edit a task
        const editTaskButton = document.querySelectorAll(".task-edit");
        editTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.dataset.taskIndex;
                const projectIndex = button.closest(".main-task").dataset.projectIndex;
                this.domManipulator.renderEditTaskModal(projectIndex, taskIndex, this.stateManager.getAllProjects());
            });
        });

        // Calls StateManager method to check the task and calls DOMManipulator method to update the check mark
        const checkTaskButton = document.querySelectorAll(".task-check");
        checkTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.dataset.taskIndex;
                const projectIndex = button.closest(".main-task").dataset.projectIndex;
                this.stateManager.checkTask(projectIndex, taskIndex);
                this.domManipulator.showCheckTask(projectIndex, taskIndex);
            });
        });

        const expandTaskButton = document.querySelectorAll(".task-expand");
        expandTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.dataset.taskIndex;
                const projectIndex = button.closest(".main-task").dataset.projectIndex;
                const task = document.querySelector(`.main-task[data-project-index="${projectIndex}"][data-task-index="${taskIndex}"]`);
                const img = document.querySelector(`.task-expand[data-task-index="${taskIndex}"] > img`);
                task.classList.toggle("expanded");
                img.classList.toggle("expanded");
            });
        });

    };


    // Add project, Open project, Add task, Check task, Edit task and Delete task.
    addSidebarEventListeners() {

        // Calls DOMManipulator method to show a modal to insert project name
        const addProjectButton = document.querySelector(".add-project");
        addProjectButton.addEventListener("click", () => {
            this.domManipulator.renderAddProjectModal();
        });

        // Calls DOMManipulator method to render the main page based on which project clicked
        const openProjectPageButton = document.querySelectorAll(".sidebar-project-name");
        openProjectPageButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(index), index);
            });
        });

        // Calls DOMManipulator method to show a modal to insert a new task
        const addTaskButton = document.querySelectorAll(".sidebar-add-task");
        addTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderAddTaskModal(index);
            });
        });

        // Calls StateManager method to check the task and calls DOMManipulator method to update the check mark
        const checkTaskButton = document.querySelectorAll(".sidebar-task-check");
        checkTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.closest(".sidebar-task").dataset.taskIndex;
                const projectIndex = button.closest(".sidebar-project").dataset.projectIndex;

                this.stateManager.checkTask(projectIndex, taskIndex);
                this.domManipulator.showCheckTask(projectIndex, taskIndex);
            });
        });

        // Calls DOMManipulator method to show a modal to edit a task
        const editTaskButton = document.querySelectorAll(".sidebar-task-edit");
        editTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.closest(".sidebar-task").dataset.taskIndex;
                const projectIndex = button.closest(".sidebar-project").dataset.projectIndex;

                const projectsArray = this.stateManager.getAllProjects();
                this.domManipulator.renderEditTaskModal(projectIndex, taskIndex, projectsArray);
            });
        });

        // Calls StateManager method to delete the task and calls DOMManipulator method to update the sidebar
        const deleteTaskButton = document.querySelectorAll(".sidebar-task-delete");
        deleteTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.closest(".sidebar-task").dataset.taskIndex;
                const projectIndex = button.closest(".sidebar-project").dataset.projectIndex;

                this.stateManager.deleteTask(projectIndex, taskIndex);
                this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
                this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(projectIndex), projectIndex);
            });
        });
    };

    //TODO
    // Edit project, Delete project, Delete task, Edit task, Check task, Expand task
    addMainpageEventListeners(projectIndex) {

        // Calls DOMManipulator method to show a modal to edit project name
        const editProjectButton = document.querySelector(".title-bar-edit");
        editProjectButton.addEventListener("click", () => {
            this.domManipulator.renderEditProjectModal(projectIndex, this.stateManager.getAllProjects());
        });

        //TODO
        // Calls StateManager to delete project and DOMManipulator to render next project in projectList and update sidebar
        const deleteProjectButton = document.querySelector(".title-bar-delete");
        deleteProjectButton.addEventListener("click", () => {
            const index = deleteProjectButton.closest(".title-bar").dataset.projectIndex;
            this.stateManager.deleteProject(index);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
            if (this.stateManager.getAllProjects().length === 0) {
                ////////////////////    RENDER INBOX PAGE ////////////////////// TODO
            } else {
                if (this.stateManager.getProjectByIndex(index)) {
                    this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(index), index);
                } else {
                    this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(index - 1), index - 1);
                }
            }
        });

        // Calls StateManager to delete task and DOMManipulator to update sidebar and mainpage
        const deleteTaskButton = document.querySelectorAll(".task-delete")
        deleteTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.stateManager.deleteTask(projectIndex, index);
                this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
                this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(projectIndex), projectIndex);
            });
        });

        // Calls DOMManipulator method to show a modal to edit a task
        const editTaskButton = document.querySelectorAll(".task-edit");
        editTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderEditTaskModal(projectIndex, index, this.stateManager.getAllProjects());
            });
        });

        // Calls StateManager method to check the task and calls DOMManipulator method to update the check mark
        const checkTaskButton = document.querySelectorAll(".task-check");
        checkTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.stateManager.checkTask(projectIndex, index);
                this.domManipulator.showCheckTask(projectIndex, index);
            });
        });

        const expandTaskButton = document.querySelectorAll(".task-expand");
        expandTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                const task = document.querySelector(`.main-task[data-task-index="${index}"]`);
                const img = document.querySelector(`.task-expand[data-task-index="${index}"] > img`);
                task.classList.toggle("expanded");
                img.classList.toggle("expanded");
            });
        });

    };

    // This adds event listeners to the add project modal
    addProjectModalListeners(modal) {
        const modalButton = modal.querySelector("#addProjectButton");

        modalButton.addEventListener("click", () => {
            const projectName = modal.querySelector("#projectNameInput").value.trim();
            this.stateManager.addProject(projectName);
            this.domManipulator.removeModal(modal);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.domManipulator.removeModal(modal);
            }
        });

    };

    // This adds event listeners to the add task modal
    addTaskModalListeners(modal, index) {
        const addTaskButton = modal.querySelector("#addTaskButton");
        addTaskButton.addEventListener("click", () => {
            const taskName = modal.querySelector("#taskNameInput").value.trim();
            const taskDescription = modal.querySelector("#taskDescriptionInput").value.trim();
            const taskPriority = modal.querySelector('input[name="taskPriority"]:checked')?.value || "low";
            const taskDate = modal.querySelector("#taskDateInput").value.trim();

            this.stateManager.addTask(index, taskName, taskDescription, taskPriority, taskDate);
            this.domManipulator.removeModal(modal);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());

        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.domManipulator.removeModal(modal);
            };
        });

    };

    // This adds event listeners to the edit task modal
    editTaskModalListeners(modal, projectIndex, taskIndex) {
        const editTaskButton = modal.querySelector("#editTaskButton");
        editTaskButton.addEventListener("click", () => {
            const taskName = modal.querySelector("#taskNameInput").value.trim();
            const taskDescription = modal.querySelector("#taskDescriptionInput").value.trim();
            const taskPriority = modal.querySelector('input[name="taskPriority"]:checked')?.value || "low";
            const taskDateString = modal.querySelector("#taskDateInput").value.trim();
            const taskDate = parse(taskDateString, 'yyyy-MM-dd', new Date());

            this.stateManager.editTask(projectIndex, taskIndex, taskName, taskDescription, taskPriority, taskDate);
            this.domManipulator.removeModal(modal);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
            const mainPage = document.querySelector(".main-page");
            if (mainPage.dataset.mainContent === "inbox-page") {
                this.domManipulator.renderInboxPage(this.stateManager.orderEarliestLatest(this.stateManager.getNotCompletedTasks()), this.stateManager.getAllProjects());
            }else if (mainPage.dataset.mainContent === "project-page") {
                this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(projectIndex), projectIndex);                
            }
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.domManipulator.removeModal(modal);
            };
        });
    };

    editProjectModalListeners(modal, projectIndex) {
        const editProjectButton = modal.querySelector("#editProjectButton");
        editProjectButton.addEventListener("click", () => {
            const projectName = modal.querySelector("#projectNameInput").value.trim();
            this.stateManager.editProject(projectIndex, projectName);
            this.domManipulator.removeModal(modal);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
            this.domManipulator.renderMainProjectPage(this.stateManager.getProjectByIndex(projectIndex), projectIndex);
        });
    };

};