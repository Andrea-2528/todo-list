
<!-- REFERENCE OF HTML TO BE GENERATED INSIDE div.main-page data-main-content="inbox-page" -->
```html
<div class="main-page">

    <div class="day-tasks-container">
        <div class="day-date">
            <p>`Date`</p>
        </div>
        <div class="day-tasks">

            <div class="main-task"> <!-- Main task is structured the same across al variations of "main page" -->
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

            <!-- Here are repetitions of .main-task for each task in the day -->

        </div>
    </div>

    <!-- Here are repetitions of .day-tasks-container for each day with a task -->

</div>
```