import { StateManager } from './StateManager.js';
import { DOMManipulator } from './DOMManipulator.js';
import { EventListenersManager } from './EventListenersManager.js';

export { MainController };

// This is the class responsible for instantiating the other classes and
// setting up the page through initialize.

class MainController {
    constructor() {
        this.stateManager = new StateManager();         // Here the localStorage data is loaded if present ( as method in the constructor of StateManager )
        this.domManipulator = new DOMManipulator();
        this.eventListenersManager = new EventListenersManager(this.stateManager, this.domManipulator);
        this.domManipulator.setEventListenersManager(this.eventListenersManager);
    };

    initialize() {
        this.domManipulator.renderStaticSidebar();
        this.domManipulator.renderSidebarProjects(this.stateManager.getAllProjects());
        this.domManipulator.renderInboxPage(this.stateManager.orderEarliestLatest(this.stateManager.getNotCompletedTasks()), this.stateManager.getAllProjects());
        const inbox = document.querySelector(".inbox");
        inbox.classList.add("clicked");
    };
};