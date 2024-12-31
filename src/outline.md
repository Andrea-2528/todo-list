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

<!-- REFERENCE OF HTML TO BE GENERATED INSIDE div.main-page -->
```html
<div class="main-page">
    <div class="title-bar">
        <p>`ProjectName`</p>
        <button class="title-bar-edit">
            <img src="assets/images/edit.svg" alt="">
        </button>
        <button class="title-bar-delete">
            <img src="assets/images/delete.svg" alt="">
        </button>
    </div>
        <div class="bullet-board">
            <div class="main-task">
                <div class="task-header">
                    <div class="task-top">
                        <div class="task-priority">
                            <img src="assets/images/priority.svg" alt="">
                        </div>
                        <p class="task-name">`TaskName`</p>
                    </div>
                    <div class="task-date">`TaskDate`</div>
                </div>
                <div class="task-description">`TaskDescription`</div>
                <button class="task-expand">
                    <img src="assets/images/arrow-down.svg" alt="">
                </button>
                <div class="task-buttons">
                    <button class="task-delete">
                        <img src="assets/images/delete.svg" alt="">
                    </button>
                    <button class="task-edit">
                        <img src="assets/images/edit.svg" alt="">
                    </button>
                    <button class="task-check">
                        <img src="assets/images/check.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="main-task">
                <div class="task-header">
                    <div class="task-top">
                        <div class="task-priority">
                            <img src="assets/images/priority.svg" alt="">
                        </div>
                        <p class="task-name">`TaskName`</p>
                    </div>
                    <div class="task-date">`TaskDate`</div>
                </div>
                <div class="task-description">`TaskDescription`</div>
                <button class="task-expand">
                    <img src="assets/images/arrow-down.svg" alt="">
                </button>
                <div class="task-buttons">
                    <button class="task-delete">
                        <img src="assets/images/delete.svg" alt="">
                    </button>
                    <button class="task-edit">
                        <img src="assets/images/edit.svg" alt="">
                    </button>
                    <button class="task-check">
                        <img src="assets/images/check.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="main-task">
                <div class="task-header">
                    <div class="task-top">
                        <div class="task-priority">
                            <img src="assets/images/priority.svg" alt="">
                        </div>
                        <p class="task-name">`TaskName`</p>
                    </div>
                    <div class="task-date">`TaskDate`</div>
                </div>
                <div class="task-description">`TaskDescription`</div>
                <button class="task-expand">
                    <img src="assets/images/arrow-down.svg" alt="">
                </button>
                <div class="task-buttons">
                    <button class="task-delete">
                        <img src="assets/images/delete.svg" alt="">
                    </button>
                    <button class="task-edit">
                        <img src="assets/images/edit.svg" alt="">
                    </button>
                    <button class="task-check">
                        <img src="assets/images/check.svg" alt="">
                    </button>
                </div>
            </div>

            <!-- repetitions of #n main-tasks -->

        </div>
</div>    

```