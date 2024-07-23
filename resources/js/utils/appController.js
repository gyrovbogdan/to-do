class appController {
    constructor(displayManager, eventManager, api) {
        this.displayManager = displayManager;
        this.eventManager = eventManager;
        this.api = api;
    }

    async init() {
        const data = await this.api.index();
        this.displayManager.index(data);
        this.eventManager.init();
    }
}

export default appController;
