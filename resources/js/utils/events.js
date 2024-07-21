import { updateCard, taskElement, createCard } from "./display";

export function editMenuEvents(tasks) {
    $(".btn-update-menu").on("click", function () {
        $(".btn-update-menu").off();
        const $this = $(this);
        const $task = $this.closest(".task");

        const id = $task.find("input[name=id]").val();
        const title = $task.find(".title").html();
        const description = $task.find(".description").html();
        const depth = $task.find("input[name=depth]").val();
        const data = {
            id: id,
            title: title,
            description: description,
            depth: depth,
        };

        const updateCardHtml = updateCard(data);
        $task.replaceWith(updateCardHtml);

        closeUpdateMenuEvents(data, depth, tasks);
        updateEvents(tasks);
    });
}

function closeUpdateMenuEvents(data, depth, tasks) {
    $("#btn-close-edit").on("click", () => {
        const content = taskElement(data, depth);
        $(".update-task").replaceWith(content);
        editMenuEvents(tasks);
    });
}

function updateEvents(tasks) {
    $("#form-update").one("submit", function (e) {
        e.preventDefault();
        console.log(e);
        const $this = $(this);

        const id = $this.find("input[name=id]").val();
        const title = $this.find("input[name=title]").val();
        const description = $this.find("input[name=description]").val();
        const depth = $this.find("input[name=depth]").val();

        tasks.api.update(id, { title: title, description: description });

        const taskHtml = taskElement({
            id: id,
            title: title,
            description: description,
            depth: depth,
        });

        $this.closest(".update-task").replaceWith(taskHtml);
        editMenuEvents(tasks);
    });
}

export function createMenuEvents(tasks) {
    $(".btn-create-menu").on("click", function () {
        $(".btn-create-menu").off();
        $(".btn-update-menu").off();
        const $task = $(this).closest(".task");
        const parentId = $task.find("input[name=id]").val();
        const depth = $task.find("input[name=depth").val();
        const createCardHtml = createCard(Number(depth) + 1, parentId);
        $task.after(createCardHtml);
        createEvents(tasks);
    });
}

export function createEvents(tasks) {
    $("#form-create").on("submit", async function (e) {
        e.preventDefault();

        const $this = $(this);

        const parentId = $this.find("input[name='parent-id']").val();
        const title = $this.find("input[name=title]").val();
        const description = $this.find("input[name=description]").val();
        const depth = $this.find("input[name=depth]").val();

        let task;
        try {
            task = await tasks.api.create({
                title: title,
                description: description,
                parent_id: parentId,
            });
            task["depth"] = depth;
            const taskHtml = taskElement(task);
            $this.closest(".create-task").replaceWith(taskHtml);
        } catch (error) {
            console.log(error.responseJSON.message);
        }

        tasks.eventListeners();
    });
}

export function deleteEvents(tasks) {
    $(".btn-delete").one("click", function () {
        const $task = $(this).closest(".task");
        const id = $task.find("input[name=id]").val();
        tasks.api.delete(id);
        $task.closest("li").remove();
    });
}

export function collapseEvents(tasks) {
    $(".btn-collapse").on("click", function () {
        const $this = $(this);
        const id = $this.closest(".task").find("input[name=id]").val();
        const collapsed = $this.hasClass("collapsed");
        tasks.api.update(id, { collapsed: Number(collapsed) });
    });
}
