import Api from "../utils/api";
import Tasks from "../utils/task";

const token = $("#api-token").data("token");
const url = "/api/tasks";
const api = new Api(token, url);
const tasks = new Tasks(api);

$(tasks.init());
