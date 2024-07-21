import { showTask, showNewTaskForm } from "./display";
import {
    editMenuEvents,
    createMenuEvents,
    createEvents,
    deleteEvents,
    collapseEvents,
} from "./events";

class Tasks {
    constructor(api) {
        this.api = api;
    }

    async init() {
        const $tasksContainer = $("#tasks");
        $tasksContainer.empty();
        const tasksData = await this.api.index();

        for (const task of tasksData) {
            showTask(task, $tasksContainer);
        }
        showNewTaskForm(0, $tasksContainer);

        this.eventListeners();
    }

    eventListeners() {
        editMenuEvents(this);
        createMenuEvents(this);
        createEvents(this);
        deleteEvents(this);
        collapseEvents(this);
    }
}

export default Tasks;
