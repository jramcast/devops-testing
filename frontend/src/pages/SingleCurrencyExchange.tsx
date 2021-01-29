import React, { useEffect, useState } from "react";
import {
    Form,
    FormGroup,
    FormSelect,
    FormSelectOption,
    Button,
    TextInput,
    Flex,
    FlexItem,
    Bullseye,
    Title,
} from "@patternfly/react-core";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { ConversionDisplay } from "../components/ConversionDisplay";

import Currency from "../models/Currency";
import {
    convertSingleCurrency,
    getCurrencies,
} from "../services/CurrencyService";

export function SingleCurrencyExchange() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // form data
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [conversionResult, setConversionResult] = useState<Currency>();

    // form values
    const [inputValue, setInputValue] = useState<number>(1);
    const [source, setSource] = useState<string>("Loading currencies");
    const [target, setTarget] = useState<string>("Loading currencies");

    useEffect(() => {
        getCurrencies().then((currencies) => {
            console.log("received currencies:", currencies);
            setCurrencies(currencies);
            setSource(currencies[0]);
            setTarget(currencies[1]);
            setIsLoading(false);
        });
    }, []);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setConversionResult(
            await convertSingleCurrency({
                source,
                target,
            }),
        );
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
            <Title headingLevel="h1">Single Currency Exchange</Title>

            <Form onSubmit={submit}>
                <Flex>
                    <FlexItem>
                        <FormGroup label="Amount" fieldId="amount-input">
                            <TextInput
                                value={inputValue}
                                id="amount-input"
                                type="number"
                                min="0"
                                onChange={(inputValue) =>
                                    setInputValue(parseFloat(inputValue))
                                }
                                aria-label="amount to convert"
                            />
                        </FormGroup>
                    </FlexItem>
                    <FlexItem>
                        <FormGroup
                            label="Source currency"
                            fieldId="source-input"
                        >
                            <FormSelect
                                id="source-input"
                                value={source}
                                onChange={setSource}
                                aria-label="source currency type"
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
                                aria-label="target currency type"
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

            {conversionResult && (
                <Bullseye>
                    <ConversionDisplay
                        currency={conversionResult}
                        value={inputValue}
                    />
                </Bullseye>
            )}

            {isLoading && <LoadingSpinner />}
        </>
    );
}
