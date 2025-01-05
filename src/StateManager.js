import { ProjectList } from './TaskManagement.js';
export { StateManager };

// The StateManager has methods to call each method in TaskManagement, and every
// other module has to go through the StateManager to access the data

class StateManager {
    constructor() {
        this.projectList = new ProjectList();
        this.loadFromLocalStorage();            // When StateManager is created, load data from localStorage if present
    };

    //Methods list
    addProject() { };
    editProject() { };
    deleteProject() { };
    getProjectByIndex() { };
    getAllProjects() { };
    addTask() { };
    editTask() { };
    deleteTask() { };
    checkTask() { };
    getTaskByIndex() { };
    getAllTasks() { };
    getCompletedTasks() { };
    getNotCompletedTasks() { };
    orderEarliestLatest() { };
    orderLatestEarliest() { };
    getTodayTasks() { };
    saveToLocalStorage() { };
    loadFromLocalStorage() { };

    addProject(projectName) {
        this.projectList.addProject(projectName);
        this.saveToLocalStorage();
    };
    editProject(index, newName) {
        this.projectList.editProject(index, newName);
        this.saveToLocalStorage();
    };
    deleteProject(index) {
        this.projectList.deleteProject(index);
        this.saveToLocalStorage();
    };
    getProjectByIndex(index) {
        return this.projectList.getProjectByIndex(index);
    };
    getAllProjects() {
        return this.projectList.getAllProjects();
    };
    addTask(projectIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].addTask(taskName, taskDescription, taskPriority, taskDate);
        this.saveToLocalStorage();
    };
    editTask(projectIndex, taskIndex, taskName, taskDescription, taskPriority, taskDate) {
        this.projectList.projects[projectIndex].editTask(taskIndex, taskName, taskDescription, taskPriority, taskDate);
        this.saveToLocalStorage();
    };
    deleteTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].deleteTask(taskIndex);
        this.saveToLocalStorage();
    };
    checkTask(projectIndex, taskIndex) {
        this.projectList.projects[projectIndex].checkTask(taskIndex);
        this.saveToLocalStorage();
    };
    getTaskByIndex(projectIndex, taskIndex) {
        return this.projectList.projects[projectIndex].getTaskByIndex(taskIndex);
    };
    getAllTasks(projectIndex) {
        return this.projectList.projects[projectIndex].getAllTasks();
    };

    getCompletedTasks() {
        const completedTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.isCompleted) {
                    completedTasks.push(task);
                };
            });
        });
        return completedTasks;
    };

    getNotCompletedTasks() {
        const notCompletedTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (!task.isCompleted) {
                    notCompletedTasks.push(task);
                };
            });
        });
        return notCompletedTasks;
    };

    orderEarliestLatest(tasks) {
        return tasks.sort((a, b) => a.taskDate - b.taskDate);
    };

    orderLatestEarliest(tasks) {
        return tasks.sort((a, b) => b.taskDate - a.taskDate);
    };

    getTodayTasks() {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const todayTasks = [];
        this.projectList.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.taskDate >= startOfToday && task.taskDate < endOfToday) {
                    todayTasks.push(task);
                };
            });
        });
        return todayTasks;
    };

    saveToLocalStorage() {
        const serializedData = JSON.stringify(this.projectList.projects.map(project => ({
            ...project,
            tasks: project.tasks.map(task => ({
                ...task,
                taskDate: `${task.taskDate.getFullYear()}-${String(task.taskDate.getMonth() + 1).padStart(2, '0')}-${String(task.taskDate.getDate()).padStart(2, '0')}`
            }))
        })));
        localStorage.setItem('todoData', serializedData);
    };

    loadFromLocalStorage() {
        const data = localStorage.getItem('todoData');
        if (data) {
            const projectsArray = JSON.parse(data);
            projectsArray.forEach(projectData => {
                // Add project through StateManager
                this.addProject(projectData.projectName);
                const projectIndex = this.projectList.projects.length - 1;

                projectData.tasks.forEach(taskData => {
                    // Use the date string directly
                    this.addTask(
                        projectIndex,
                        taskData.taskName,
                        taskData.taskDescription,
                        taskData.taskPriority,
                        taskData.taskDate // Pass taskDate directly as 'yyyy-MM-dd'
                    );
                    // Mark the task as completed if applicable
                    if (taskData.isCompleted) {
                        this.checkTask(projectIndex, this.projectList.projects[projectIndex].tasks.length - 1);
                    }
                });
            });
        } else {
            // Add default showcase projects if no data exists
            this.addProject("Work");
            this.addProject("Home");
            this.addProject("Hobbies");
            this.addTask(0, "Showcase Tasks", "Yes, all the descriptions are just fillers and generated through ChatGPT, because I couldn't be bothered.", "low", "2025-01-01");
            this.addTask(0, "Check Inventory", "Undertake a detailed review of your inventory to ensure every item is accounted for and accurately documented. Begin by cross-referencing the existing records with the physical stock, noting any discrepancies such as missing, misplaced, or surplus items. Check for items nearing expiration or requiring replenishment. Document your findings and prepare a comprehensive report, including recommendations for resolving discrepancies and improving the tracking process. A thorough inventory check helps prevent supply chain interruptions and promotes better resource planning.", "low", "2025-01-02");
            this.addTask(0, "Prepare meeting", "Start by drafting a clear agenda outlining the purpose, topics, and desired outcomes of the meeting. Gather and organize relevant materials, including reports, presentations, and supporting documents, ensuring they are accessible and up-to-date. Confirm the attendance of participants and their respective roles, sharing the agenda well in advance. Double-check the meeting logistics, such as venue setup, audio-visual equipment, or virtual conferencing tools. Allocate time for Q&A or open discussion to foster engagement. A well-prepared meeting facilitates productive conversations and actionable results.", "medium", "2025-01-02");
            this.addTask(0, "Do actual work", "Devote your attention to high-priority tasks that directly contribute to your personal or professional objectives. Start by breaking down large projects into smaller, manageable tasks and setting realistic deadlines. Minimize distractions by organizing your workspace and silencing non-essential notifications. Stay focused by working in timed intervals with regular breaks to maintain energy and concentration. Monitor your progress, adjusting priorities as needed, and ensure all deliverables meet the required standards. Consistent and concentrated effort drives success and builds a sense of accomplishment.", "high", "2025-01-03");
            this.addTask(1, "Clean bedroom", "Transform your bedroom into a peaceful and inviting sanctuary by giving it a deep clean. Begin by decluttering, putting away clothes, accessories, and miscellaneous items in their proper places. Dust surfaces, including shelves, furniture, and fixtures, to remove accumulated dirt. Vacuum carpets or mop hardwood floors for a fresh and tidy appearance. Change your bedding and air out the room to enhance cleanliness and comfort. Finally, consider adding a personal touch, such as rearranging decor or adding a calming scent. A clean bedroom boosts mental clarity and promotes restful sleep.", "medium", "2025-02-01");
            this.addTask(1, "Buy groceries", "Plan ahead by creating a comprehensive shopping list, prioritizing essential items such as fresh produce, pantry staples, and household necessities. Check your kitchen inventory to avoid unnecessary purchases and stick to your budget. Visit your preferred store or order online, ensuring the quality and freshness of the items you select. Be mindful of nutritional needs, dietary restrictions, and meal plans for the week. Take the opportunity to explore new ingredients or recipes that add variety to your meals. Efficient grocery shopping saves time, reduces waste, and supports healthier eating habits.", "high", "2025-01-04");
            this.addTask(1, "Change light bulb","Ensure proper lighting in your space by replacing a malfunctioning or dim bulb with a new one. Start by identifying the type and wattage needed for the fixture. Gather any necessary tools, such as a step stool or gloves, for safety. Switch off the power supply to prevent electrical hazards. Carefully remove the old bulb, inspecting the socket for dirt or damage. Insert the new bulb securely and test its functionality. Dispose of the old bulb responsibly, recycling it if possible. Regular maintenance like this improves the ambiance and safety of your environment.", "low", "2025-01-04");
            this.addTask(2, "Practice guitar","Dedicate focused time to honing your guitar skills and exploring new musical possibilities. Begin with warm-up exercises such as scales, finger-picking drills, or chord transitions to improve dexterity and technique. Practice your favorite songs or experiment with new ones, incorporating challenging sections to push your limits. Explore diverse music genres to expand your repertoire and creativity. Record and review your sessions to track progress and identify areas for improvement. Consistent practice builds confidence, refines your skills, and deepens your passion for music.", "low", "2025-02-02");
            this.addTask(2, "Code for fun", "Immerse yourself in creative coding projects to spark innovation and enjoyment. Choose an idea that excites you, whether it’s a game, a utility tool, or an artistic visual. Experiment with new programming languages, libraries, or frameworks to broaden your technical expertise. Work on coding puzzles or challenges that test your problem-solving abilities. Share your projects with peers or an online community for feedback and inspiration. This task not only sharpens your skills but also fosters a deeper connection to programming as a source of creativity and joy.", "medium", "2025-01-04");
            this.checkTask(0, 2);
            this.checkTask(1, 1);
            this.checkTask(2, 0);
            alert("- Failed to load data (localStorage is empty)\n- Default showcase projects have been added.\n- Feel free to delete them or play around.\n- This message will no longer appear.");
        }
    };

};