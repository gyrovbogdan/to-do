class TaskTemplates {
    static formUpdate(task) {
        return `
            <form
                class="p-2  d-flex justify-content-between update-task-form task"
                id="form-update"
            >
                <input class="task-input" name="id" value="${
                    task["id"]
                }" hidden />
                <input class="task-input" name="done" value="${
                    task["done"]
                }" hidden />
                <div class="ps-4 w-100">
                    <div class="d-flex mb-1">
                        <button
                            class="btn btn-dark btn-collapse btn-control py-0 px-1 ${
                                task["collapsed"] ? "collapsed" : ""
                            }"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-${task["id"]}"
                            aria-expanded="${!Boolean(task["collapsed"])}"
                        >
                            <div>
                                <i class="bi bi-caret-right"></i>
                            </div>
                        </button>

                        <input
                            class="text-light-emphasis form-control p-0 task-input"
                            value="${task["title"]}"
                            placeholder="Название задачи"
                            name="title"
                            required
                            
                        />
                    </div>
                    
                    <div class="ps-4">
                        <input
                            class="text-light-emphasis form-control task-input"
                            placeholder="Описание..."
                            name="description"
                            value="${
                                task["description"] ? task["description"] : ""
                            }"></input>
                    </div>
                </div>

                <div class="d-flex flex-column flex-sm-row">
                    <div>
                        <button class="btn btn-dark btn-cancel" type="button">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-dark" type="submit">
                            <i class="bi bi-check-lg"></i>
                        </button>
                    </div>
                </div>
            </form>
        `;
    }

    static formCreate(parentId) {
        return `
            <form
                class="p-2 d-flex justify-content-between create-task-form task"
                id="form-update"
            >
                <input class="task-input" hidden name="parent_id" value="${parentId}" />
                <div class="w-100 ps-5">
                    <input
                        class="text-light-emphasis form-control p-0 task-input mb-1"
                        placeholder="Название задачи"
                        name="title"
                        required
                    />
                    <input
                            class="text-light-emphasis form-control task-input"
                            placeholder="Описание..."
                            name="description">
                    </input>
                </div>
                <div class="d-flex flex-column flex-sm-row">
                    <div>    
                        <button class="btn btn-dark btn-cancel" type="button">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div>
                        <button class="btn btn-dark " type="submit">
                            <i class="bi bi-check-lg"></i>
                        </button>
                    </div>
                </div>
            </form>
        `;
    }

    static task(task) {
        return `
            <div class="p-2  d-flex justify-content-between task">
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
                <div class="w-100">
                    <div class="d-flex">
                        <div>
                            <button
                                class="btn btn-dark btn-control btn-move py-0 px-1"
                            >
                                <i class="bi bi-arrows-move"></i>
                            </button>
                        </div>
                        <div>
                            <button
                                class="btn btn-dark btn-collapse btn-control py-0 px-1 ${
                                    task["collapsed"] ? "collapsed" : ""
                                }"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse-${task["id"]}"
                                aria-expanded="${!Boolean(task["collapsed"])}"
                            >
                            <div>
                                <i class="bi bi-caret-right"></i>
                            </div>
                            </button>
                        </div>
                        <input
                            class="form-check-input me-2 checkbox-done task-input"
                            type="checkbox"
                            name="done"
                            value="${task["done"]}"
                            ${Number(task["done"]) ? "checked" : ""}
                        />
                        <div class="title text-break ${
                            Number(task["done"])
                                ? "text-decoration-line-through text-muted"
                                : ""
                        }">${task["title"]}</div>
                    </div>

                    <div class="ms-5 ps-4 text-light-emphasis description text-break">
                        ${task["description"] ? task["description"] : ""}
                    </div>
                </div>

                <div class="d-flex flex-column flex-sm-row">
                    ${isTouch ? this.buttonsTouch() : this.buttonsNoTouch()}
                </div>
            </div>
        `;
    }

    static buttonsNoTouch() {
        return `
            <div>
                <button class="btn btn-dark btn-update-menu btn-control">
                    <i class="bi bi-pencil"></i>
                </button>
            </div>
            <div>
                <button class="btn btn-dark btn-delete btn-control">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        `;
    }

    static buttonsTouch() {
        return `
        <div class="dropdown btn p-0">
            <button type="button" class="btn" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu z-3">
                <li >
                    <button class="btn btn-dark btn-update-menu btn-control">
                        <i class="bi bi-pencil"></i>  Изменить
                    </button>
                </li>
                <li>
                    <button class="btn btn-dark btn-delete btn-control">
                        <i class="bi bi-trash3"></i>  Удалить
                    </button>
                </li>
            </ul>
        </div>
        `;
    }

    static buttonNewTask(parentId) {
        return `
            <li>
                <div
                    class="py-2  d-flex justify-content-between task new-sub-item"
                >
                    <input class="task-input" hidden name="parent_id" value="${parentId}" />
                    <div class="d-flex text-secondary btn btn-dark">
                        <i class="bi bi-plus-lg"></i>
                        <div class="title">Новый пункт</div>
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
