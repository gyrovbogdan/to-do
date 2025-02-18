import Api from "../utils/api";
import EventManager from "../utils/eventManager";
import DisplayManager from "../utils/displayManager";

const token = $("#api-token").data("token");
const url = "/api/tasks";
const api = new Api(token, url);

const $container = $("#tasks");
const displayManager = new DisplayManager($container);

const eventManager = new EventManager(api, displayManager);

$(eventManager.init());
