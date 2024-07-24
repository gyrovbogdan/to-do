import DisplayManager from "./displayManager";
import TaskTemplates from "./taskTemplates";

class EventManager {
    constructor(api) {
        this.api = api;
    }

    init() {
        this.openEditFormListeners();
        this.collapseListeners();
        this.deleteListeners();
        this.openCreateFormListeners();
    }

    openEditFormListeners() {
        const eventManager = this;
        $(".btn-update-menu")
            .off()
            .one("click", function () {
                const $task = $(this).closest(".task");
                const $buffer = $task;

                DisplayManager.closeEditForms();
                DisplayManager.closeCreateForms();

                DisplayManager.renderUpdateForm($task);
                eventManager.cancelChangesListeners($buffer);
                eventManager.submitUpdateListeners();

                eventManager.init();
            });
    }

    cancelChangesListeners(buffer) {
        const eventManager = this;
        $(".btn-cancel").one("click", function () {
            $(this).closest("form").replaceWith(buffer);
            eventManager.init();
        });
    }

    submitUpdateListeners() {
        const api = this.api;
        const eventManager = this;
        $("#form-update").on("submit", function (e) {
            e.preventDefault();
            const $this = $(this);
            const formData = DisplayManager.getFormData($this);

            api.update(formData["id"], {
                title: formData["title"],
                description: formData["description"],
            })
                .done(() => {
                    const taskHtml = TaskTemplates.task(formData);
                    $this.replaceWith(taskHtml);
                    eventManager.submitUpdateListeners();
                    eventManager.init();
                })
                .fail((error) => console.log(error));
        });
    }

    collapseListeners() {
        const api = this.api;
        $(".btn-collapse")
            .off()
            .on("click", function () {
                const $this = $(this);
                const { id } = DisplayManager.getFormData(
                    $this.closest(".task")
                );
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
                const { id } = DisplayManager.getFormData($task);
                api.delete(id).done(() => $task.closest("li").remove());
                DisplayManager.closeCreateForms();
                DisplayManager.closeEditForms();
            });
    }

    openCreateFormListeners() {
        const eventManager = this;
        $(".new-sub-item")
            .off()
            .one("click", function () {
                DisplayManager.closeCreateForms();
                DisplayManager.closeEditForms();

                const $this = $(this);
                const $task = $this.closest("li");
                const buffer = $task.html();
                const formData = DisplayManager.getFormData($task);

                const taskHtml = TaskTemplates.formCreate(
                    formData["parent_id"]
                );
                $this.replaceWith(taskHtml);

                eventManager.cancelChangesListeners(buffer);
                eventManager.submitCreateListeners();
                eventManager.init();
            });
    }

    submitCreateListeners() {
        const api = this.api;
        const eventManager = this;

        $(".create-task-form").on("submit", async function (e) {
            e.preventDefault();

            const $this = $(this);

            const formData = DisplayManager.getFormData($this);

            api.create(formData).done((task) => {
                const $taskContainer = $this.closest("li");
                DisplayManager.renderSubList(task, $taskContainer);
                eventManager.init();
            });
        });
    }
}

export default EventManager;
