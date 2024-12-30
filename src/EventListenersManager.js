export { EventListenersManager };

// The EventListenersManager has methods to attach event listeners to the DOM
// and it's called whenever a new interactive element is added to the DOM.

class EventListenersManager {
    constructor(stateManager, domManipulator) {
        this.stateManager = stateManager;
        this.domManipulator = domManipulator;
    };
    
    addSidebarEventListeners() {
        // This adds event listeners to the sidebar for these actions:
        // Add project, Open project, Add task, Check task, Edit task and Delete task.

        const addProjectButton = document.querySelector(".add-project");
        addProjectButton.addEventListener("click", () => {
            this.domManipulator.renderAddProjectModal();                                        //TODO: Calls DOMManipulator method to show a modal to insert project name
        });

        const openProjectPageButton = document.querySelectorAll(".sidebar-project-name");
        openProjectPageButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderMainPage(index);                                      //TODO: Calls DOMManipulator method to render the main page based on which project clicked
            });
        });

        const addTaskButton = document.querySelectorAll(".sidebar-add-task");
        addTaskButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                this.domManipulator.renderAddTaskModal(index);                                  //TODO: Calls DOMManipulator method to show a modal to insert a new task
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

        const editTaskButton = document.querySelectorAll(".sidebar-task-edit");
        editTaskButton.forEach((button) => {
            button.addEventListener("click", () => {
                const taskIndex = button.closest(".sidebar-task").dataset.taskIndex;
                const projectIndex = button.closest(".sidebar-project").dataset.projectIndex;

                this.domManipulator.renderEditTaskModal(projectIndex, taskIndex);               //TODO: Calls DOMManipulator method to show a modal to edit a task
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



};