import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    Button,
    Flex,
    FlexItem,
    Title,
} from "@patternfly/react-core";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { ScatterLineChart } from "../components/ScatterLineChart";

import Currency from "../models/Currency";
import { getCurrencies, getHistoricalData } from "../services/CurrencyService";

export function HistoricalDataForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [exchangeData, setExchangeData] = useState<Currency[]>();

    // form data
    const [currencies, setCurrencies] = useState<string[]>([]);

    // form values
    const [source, setSource] = useState<string>("Loading currencies");
    const [target, setTarget] = useState<string>("Loading currencies");

    useEffect(() => {
        setIsLoading(true);
        getCurrencies().then((currencies) => {
            setCurrencies(currencies);
            setSource(currencies[0]);
            setTarget(currencies[1]);
            setIsLoading(false);
        });
    }, []);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setExchangeData(await getHistoricalData({ source, target }));
        setIsLoading(false);
    }

    const currencyOptions = isLoading ? (
        <FormSelectOption isDisabled={true} label="Loading currencies" />
    ) : (
        currencies.map((curr, index) => (
            <FormSelectOption key={index} value={curr} label={curr} />
        ))
    );

    return (
        <>
            <Title headingLevel="h1">Historical Currency Data</Title>
            <Form onSubmit={submit}>
                <Flex>
                    <FlexItem>
                        <FormGroup
                            label="Source currency"
                            fieldId="source-input"
                        >
                            <FormSelect
                                value={source}
                                onChange={setSource}
                                id="source-input"
                                aria-label="FormSelect Input"
                            >
                                {currencyOptions}
                            </FormSelect>
                        </FormGroup>
                    </FlexItem>
                    <FlexItem>
                        <FormGroup
                            label="Target currency"
                            fieldId="target-input"
                        >
                            <FormSelect
                                value={target}
                                onChange={setTarget}
                                id="target-input"
                                aria-label="target currency"
                            >
                                {currencyOptions}
                            </FormSelect>
                        </FormGroup>
                    </FlexItem>
                </Flex>
                <span>
                    <Button
                        isDisabled={isLoading || source === target}
                        type="submit"
                        variant="primary"
                    >
                        Submit
                    </Button>
                </span>
            </Form>

            {exchangeData && (
                <ScatterLineChart data={exchangeData} target={target} />
            )}

            {isLoading && <LoadingSpinner />}
        </>
    );
}
