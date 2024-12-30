import addProjectIcon from "./assets/images/add-project.svg";
import addTaskIcon from "./assets/images/add-task.svg";
import priorityIcon from "./assets/images/priority.svg";
import editTaskIcon from "./assets/images/edit.svg";
import deleteTaskIcon from "./assets/images/delete.svg";
import checkTaskIcon from "./assets/images/check.svg";

export { DOMManipulator };

// This class is responsible for rendering the DOM whenever a change occurs
// in the data or when the user asks for a different view.

class DOMManipulator {
    constructor() {
        this.eventListenersManager = null;
    };

    //Methods list
    setEventListenersManager() { };
    renderSidebarProjects() { };
    showCheckTask() { };




    setEventListenersManager(eventListenersManager) {
        this.eventListenersManager = eventListenersManager;
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

        this.eventListenersManager.addSidebarEventListeners();

    };

    showCheckTask(projectIndex, taskIndex) {

        const projectElement = document.querySelector(`.sidebar-project[data-project-index="${projectIndex}"]`);
        const taskElement = projectElement.querySelector(`.sidebar-task[data-task-index="${taskIndex}"]`);

        // Makes the icons and text change data-attribute and therefore style
        const checkImgElement = taskElement.querySelector(".sidebar-task-check > img");
        const taskNameElement = taskElement.querySelector(".sidebar-task-name");
        const taskPriorityElement = taskElement.querySelector(".sidebar-task-priority > img");

        checkImgElement.dataset.taskCheck = checkImgElement.dataset.taskCheck === "false" ? "true" : "false";
        taskNameElement.dataset.isCheck = taskNameElement.dataset.isCheck === "false" ? "true" : "false";
        taskPriorityElement.dataset.isCheck = taskPriorityElement.dataset.isCheck === "false" ? "true" : "false";
    };


};