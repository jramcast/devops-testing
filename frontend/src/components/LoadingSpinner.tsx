import React from "react";
import {
    Title,
    EmptyState,
    EmptyStateIcon,
    Spinner,
} from "@patternfly/react-core";

export const LoadingSpinner: React.FC = () => {
    return (
        <EmptyState>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title headingLevel="h2">Loading</Title>
        </EmptyState>
    );
};
