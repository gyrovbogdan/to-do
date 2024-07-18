function showTask(task, container) {
    const id = `task-${task["id"]}`;
    const leftMargin = task["depth"] * 20;
    const content = `
    <div id="${id}">
        <div style="margin-left: ${leftMargin}px">
        <p>
        <input class="form-check-input mx-2" type="checkbox" value="" id="check-${id}">
        <label class="form-check-label" for="check-${id}">
            ${task["title"]}
        </label>
        </p>
        <p>
            ${task["description"] ? task["description"] : ""}
        </p>
        <hr>
    </div>
    `;

    container.append(content);
    if (task["children"]) {
        for (const taskChildren of task["children"]) {
            showTask(taskChildren, $(`#${id}`));
        }
    }
}

async function init() {
    const tasksContainer = $("#tasks");
    const token = $("#api-token").data("token");

    const tasks = await $.ajax({
        type: "GET",
        url: "/api/tasks",
        data: "dat",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    for (const task of tasks) {
        showTask(task, tasksContainer);
    }
}

init();
