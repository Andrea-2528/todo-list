Project List
            Constructor
                        this.projects = [];
            Methods
                        addProject(projectName)
                        editProject(projectID, newName)
                        deleteProject(projectID)
                        getProjectByID(projectID)
                        getAllProjects()

Project
            Constructor (projectName)
                        this.name (string)
                        this.id (number)
                        this.tasks = [];
            Methods
                        addTask(taskName, taskDescription, taskPriority, taskDate)
                        editTask(taskID, taskName, taskDescription, taskPriority, taskDate)
                        deleteTask(taskID)
                        markAsCompleted(taskID)
                        getTaskByID(taskID)
                        getAllTasks()

Task
            Constructor (taskName, taskDescription, taskPriority, taskDate)
                        this.id (number)
                        this.name (string)
                        this.description (string)
                        this.priority (string) //i.e. "low","medium","high"
                        this.date (string)
                        this.isCompleted (boolean)

StateManager
            Constructor (projectList)
                        this.projectList = projectList;
            Methods
                        addProject(projectName)
                        editProject(projectID, newName)
                        deleteProject(projectID)
                        addTask(projectID, taskName, taskDescription, taskPriority, taskDate)
                        editTask(projectID, taskID, taskName, taskDescription, taskPriority, taskDate)
                        deleteTask(projectID, taskID)
                        markTaskCompleted(projectID, taskID)

DOMManipulator
            Constructor (eventListenersManager)
                        this.eventListenersManager = eventListenersManager;
            Methods
                        renderProjects(projectList)
                        renderTasks(projectID)
                        addProjectToDOM(projectID)
                        addTaskToDOM(projectID,taskID)
                        UpdateTaskInDOM()
                        DeleteTaskFromDOM()
                        "Methods here are just examples and need to be thought out based on final UI"

EventListenersManager
            Constructor (StateManager, DOMManipulator)
                        this.stateManager = stateManager;
                        this.DOMManipulator = DOMManipulator;
            Methods
                        addProjectButtonHandler()
                        addTaskButtonHandler()
                        deleteProjectButtonHandler()
                        deleteTaskButtonHandler()
                        editProjectButtonHandler()
                        editTaskButtonHandler()
                        markAsCompletedButtonHandler()
                        "Again, methods here are just examples and need to be thought out based on final UI"

MainController
            Constructor ()
                        this.projectList = new ProjectList();
                        this.stateManager = new StateManager(this.projectList);
                        this.domManipulator = new DOMManipulator();
                        this.eventListenersManager = new EventListenersManager(this.stateManager, this.domManipulator);
                        this.domManipulator.setEventListenersManager(this.eventListenersManager);                       //This uses a DOMManipulator method
                        
            Methods
                        initialize()
                                    Instantiates StateManager, DOMManipulator and EventListenerManager;
                                    Fetches initial data from localStorage if present;
                                    Uses default data (or localStorage if present) in a call to DOMManipulator to load initial state of page;
                                    Sets up all event listeners through EventListenerManager.

NOTES:
        -   IDs can be set through a statics counter declared as a static class field, in Project for projects and in Task for tasks.
            -   Instead of initializing it to 0, it must be initialized as the max values of the ID's already present in the projectList and taskList (this is needed if data is loaded from localStorage).
        -   The DOMManipulator will have a switch for priorities where it'll set the color based on the string matching the priority.
        -   The DOMManipulator will have a method (more than one) that renders the content of an area based on the data stored in StateManager.
        -   The way icons are implemented at the moment, there's no way to treat them as svg, but only as <img> HTML elements.

<!-- HTML for reference:
```html
    <div class="projects-title">
        <p>Projects</p>
        <button class="add-project">
            <img src="assets/images/add-project.svg" alt="add project button">
        </button>
    </div>
    <div class="sidebar-project">
        <div class="sidebar-project-title">
            <button class="sidebar-project-name">Work</button>
            <button class="sidebar-add-task">
                <img src="assets/images/add-task.svg" alt="add task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Check Inventory</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Prepare meeting</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Do actual work</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
    </div>
    <div class="sidebar-project">
        <div class="sidebar-project-title">
            <button class="sidebar-project-name">Home</button>
            <button class="sidebar-add-task">
                <img src="assets/images/add-task.svg" alt="add task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Clean bedroom</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Buy groceries</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Change light bulb</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
    </div>
    <div class="sidebar-project">
        <div class="sidebar-project-title">
            <button class="sidebar-project-name">Hobbies</button>
            <button class="sidebar-add-task">
                <img src="assets/images/add-task.svg" alt="add task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Practice guitar</p>
            <button class="sideWorkbar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
        <div class="sidebar-task">
            <div class="sidebar-task-priority"><img src="assets/images/priority.svg" alt="priority color"></div>
            <p class="sidebar-task-name">Code for fun</p>
            <button class="sidebar-task-check">
                <img src="assets/images/check.svg" alt="check task button">
            </button>
            <button class="sidebar-task-edit">
                <img src="assets/images/edit.svg" alt="edit task button">
            </button>
            <button class="sidebar-task-delete">
                <img src="assets/images/delete.svg" alt="delete task button">
            </button>
        </div>
    </div>
``` -->