class Api {
    constructor(token, url) {
        this.token = token;
        this.url = url;
    }

    index() {
        return $.ajax(
            this.withToken({
                type: "GET",
                url: this.url,
            })
        );
    }

    update(id, data) {
        return $.ajax(
            this.withToken({
                type: "PATCH",
                url: `${this.url}/${id}`,
                data: data,
            })
        );
    }

    create(data) {
        return $.ajax(
            this.withToken({
                type: "POST",
                url: this.url,
                data: data,
            })
        );
    }

    delete(id) {
        return $.ajax(
            this.withToken({
                type: "DELETE",
                url: `${this.url}/${id}`,
            })
        );
    }

    withToken(settings) {
        settings["headers"] = {
            Authorization: "Bearer " + this.token,
        };
        return settings;
    }
}

export default Api;
