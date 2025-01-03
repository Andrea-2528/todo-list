import { StateManager } from './StateManager.js';
import { DOMManipulator } from './DOMManipulator.js';
import { EventListenersManager } from './EventListenersManager.js';

export { MainController };

// This is the class responsible for instantiating the other classes and
// setting up the page through initialize.
// When added, this class (together with StateManager) will also deal with localStorage

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
        this.stateManager.addTask(1, "Clean bedroom", "Here's a description", "medium", "2023-02-01");
        this.stateManager.addTask(1, "Buy groceries", "Here's a description", "high", "2023-01-04");
        this.stateManager.addTask(1, "Change light bulb", "Here's a description", "low", "2023-04-03");
        this.stateManager.addTask(2, "Practice guitar", "Here's a description", "low", "2023-10-12");
        this.stateManager.addTask(2, "Code for fun", "Here's a description", "medium", "2023-02-02");
        this.stateManager.checkTask(0, 2);
        console.log(this.stateManager);
        
        this.domManipulator.renderStaticSidebar();
        this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
    };
};