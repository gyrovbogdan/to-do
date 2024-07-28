import DisplayManager from "./displayManager";
import TaskTemplates from "./taskTemplates";

class EventManager {
    constructor(api, displayManager) {
        this.api = api;
        this.displayManager = displayManager;
    }

    async init() {
        const tasks = await this.api.index();
        this.displayManager.index(tasks);

        const doneTasks = await this.api.index("?done=1");
        this.displayManager.indexDone(doneTasks);

        this.listeners();
    }

    listeners() {
        this.displayManager.collapseButtons();
        this.openEditFormListeners();
        this.collapseListeners();
        this.deleteListeners();
        this.openCreateFormListeners();
        this.doneListeners();
        this.sortableListeners();
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

                eventManager.listeners();
            });
    }

    cancelChangesListeners(buffer) {
        const eventManager = this;
        $(".btn-cancel").one("click", function () {
            $(this).closest("form").replaceWith(buffer);
            eventManager.listeners();
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
                .done((data) => {
                    const taskHtml = TaskTemplates.task(formData);
                    $this.replaceWith(taskHtml);
                    eventManager.submitUpdateListeners();
                    eventManager.listeners();
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
        const eventManager = this;
        $(".btn-delete")
            .off()
            .one("click", function () {
                const $task = $(this).closest(".task");
                const { id } = DisplayManager.getFormData($task);
                api.delete(id).done(() => $task.closest("li").remove());
                eventManager.init();
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
                eventManager.listeners();
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
                eventManager.listeners();
            });
        });
    }

    doneListeners() {
        const api = this.api;
        const eventManager = this;
        $(".checkbox-done").on("click", function () {
            const $this = $(this);
            const $task = $this.closest(".task");
            const { id } = DisplayManager.getFormData($task);
            const done = Number($this.is(":checked"));
            api.update(id, { done: done });
            eventManager.init();
        });
    }

    sortableListeners() {
        const api = this.api;
        const displayManager = this.displayManager;
        $("ul.sublist").sortable({
            handle: "i.bi-arrows-move",
            group: "nested",
            animation: 200,
            ghostClass: "ghost",
            fallbackOnBody: true,
            swapThreshold: 0.65,
            onMove: function (evt) {
                $("ul.sublist").removeClass("active");
                $(evt.related).parent().addClass("active");
            },
            onEnd: function (evt) {
                $("ul.sublist").removeClass("active");
                const tasks = displayManager.serializeTasks();
                console.log(tasks);
                api.replace(tasks);
            },
        });
    }
}

export default EventManager;
