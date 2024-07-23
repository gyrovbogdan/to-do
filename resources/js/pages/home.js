import Api from "../utils/api";
import EventManager from "../utils/eventManager";
import DisplayManager from "../utils/displayManager";
import AppController from "../utils/appController";

const token = $("#api-token").data("token");
const url = "/api/tasks";
const api = new Api(token, url);

const eventManager = new EventManager(api);

const $container = $("#tasks");
const displayManager = new DisplayManager($container);

const appController = new AppController(displayManager, eventManager, api);

$(appController.init());
