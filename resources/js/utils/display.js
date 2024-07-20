export function showTask(task, container) {
    const marginLeft = task["depth"] * 20;
    const content = taskElement(task, marginLeft);
    container.append(content);
    if (task["children"]) {
        for (const taskChildren of task["children"]) {
            showTask(taskChildren, container);
        }
    }
}

export const taskElement = (task, marginLeft) => `
    <div style="margin-left: ${marginLeft}px" class="p-2 border-bottom d-flex justify-content-between task">
        <input hidden name="margin-left" value="${marginLeft}">
        <input hidden name="id" value="${task["id"]}">
        <div>
            <div class="d-flex">
                <input class="form-check-input me-2" type="checkbox" value="">
                <div class="title">${task["title"]}</div>
            </div>
            
            <div class="ms-4 text-light-emphasis description">${
                task["description"] ? task["description"] : ""
            }</div>
        </div>

        <div>
            <button class="btn btn-update-menu"><i class="bi bi-pencil"></i></button>
            <button class="btn"><i class="bi bi-plus-circle"></i></button>
            <button class="btn"><i class="bi bi-trash3"></i></button>
        </div>
    </div>`;

export const updateCard = (task, marginLeft) => `
    <div style="margin-left: ${marginLeft}px" class="p-2 border-bottom d-flex justify-content-between update-task">
        <div class="card w-100">
            <form id="form-update">
                <div class="card-body">
                    <input hidden name="margin-left" value="${marginLeft}">
                    <input hidden name="id" value="${task["id"]}">
                    <div class="mb-3">
                        <input type="text" class="form-control fw-medium" placeholder="Название задачи" name="title" value="${task["title"]}">
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Описание задачи" name="description" value="${task["description"]}">
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-dark" id="btn-close-edit" type="button"> Отменить </button>
                    <button class="btn btn-primary" id="btn-update" type="submit"> Изменить </button>
                </div>
            </form> 
        </div>
    </div>`;
