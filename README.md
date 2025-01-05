# TODO List Application

## Live View
[text](https://andrea-2528.github.io/todo-list/)

## Overview
This project is an interactive **TODO List Application** designed to help users  manage their tasks and projects. It includes features like task prioritization, project categorization, and filtering of tasks based on their status and due dates.

The application is built using **HTML**, **CSS**, and **JavaScript**, with modularized code to maintain scalability and readability. The project employs Webpack for bundling and module handling.


## Features
1. **Task Features**
   - Each task as a name, a description, a due date, and a priority level.
   - Add, edit, and delete tasks.
   - Mark tasks as completed.
   - Assign priority levels to tasks (low, medium, high).
   - Set due dates for tasks.
   - Assign task to project.

2. **Project Management**
   - Each project has a name.
   - Create, edit, and delete projects.
   - Categorize tasks under specific projects.
   - View tasks grouped by projects.

3. **Dynamic Filtering**
   - View tasks sorted by:
     - Inbox (all incomplete tasks ordered by date).
     - Today (incomplete tasks due today).
     - Completed tasks.

4. **Persistent State**
   - Automatically saves tasks and projects in `localStorage` for data persistence.

5. **Interactive UI**
   - Sidebar for project navigation.
   - Dynamic rendering of tasks and projects.
   - Modals for adding and editing tasks/projects.
   - All functionality is synchronized between sidebar and main page.


## Application Structure

### 1. **Core Components**

#### `TaskManagement.js`
  - Contains three classes:
  - **`Task`**: Represents an individual task.
  - **`Project`**: Represents a collection of tasks.
  - **`ProjectList`**: Manages a list of projects.

#### `StateManager.js`
- Acts as the application's data layer.
- Manages CRUD operations for tasks and projects.
- Handles saving and loading data to/from `localStorage`.

#### `MainController.js`
- The entry point for initializing the app.
- Manages communication between the `StateManager`, `DOMManipulator`, and `EventListenersManager` classes by initializing them.

#### `DOMManipulator.js`
- Responsible for rendering the DOM dynamically based on the application's state.
- Provides methods to create, update, and delete DOM elements.

#### `EventListenersManager.js`
- Centralized manager for attaching event listeners to dynamically created DOM elements.
- Ensures interactive elements (e.g., buttons) trigger the appropriate actions.

---
### 2. Structure
```
                                  [Index]
                                     ^
                                     |
                                     |
                            +------------------+
                 ---------> |  MainController  |<-----------
                |           +------------------+            |
                |                    ^                      |
                |                    |                      |
        +----------------+           |                      |
  ----> |  StateManager  |           |                      |
 |      +----------------+           |                      |
 |                     |             |                      |
 |                     v             |                      |
+----------------+ +-----------------------+            +---------------------+
| TaskManagement | | EventListenersManager |<---------->|   DOMManipulator    |
+----------------+ +-----------------------+            +---------------------+
           ^                ^                               ^              ^
           |                |                               |              |
            --------        |      -------------------------               |
                    |       |     |                                        |
                    +-------------+                      +---------------------+
                    |   date-fns  |                      |       Assets        |
                    +-------------+                      +---------------------+
```

---

### 3. **Build System**

#### Webpack Configuration
- **`webpack.common.js`**: Contains shared Webpack configurations.
- **`webpack.dev.js`**: Development-specific configurations (e.g., source maps).
- **`webpack.prod.js`**: Production-specific configurations (e.g., optimization).

#### NPM Scripts
- `dev`: Start a development server.
- `build`: Build the project for production.

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Usage
1. Open the application in your browser.
2. Use the **sidebar** to navigate between:
   - Inbox.
   - Today’s tasks.
   - Completed tasks.
   - Specific projects.
3. Add, edit, check or delete tasks and projects using the UI.
