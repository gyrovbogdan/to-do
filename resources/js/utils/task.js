import { showTask } from "./display";
import { editMenuEvents } from "./events";

class Tasks {
    constructor(api) {
        this.api = api;
    }

    async init() {
        const tasksContainer = $("#tasks");
        const tasksData = await this.api.index();

        for (const task of tasksData) {
            showTask(task, tasksContainer);
        }

        editMenuEvents(this);
    }
}

export default Tasks;
