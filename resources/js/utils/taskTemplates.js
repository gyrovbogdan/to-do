class TaskTemplates {
    static formUpdate(task) {
        return `
            <form
                class="p-2 border-bottom d-flex justify-content-between update-task-form"
                id="form-update"
            >
                <input class="task-input" name="id" value="${
                    task["id"]
                }" hidden />
                <input class="task-input" name="done" value="${
                    task["done"]
                }" hidden />
                <div class="w-80 ">
                    <div class="d-flex mb-1">
                        <button
                            class="btn btn-collapse py-0 px-1 btn-collapse ${
                                task["collapsed"] ? "collapsed" : ""
                            }"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-${task["id"]}"
                            aria-expanded="${!Boolean(task["collapsed"])}"
                        >
                            <i class="bi bi-caret-right"></i>
                        </button>

                        <input
                            class="text-light-emphasis form-control p-0 task-input"
                            value="${task["title"]}"
                            placeholder="Название задачи"
                            name="title"
                            required
                            autofocus
                        />
                    </div>

                    <textarea
                        class="form-control ms-4 task-input"
                        placeholder="Описание..."
                        name="description"
                    >${
                        task["description"] ? task["description"] : ""
                    }</textarea>
                </div>

                <div>
                    <button class="btn btn-cancel" type="button">
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <button class="btn" type="submit">
                        <i class="bi bi-check-lg"></i>
                    </button>
                </div>
            </form>
        `;
    }

    static formCreate(parentId) {
        return `
            <form
                class="p-2 border-bottom d-flex justify-content-between create-task-form"
                id="form-update"
            >
                <input class="task-input" hidden name="parent_id" value="${parentId}" />
                <div>
                    <input
                        class="text-light-emphasis form-control p-0 task-input mb-1"
                        placeholder="Название задачи"
                        name="title"
                        required
                        autofocus
                    />

                    <textarea
                        class="form-control task-input"
                        placeholder="Описание..."
                        name="description"
                    ></textarea>
                </div>
                <div>
                    <button class="btn btn-cancel" type="button">
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <button class="btn" type="submit">
                        <i class="bi bi-check-lg"></i>
                    </button>
                </div>
            </form>
        `;
    }

    static task(task) {
        return `
            <div class="p-2 border-bottom d-flex justify-content-between task">
                <input class="task-input" hidden name="title" value="${
                    task["title"]
                }" />
                <input
                    class="task-input"
                    hidden
                    name="description"
                    value="${task["description"] ? task["description"] : ""}"
                />
                <input class="task-input" hidden name="id" value="${
                    task["id"]
                }" />
                <div>
                    <div class="d-flex">
                        <button
                            class="btn btn-collapse py-0 px-1 btn-collapse ${
                                task["collapsed"] ? "collapsed" : ""
                            }"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-${task["id"]}"
                            aria-expanded="${!Boolean(task["collapsed"])}"
                        >
                            <i class="bi bi-caret-right"></i>
                        </button>
                        <input
                            class="form-check-input me-2 checkbox-done"
                            type="checkbox"
                            name="done"
                            value="${task["done"]}"
                            ${task["done"] ? "checked" : ""}
                        />
                        <div class="title">${task["title"]}</div>
                    </div>

                    <div class="ms-4 text-light-emphasis description">
                        ${task["description"] ? task["description"] : ""}
                    </div>
                </div>

                <div class="control-btn">
                    <button class="btn btn-update-menu">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-delete">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
        `;
    }

    static buttonNewTask(parentId) {
        return `
            <li>
                <div
                    class="p-2 border-bottom d-flex justify-content-between task new-sub-item"
                >
                    <input class="task-input" hidden name="parent_id" value="${parentId}" />
                    <div>
                        <div class="d-flex text-secondary">
                            <i class="bi bi-plus-lg mx-2"></i>
                            <div class="title">Новый пункт</div>
                        </div>
                    </div>
                </div>
            </li>
        `;
    }

    static sublist(task) {
        return `<ul
            class="sublist collapse ${task["collapsed"] ? "" : "show"}"
            id="collapse-${task["id"]}"
        ></ul>`;
    }
}

export default TaskTemplates;
