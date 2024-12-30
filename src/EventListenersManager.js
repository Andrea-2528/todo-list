export { EventListenersManager };

// The EventListenersManager has methods to attach event listeners to the DOM
// and it's called whenever a new interactive element is added to the DOM.

class EventListenersManager {
    constructor(stateManager, domManipulator) {
        this.stateManager = stateManager;
        this.domManipulator = domManipulator;
    };
};