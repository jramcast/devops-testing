import { Card, CardTitle } from "@patternfly/react-core";
import React from "react";
import Currency from "../models/Currency";

export function ConversionDisplay(props: {
    currency: Currency;
    value: number;
}) {
    const convertedValue = parseFloat(props.currency.value) * props.value;
    return (
        <Card>
            <CardTitle>{`${props.currency.sign}${convertedValue}`}</CardTitle>
        </Card>
    );
}
