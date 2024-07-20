import { updateCard, taskElement } from "./display";

export function editMenuEvents(tasks) {
    $(".btn-update-menu").on("click", function () {
        $(".btn-update-menu").off("click");
        const $this = $(this);
        const $task = $this.closest(".task");

        const id = $task.find("input[name=id]").val();
        const title = $task.find(".title").html();
        const description = $task.find(".description").html();
        const marginLeft = $task.find('input[name="margin-left"]').val();
        const data = { id: id, title: title, description: description };

        const updateCardHtml = updateCard(data, marginLeft);
        $task.replaceWith(updateCardHtml);

        closeUpdateMenuEvents(data, marginLeft, tasks);
        updateEvents(tasks);
    });
}

function closeUpdateMenuEvents(data, marginLeft, tasks) {
    $("#btn-close-edit").on("click", () => {
        const content = taskElement(data, marginLeft);
        $(".update-task").replaceWith(content);
        editMenuEvents(tasks);
    });
}

function updateEvents(tasks) {
    $("#form-update").on("submit", function (e) {
        e.preventDefault();
        const $this = $(this);

        const id = $this.find("input[name=id]").val();
        const title = $this.find("input[name=title]").val();
        const description = $this.find("input[name=description]").val();
        const marginLeft = $this.find("input[name='margin-left']").val();

        tasks.api.update(id, { title: title, description: description });

        const taskHtml = taskElement(
            {
                id: id,
                title: title,
                description: description,
            },
            marginLeft
        );

        $this.closest(".update-task").replaceWith(taskHtml);
        editMenuEvents(tasks);
    });
}
