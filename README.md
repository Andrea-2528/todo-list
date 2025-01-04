# TODO List Application

## Overview
This project is a robust and interactive **TODO List Application** designed to help users efficiently manage their tasks and projects. It includes features like task prioritization, project categorization, and dynamic filtering of tasks based on their status and due dates.

The application is built using **HTML**, **CSS**, and **JavaScript**, with modularized code to maintain scalability and readability. The project employs Webpack for bundling and module handling.

---

## Features
1. **Task Management**
   - Add, edit, and delete tasks.
   - Mark tasks as completed.
   - Assign priority levels to tasks (low, medium, high).
   - Set due dates for tasks.

2. **Project Management**
   - Create, edit, and delete projects.
   - Categorize tasks under specific projects.
   - View tasks grouped by projects.

3. **Dynamic Filtering**
   - View tasks sorted by:
     - Inbox (all incomplete tasks).
     - Today (tasks due today).
     - Completed tasks.

4. **Persistent State**
   - Automatically saves tasks and projects in `localStorage` for data persistence.

5. **Interactive UI**
   - Sidebar for project navigation.
   - Dynamic rendering of tasks and projects.
   - Modals for adding and editing tasks/projects.

---

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
- Manages communication between the `StateManager`, `DOMManipulator`, and `EventListenersManager`.

#### `DOMManipulator.js`
- Responsible for rendering the DOM dynamically based on the application's state.
- Provides methods to create, update, and delete DOM elements.

#### `EventListenersManager.js`
- Centralized manager for attaching event listeners to dynamically created DOM elements.
- Ensures interactive elements (e.g., buttons) trigger the appropriate actions.

---

### 2. **Frontend**

#### `template.html`
- The HTML structure provides a basic layout with sections for:
  - Sidebar.
  - Main content area.

#### `styles.css`
- Contains custom styles for:
  - Sidebar and task/project layouts.
  - Priority-based task styling.
  - Modals and transitions.

---

### 3. **Build System**

#### Webpack Configuration
- **`webpack.common.js`**: Contains shared Webpack configurations.
- **`webpack.dev.js`**: Development-specific configurations (e.g., source maps).
- **`webpack.prod.js`**: Production-specific configurations (e.g., optimization).

#### NPM Scripts
- `dev`: Start a development server.
- `build`: Build the project for production.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-list-app
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

---

## Usage
1. Open the application in your browser.
2. Use the **sidebar** to navigate between:
   - Inbox.
   - Today’s tasks.
   - Completed tasks.
   - Specific projects.
3. Add, edit, or delete tasks and projects using the intuitive UI.

---

## Technical Details

### Modular Design
- Each functionality is encapsulated in its own module to ensure separation of concerns and maintainability.

### Persistent Storage
- Tasks and projects are serialized into JSON and stored in `localStorage`.

### Event-Driven Architecture
- The `EventListenersManager` dynamically attaches event handlers to new DOM elements, ensuring smooth user interactions.

### Styling
- CSS Variables are used for theme consistency.
- Includes a modern CSS reset for cross-browser compatibility.

---

## Future Improvements
- Implement user authentication to allow multiple users.
- Integrate a database for more robust data storage.
- Add drag-and-drop functionality for tasks and projects.
- Enable task notifications/reminders.

---

## Contributing
We welcome contributions to improve this application! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a pull request.

---

## License
This project is licensed under the **ISC License**.

---

## Acknowledgments
- **date-fns**: For date manipulation.
- **Webpack**: For module bundling.

---
