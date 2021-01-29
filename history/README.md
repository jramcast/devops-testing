# History

This microservice provides a historical currency exchange data based on the
input payload.

It has only one payload on the endpoint `/` that expects a JSON in the following
format:

```JSON
{
  "source": "USD",
  "target": "EUR"
}
```
The return value is, for example:

```JSON
[
  {
    "value": "0.9",
    "date": "2020-08-07T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.91",
    "date": "2020-08-06T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.92",
    "date": "2020-08-05T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.93",
    "date": "2020-08-04T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.92",
    "date": "2020-08-03T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.91",
    "date": "2020-08-02T11:14:30.935Z",
    "sign": null,
    "name": null
  },
  {
    "value": "0.95",
    "date": "2020-08-01T11:14:30.935Z",
    "sign": null,
    "name": null
  }
]
```

Date is updated based on the current date. Values are taken from the
`lib/constants.js` file. Only `EUR` and `USD` values are supported.

## Deployment

To deploy the `history` application to OpenShift, see `../kubefiles/history.yml`
deployment file.
