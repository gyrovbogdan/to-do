import DisplayManager from "./displayManager";
import TaskTemplates from "./taskTemplates";

class EventManager {
    constructor(api) {
        this.api = api;
    }

    init() {
        this.editFormListeners();
        this.collapseListeners();
        this.deleteListeners();
        this.newSubListListeners();
    }

    editFormListeners() {
        const eventManager = this;
        $(".btn-update-menu")
            .off()
            .one("click", function () {
                const $task = $(this).closest(".task");
                DisplayManager.closeEditForms();
                DisplayManager.closeCreateForms();
                DisplayManager.renderUpdateForm($task);
                eventManager.updateFormListeners();
                eventManager.init();
            });
    }

    updateFormListeners() {
        const api = this.api;
        const eventManager = this;
        $("#form-update").on("submit", function (e) {
            e.preventDefault();
            const $this = $(this);
            const task = DisplayManager.getFormData($this);

            try {
                api.update(task["id"], {
                    title: task["title"],
                    description: task["description"],
                });
                const taskHtml = TaskTemplates.task(task);
                $this.replaceWith(taskHtml);
                eventManager.updateFormListeners();
            } catch (error) {
                console.log(error);
            }

            eventManager.init();
        });
    }

    collapseListeners() {
        const api = this.api;
        $(".btn-collapse")
            .off()
            .on("click", function () {
                const $this = $(this);
                const id = $this.closest(".task").find("input[name=id]").val();
                const collapsed = $this.hasClass("collapsed");
                api.update(id, { collapsed: Number(collapsed) });
            });
    }

    deleteListeners() {
        const api = this.api;
        $(".btn-delete")
            .off()
            .one("click", function () {
                const $task = $(this).closest(".task");
                const id = $task.find("input[name=id]").val();
                api.delete(id);
                $task.closest("li").remove();
            });
    }

    newSubListListeners() {
        const eventManager = this;
        $(".new-sub-item")
            .off()
            .one("click", function () {
                DisplayManager.closeCreateForms();
                DisplayManager.closeEditForms();

                const $this = $(this);
                const $task = $this.closest("li");
                const parentId = $task.find("input[name='parent_id']").val();
                const depth = Number($task.find("input[name=depth").val());

                const taskHtml = TaskTemplates.formCreate(depth, parentId);
                $this.replaceWith(taskHtml);

                eventManager.createTaskListeners();
                eventManager.init();
            });
    }

    createTaskListeners() {
        const api = this.api;
        const eventManager = this;

        $(".create-task-form").on("submit", async function (e) {
            e.preventDefault();
            const $this = $(this);
            const formData = DisplayManager.getFormData($this);
            const { depth } = formData;
            const task = await api.create({
                title: formData["title"],
                description: formData["description"],
                parent_id: formData["parent_id"],
            });
            task["depth"] = Number(depth) - 1;
            DisplayManager.renderSubList(task, $this);
            eventManager.init();
        });
    }
}

export default EventManager;
