//from in class example
class HTTPClient {
    static get(url) {
        return fetch(url).then(res => {
            if(!res.ok) {
                throw new Error("error in request");
            }
            return res.json();
        });
    }

    static post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (!res.ok) {
                throw new Error("error in request");
            }
            return res.json();
        });
    }

    static put(url, data) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (!res.ok) {
                throw new Error("Error in PUT request");
            }
            return res.json();
        });
    }

    static delete(url) {
        return fetch(url, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) {
                throw new Error("error in request");
            }
            return res.json();
        });
    }
}

export default HTTPClient;