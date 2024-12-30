export { EventListenersManager };

// The EventListenersManager has methods to attach event listeners to the DOM
// and it's called whenever a new interactive element is added to the DOM.

class EventListenersManager {
    constructor(stateManager, domManipulator) {
        this.stateManager = stateManager;
        this.domManipulator = domManipulator;
    };

    addSidebarEventListeners() { };
    addProjectModalListeners() { };
    addTaskModalListeners() { };
    editTaskModalListeners() { };

    // TODO
    // This adds event listeners to the sidebar for these actions:
    // Add project, Open project, Add task, Check task, Edit task and Delete task.
    addSidebarEventListeners() {


        // Calls DOMManipulator method to show a modal to insert project name
        const addProjectButton = document.querySelector(".add-project");
        addProjectButton.addEventListener("click", () => {
            this.domManipulator.renderAddProjectModal();
        });

        const openProjectPageButton = document.querySelectorAll(".sidebar-project-name");
        openProjectPageButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderMainPage(index);                                      //TODO: Calls DOMManipulator method to render the main page based on which project clicked
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
                console.log(this.stateManager);
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

    editTaskModalListeners(modal, projectIndex, taskIndex) {
        const editTaskButton = modal.querySelector("#editTaskButton");
        editTaskButton.addEventListener("click", () => {
            const taskName = modal.querySelector("#taskNameInput").value.trim();
            const taskDescription = modal.querySelector("#taskDescriptionInput").value.trim();
            const taskPriority = modal.querySelector('input[name="taskPriority"]:checked')?.value || "low";
            const taskDate = modal.querySelector("#taskDateInput").value.trim();

            this.stateManager.editTask(projectIndex, taskIndex, taskName, taskDescription, taskPriority, taskDate);
            this.domManipulator.removeModal(modal);
            this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
            console.log(this.stateManager);
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                this.domManipulator.removeModal(modal);
            };
        });
    };

};