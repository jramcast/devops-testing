import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, IRow } from "@patternfly/react-table";
import {
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody,
    EmptyStateVariant,
    Bullseye,
    Title,
} from "@patternfly/react-core";
import { ErrorCircleOIcon } from "@patternfly/react-icons";

import { getNews } from "../services/NewsService";

const resultsNotFound = [
    {
        heightAuto: true,
        cells: [
            {
                props: { colSpan: 2 },
                title: (
                    <Bullseye>
                        <EmptyState variant={EmptyStateVariant.small}>
                            <EmptyStateIcon icon={ErrorCircleOIcon} />
                            <Title headingLevel="h2" size="lg">
                                No results found
                            </Title>
                            <EmptyStateBody>
                                Unable to get news from external feed.
                            </EmptyStateBody>
                        </EmptyState>
                    </Bullseye>
                ),
            },
        ],
    },
];

export function NewsBoard() {
    const [rows, setRows] = useState<IRow[]>([]);

    useEffect(() => {
        getNews().then((data) => {
            const normalizedRows = data.map((element) => ({
                cells: [element.timestamp, element.title],
            }));
            setRows(normalizedRows);
        });
    }, []);

    return (
        <Table
            caption="Latest News"
            rows={rows ?? resultsNotFound}
            cells={["Timestamp", "Story"]}
        >
            <TableHeader />
            <TableBody />
        </Table>
    );
}
