
const rates = {

    "USD_TO_EUR": [
        {"value": 0.90},
        {"value": 0.91},
        {"value": 0.92},
        {"value": 0.93},
        {"value": 0.92},
        {"value": 0.91},
        {"value": 0.95},
    ],

    "EUR_TO_USD": [
        {"value": 1.11},
        {"value": 1.1},
        {"value": 1.09},
        {"value": 1.08},
        {"value": 1.09},
        {"value": 1.1},
        {"value": 1.05}
    ]

};


function load(key) {
    return rates[key];
}

module.exports = {
    load
};
