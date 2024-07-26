class appController {
    constructor(displayManager, eventManager, api) {
        this.displayManager = displayManager;
        this.eventManager = eventManager;
        this.api = api;
    }

    init() {
        this.api.index().done((data) => {
            this.displayManager.index(data);
            this.eventManager.init();
        });
    }
}

export default appController;
