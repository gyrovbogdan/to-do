class TaskTemplates {
    static formUpdate(task) {
        return `
<form
    style="margin-left: ${Number(task["depth"]) * 20}px"
    class="p-2 border-bottom d-flex justify-content-between update-task-form"
    id="form-update"
>
    <input hidden name="depth" value="${task["depth"]}" />
    <input hidden name="id" value="${task["id"]}" />
    <div>
        <div class="d-flex">
            <button
                class="btn btn-collapse py-0 px-1 ${
                    task["collapsed"] ? "collapsed" : ""
                }"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse-${task["id"]}"
                aria-expanded="false"
            >
                <i class="bi bi-caret-right"></i>
            </button>
            <input
                class="form-check-input me-2"
                type="checkbox"
                value=""
            />
            <input 
            class="text-light-emphasis form-control p-0" 
            value="${task["title"]}"
            pleceholder="Название задачи"
            name="title"
        >
        </div>

        <input 
            class="ms-4 text-light-emphasis form-control p-0 my-2" 
            value="${task["description"]}"
            pleceholder="Название задачи"
            name="description"
        >
    </div>

    <div>
        <button class="btn">
            <i class="bi bi-check-lg"></i>
        </button>
    </div>
</form>`;
    }

    static formCreate(depth, parentId) {
        return `
<li class="create-task-form">
    <form
        style="margin-left: ${(Number(depth) + 1) * 20}px"
        class="p-2 border-bottom d-flex justify-content-between"
        id="form-update"
    >
        <input hidden name="depth" value="${depth}" />
        <input hidden name="parent_id" value="${parentId}" />
        <div>
            <div class="d-flex">
                <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                />
                <input 
                class="text-light-emphasis form-control p-0" 
                pleceholder="Название задачи"
                name="title"
            >
            </div>

            <input 
                class="ms-4 text-light-emphasis form-control p-0 my-2" 
                pleceholder="Название задачи"
                name="description"
            >
        </div>

        <div>
            <button class="btn">
                <i class="bi bi-check-lg"></i>
            </button>
        </div>
    </form>
</li>`;
    }

    static task(task) {
        return `
    <div
        style="margin-left: ${Number(task["depth"]) * 20}px"
        class="p-2 border-bottom d-flex justify-content-between task"
    >
        <input hidden name="title" value="${task["title"]}" />
        <input hidden name="description" value="${task["description"]}" />
        <input hidden name="depth" value="${task["depth"]}" />
        <input hidden name="id" value="${task["id"]}" />
        <div>
            <div class="d-flex">
                <button
                    class="btn btn-collapse py-0 px-1 ${
                        task["collapsed"] ? "collapsed" : ""
                    }"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-${task["id"]}"
                    aria-expanded="false"
                >
                    <i class="bi bi-caret-right"></i>
                </button>
                <input
                    class="form-check-input me-2"
                    type="checkbox"
                    value=""
                />
                <div class="title">${task["title"]}</div>
            </div>

            <div class="ms-4 text-light-emphasis description">${
                task["description"] ? task["description"] : ""
            }</div>
        </div>

        <div>
            <button class="btn btn-update-menu">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-delete">
                <i class="bi bi-trash3"></i>
            </button>
        </div>
    </div>`;
    }

    static buttonNewTask(task) {
        return `
<li class="new-sub-item">
    <div
        style="margin-left: ${(Number(task["depth"]) + 1) * 20}px"
        class="p-2 border-bottom d-flex justify-content-between task"
    >
        <input hidden name="depth" value="${Number(task["depth"])}" />
        <input hidden name="parent_id" value="${task["id"]}" />
        <div>
            <div class="d-flex text-secondary">
                <i class="bi bi-plus-lg mx-2"></i>    
                <div class="title">Новый пункт</div>
            </div>
        </div>
    </div>
</li>`;
    }
}

export default TaskTemplates;
