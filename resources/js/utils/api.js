class Api {
    constructor(token, url, query = "") {
        this.token = token;
        this.url = url;
        this.query = query;
    }

    index() {
        return $.ajax(
            this.withToken({
                type: "GET",
                url: this.url + this.query,
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
                data: { data: data },
            })
        );
    }

    collapse() {
        return $.ajax(
            this.withToken({
                type: "POST",
                url: `${this.url}/collapse`,
            })
        );
    }

    expand() {
        return $.ajax(
            this.withToken({
                type: "POST",
                url: `${this.url}/expand`,
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
