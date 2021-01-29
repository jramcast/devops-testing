import React, { useEffect, useState } from "react";
import {
    Chart,
    ChartAxis,
    ChartGroup,
    ChartLine,
    ChartScatter,
    ChartThemeColor,
    ChartVoronoiContainer,
} from "@patternfly/react-charts";

import Currency from "../models/Currency";
import { format, parseISO } from "date-fns";

export function ScatterLineChart(props: { data: Currency[]; target: string }) {
    const containerRef: React.RefObject<HTMLDivElement> = React.createRef();

    const [width, setWidth] = useState<number>(0);
    const [maxYAxis, setMaxYAxis] = useState<number>(0);
    const [dataPoints, setDataPoints] = useState<{ x: string; y: number }[]>(
        [],
    );

    // TODO: extract this to a reusable hook?
    useEffect(() => {
        const handleResize = () => {
            const newWidth = containerRef.current?.clientWidth;
            if (newWidth) {
                setWidth(newWidth);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // return a cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        // TODO: does this need to be reversed?
        const reversedData = [...props.data].reverse();
        setDataPoints(
            reversedData.map((currencyValue) => {
                const floatValue = parseFloat(currencyValue.value);
                if (floatValue > maxYAxis) {
                    setMaxYAxis(floatValue);
                }

                const date = parseISO(currencyValue.date);
                return {
                    x: format(date, "d/M"), // DD/MM
                    y: floatValue,
                };
            }),
        );
    }, [props.data, props.target]);

    const chartContainerComponent = (
        <ChartVoronoiContainer
            labels={({ datum }) =>
                datum.childName.includes("line-")
                    ? `${datum.name}: ${datum.y}`
                    : ""
            }
            constrainToVisibleArea
        />
    );

    return (
        <div style={{ height: "275px" }} ref={containerRef}>
            <Chart
                containerComponent={chartContainerComponent}
                legendData={[{ name: "Conversion" }]}
                ariaDesc="Exchange rate for given currency"
                ariaTitle="Exchange Rate Graph"
                legendPosition="bottom-left"
                height={275}
                maxDomain={{ y: maxYAxis + 0.2 }}
                minDomain={{ y: 0 }}
                padding={{
                    bottom: 75, // Adjusted to accommodate legend
                    left: 50,
                    right: 50,
                    top: 50,
                }}
                themeColor={ChartThemeColor.blue}
                width={width}
            >
                <ChartAxis tickValues={[2, 3, 4]} />
                <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
                <ChartGroup>
                    <ChartScatter
                        data={dataPoints}
                        name={"scatter-conversion"}
                    />
                </ChartGroup>
                <ChartGroup>
                    <ChartLine name={"line-conversion"} data={dataPoints} />
                </ChartGroup>
            </Chart>
        </div>
    );
}
