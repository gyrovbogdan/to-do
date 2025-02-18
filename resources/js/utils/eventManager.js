import DisplayManager from "./displayManager";
import TaskTemplates from "./taskTemplates";

class EventManager {
    constructor(api, displayManager) {
        this.api = api;
        this.displayManager = displayManager;
    }

    async init() {
        window.isTouch = "ontouchstart" in document.documentElement;
        const tasks = await this.api.index();
        const showDone = await this.api.getShowDone();
        this.displayManager.showDone = Number(showDone);
        this.displayManager.index(tasks);
        this.listeners();
    }

    listeners() {
        this.displayManager.showDoneTasks();
        this.displayManager.collapseButtons();

        this.openEditFormListeners();
        this.openCreateFormListeners();

        this.deleteListeners();
        this.doneListeners();

        this.collapseListeners();
        this.sortableListeners();

        this.collapseAllListeners();
        this.expandAllListeners();
        this.newTaskButtonListeners();
        this.showDoneButtonListeners();
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

                $("#form-update").find("input[name=title]").trigger("focus");
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
                eventManager.listeners();
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

                $("#form-update").find("input[name=title]").trigger("focus");
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
                task["collapsed"] = true;
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
            api.update(id, { done: done }).then(() => eventManager.init());
        });
    }

    sortableListeners() {
        const api = this.api;
        const displayManager = this.displayManager;
        $("ul.sublist").sortable({
            handle: "i.bi-arrows-move",
            group: "nested",
            animation: 100,
            ghostClass: "ghost",
            fallbackOnBody: true,
            forceFallback: true,
            swapThreshold: 0.65,
            onMove: function (evt) {
                if ($(evt.related).children().first().hasClass("new-sub-item"))
                    return -1;
            },
            onEnd: function () {
                const tasks = displayManager.serializeTasks();
                api.replace(tasks);
            },
        });
    }

    collapseAllListeners() {
        const api = this.api;
        $("#collapse-all-btn").on("click", function () {
            $(".btn-collapse").addClass("collapsed");
            $("ul.sublist").removeClass("show");
            api.collapse();
        });
    }

    expandAllListeners() {
        const api = this.api;
        $("#expand-all-btn").on("click", function () {
            $(".btn-collapse").removeClass("collapsed");
            $("ul.sublist").addClass("show");
            api.expand();
        });
    }

    newTaskButtonListeners() {
        const eventManager = this;
        const displayManager = this.displayManager;
        $("#new-task-btn")
            .off()
            .one("click", function () {
                DisplayManager.closeCreateForms();
                DisplayManager.closeEditForms();

                const $this = displayManager.$container
                    .find(".new-sub-item")
                    .last();
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

                $("#form-update").find("input[name=title]").trigger("focus");
            });
    }

    showDoneButtonListeners() {
        const api = this.api;
        const displayManager = this.displayManager;
        $("#show-done-btn")
            .off()
            .on("click", function () {
                const showDone = !displayManager.showDone;
                displayManager.showDone = showDone;
                api.setShowDone(Number(showDone));
                displayManager.showDoneTasks();
            });
    }
}

export default EventManager;
