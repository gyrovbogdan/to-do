import TaskTemplates from "./taskTemplates";

class DisplayManager {
    constructor($container) {
        this.$container = $container;
    }

    index(data) {
        this.$container.empty();
        for (const task of data) {
            DisplayManager.renderTask(task, this.$container);
        }
        const $newTask = TaskTemplates.buttonNewTask({
            id: "",
        });
        this.$container.append($newTask);
    }

    static renderTask(task, container) {
        const $content = $(`<li style="margin-left: 20px"></li>`);
        $content.append($(TaskTemplates.task(task)));
        const $chilrenList = $(
            `<ul class="collapse ${task["collapsed"] ? "" : "show"}"
                id="collapse-${task["id"]}"></ul>`
        );
        if (task["children"].length) {
            for (const taskChildren of task["children"]) {
                this.renderTask(taskChildren, $chilrenList);
            }
        }
        $chilrenList.append(TaskTemplates.buttonNewTask(task));
        $content.append($chilrenList);
        container.append($content);
    }

    static closeEditForms() {
        for (const taskForm of $(".update-task-form")) {
            const $taskForm = $(taskForm);

            const id = $taskForm.find("input[name=id]").val().trim();
            const title = $taskForm.find("input[name=title]").val().trim();
            const description = $taskForm
                .find("input[name=description]")
                .val()
                .trim();

            const data = {
                id: id,
                title: title,
                description: description,
            };
            $taskForm.replaceWith(TaskTemplates.task(data));
        }
    }

    static closeCreateForms() {
        for (const taskForm of $(".create-task-form")) {
            const $task = $(taskForm);

            const parentId = $task.find("input[name='parent_id']").val().trim();

            const data = {
                id: parentId,
            };

            $task.replaceWith(TaskTemplates.buttonNewTask(data));
        }
    }

    static renderUpdateForm($task) {
        const id = $task.find("input[name=id]").val().trim();
        const title = $task.find(".title").html().trim();
        const description = $task.find(".description").html().trim();

        const data = {
            id: id,
            title: title,
            description: description,
        };

        const updateForm = TaskTemplates.formUpdate(data);
        $task.replaceWith(updateForm);
    }

    static getFormData($task) {
        const data = {};
        for (const input of $task.find("input")) {
            const $input = $(input);
            data[$input.attr("name")] = $input.val().trim();
        }
        return data;
    }

    static renderSubList(task, $container) {
        const $taskHtml = $(`<li style="margin-left: 20px"></li>`);
        $taskHtml.append($(TaskTemplates.task(task)));
        const $chilrenList = $(
            `<ul class="collapse ${task["collapsed"] ? "" : "show"}"
                id="collapse-${task["id"]}"></ul>`
        );
        $chilrenList.append(TaskTemplates.buttonNewTask(task));
        $taskHtml.append($chilrenList);
        const ul = $container.parent();
        ul.append(
            TaskTemplates.buttonNewTask({
                parentId: task["parent_id"],
            })
        );
        $container.replaceWith($taskHtml);
    }
}

export default DisplayManager;
