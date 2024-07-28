class Api {
    constructor(token, url, query = "") {
        this.token = token;
        this.url = url;
        this.query = query;
    }

    index(query = "") {
        return $.ajax(
            this.withToken({
                type: "GET",
                url: this.url + query,
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

    replace(data) {
        return $.ajax(
            this.withToken({
                type: "POST",
                url: `${this.url}/replace`,
                data: data,
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
