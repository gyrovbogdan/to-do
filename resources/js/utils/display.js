export function showTask(task, container) {
    const $content = $(taskElement(task));
    const $chilrenList = $(
        `<ul class="collapse ${task["collapsed"] ? "" : "show"}" id="collapse-${
            task["id"]
        }"> </ul>`
    );
    if (task["children"].length) {
        for (const taskChildren of task["children"]) {
            showTask(taskChildren, $chilrenList);
        }
    }
    $chilrenList.append(createElement(task));
    $content.append($chilrenList);
    container.append($content);
}

export function showNewTaskForm(depth, container) {
    const createCardHtml = createCard(depth, "");
    container.append(createCardHtml);
}

export const taskElement = (task) => `<li>
    <div
        style="margin-left: ${task["depth"] * 20}px"
        class="p-2 border-bottom d-flex justify-content-between task"
    >
        <input hidden name="depth" value="${task["depth"]}" />
        <input hidden name="id" value="${task["id"]}" />
        <div>
            <div class="d-flex">
                <button class="btn btn-collapse py-0 px-1 ${
                    task["collapsed"] ? "collapsed" : ""
                }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${
    task["id"]
}" aria-expanded="false"><i class="bi bi-caret-right"></i></button>
                <input class="form-check-input me-2" type="checkbox" value="" />
                <div class="title">${task["title"]}</div>
            </div>

            <div class="ms-4 text-light-emphasis description">
                ${task["description"] ? task["description"] : ""}
            </div>
        </div>

        <div>
            <button class="btn btn-update-menu">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-create-menu">
                <i class="bi bi-plus-circle"></i>
            </button>
            <button class="btn btn-delete"><i class="bi bi-trash3"></i></button>
        </div>
    </div>
</li> `;

export const updateCard = (task) => ` <div
    style="margin-left: ${task["depth"] * 20}px"
    class="p-2 border-bottom d-flex justify-content-between update-task"
>
    <div class="card w-100">
        <form id="form-update" onsubmit="return false;">
            <div class="card-body">
                <input hidden name="depth" value="${task["depth"]}" />
                <input hidden name="id" value="${task["id"]}" />
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control fw-medium"
                        placeholder="Название задачи"
                        name="title"
                        value="${task["title"]}"
                    />
                </div>
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Описание задачи"
                        name="description"
                        value="${task["description"]}"
                    />
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-dark" id="btn-close-edit" type="button">
                    Отменить
                </button>
                <button class="btn btn-primary" id="btn-update" type="submit">
                    Изменить
                </button>
            </div>
        </form>
    </div>
</div>`;

export const createCard = (depth, parentId) => ` <div
    style="margin-left: ${depth * 20}px"
    class="p-2 border-bottom d-flex justify-content-between create-task"
>
    <div class="card w-100">
        <form id="form-create" onsubmit="return false;">
            <div class="card-body">
                <input hidden name="depth" value="${depth}" />
                <input hidden name="parent-id" value="${parentId}" />
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control fw-medium"
                        placeholder="Название задачи"
                        name="title"
                    />
                </div>
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Описание задачи"
                        name="description"
                    />
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-dark" id="btn-close-edit" type="button">
                    Отменить
                </button>
                <button class="btn btn-primary" id="btn-update" type="submit">
                    Создать
                </button>
            </div>
        </form>
    </div>
</div>`;

const createElement = (task) => `
    <li>
    <div
        style="margin-left: ${task["depth"] * 20}px"
        class="p-2 border-bottom d-flex justify-content-between task"
    >
        <input hidden name="depth" value="${task["depth"]}" />
        <input hidden name="id" value="${task["id"]}" />
        <div>
            <div class="d-flex">
                <div class="title">Создать новую</div>
            </div>

            <div class="ms-4 text-light-emphasis description">
            </div>
        </div>
    </div>
</li>
`;
