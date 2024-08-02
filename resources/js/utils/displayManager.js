import TaskTemplates from "./taskTemplates";

class DisplayManager {
    constructor($container) {
        this.$container = $container;
    }

    index(data) {
        this.$container.empty();
        for (const task of data)
            DisplayManager.renderTask(task, this.$container);
        const $newTask = TaskTemplates.buttonNewTask("");
        this.$container.append($newTask);
    }

    static renderTask(task, $container) {
        const $content = $(`<li></li>`);
        $content.append($(TaskTemplates.task(task)));

        const $chilrenList = $(TaskTemplates.sublist(task));
        if (task["children"])
            for (const taskChildren of task["children"])
                this.renderTask(taskChildren, $chilrenList);

        $chilrenList.append(TaskTemplates.buttonNewTask(task["id"]));

        $content.append($chilrenList);
        $container.append($content);
    }

    static closeEditForms() {
        for (const taskForm of $(".update-task-form")) {
            const $taskForm = $(taskForm);
            const data = DisplayManager.getFormData($taskForm);
            $taskForm.replaceWith(TaskTemplates.task(data));
        }
    }

    static closeCreateForms() {
        for (const taskForm of $(".create-task-form")) {
            const $taskForm = $(taskForm);
            const formData = DisplayManager.getFormData($taskForm);
            $taskForm.replaceWith(
                TaskTemplates.buttonNewTask(formData["parent_id"])
            );
        }
    }

    static renderUpdateForm($task) {
        const data = DisplayManager.getFormData($task);
        const updateForm = TaskTemplates.formUpdate(data);
        $task.replaceWith(updateForm);
    }

    static getFormData($task) {
        const data = {};
        for (const input of $task.find(".task-input")) {
            const $input = $(input);
            data[$input.attr("name")] = $input.val().trim();
        }
        return data;
    }

    static renderSubList(task, $container) {
        const $taskHtml = $(`<li></li>`);

        $taskHtml.append($(TaskTemplates.task(task)));

        const $chilrenList = $(TaskTemplates.sublist(task));
        $taskHtml.append($chilrenList);
        $chilrenList.append(TaskTemplates.buttonNewTask(task["id"]));

        const $sublist = $container.closest("ul");
        $container.remove();
        $sublist.append($taskHtml);

        const parentId = task["parent_id"] == null ? "" : task["parent_id"];
        $sublist.append(TaskTemplates.buttonNewTask(parentId));
    }

    collapseButtons() {
        for (const li of this.$container.find("li")) {
            const $li = $(li);
            if ($li.find("ul").length > 1) {
                const $button = $li.find(".btn-collapse").first();
                $button.addClass("visible");
            }
        }
    }

    showDoneTasks() {
        const $doneTasks = this.$container
            .find("input[name=done][value=1]")
            .closest("li");
        if (this.showDone) {
            $("#show-done-btn").prop("checked", true);
            $doneTasks.show();
        } else $doneTasks.hide();
    }

    serializeTasks() {
        const $ul = this.$container;
        return this.serializeChildren($ul, null);
    }

    serializeChildren($ul, parentId) {
        let tasks = [];
        $ul.children().each((order, li) => {
            const $li = $(li);
            if ($li.children().first().hasClass("new-sub-item")) return;

            const id = $li.find("input[name=id]").first().val();
            const data = {
                id: id,
                parent_id: parentId,
                order: order,
            };
            tasks.push(data);

            const $ul = $li.find("ul").first();
            tasks.push(...this.serializeChildren($ul, data["id"]));
        });
        return tasks;
    }
}

export default DisplayManager;
