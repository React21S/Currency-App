const apiKey ="a51bea1d9c88abe61af31131";

class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
   

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json())
            .then(data => {
                document.querySelector('#conversion-result').textContent = data['conversion_rates'][targetCurrency.value];
            });
    }

    put(endpoint, body) {
        return this.send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this.send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this.send("delete", endpoint, body);
    }

    send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const baseCurrency = document.querySelector('#base-currency');
const targetCurrency = document.querySelector('#target-currency');

let getCurrency = new FetchWrapper(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/`);

baseCurrency.addEventListener('change', () => {
    getCurrency.get(baseCurrency.value);
})
targetCurrency.addEventListener('change', () => {
    getCurrency.get(baseCurrency.value);
})

