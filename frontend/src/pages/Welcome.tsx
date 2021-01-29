import React from "react";
import { TextContent, Title } from "@patternfly/react-core";

import rhtLogo from "../images/training_black.png";

export function Welcome() {
    return (
        <>
            <Title headingLevel="h1" size="4xl" style={{ textAlign: "center" }}>
                Welcome to the currency exchange application!
            </Title>

            <div style={{ textAlign: "center" }}>
                <img src={rhtLogo} alt="Red Hat Training Logo" />
            </div>

            <TextContent>
                <p>Please choose one of the two links on the left:</p>
                <ul>
                    <li>
                        <em>Historical Data</em> for seeing currency&apos;s
                        exchange rate in time
                    </li>
                    <li>
                        <em>Exchange</em> for seeing how much money is your
                        amount worth in a different currency
                    </li>
                </ul>
                <p>
                    For detailed info about the structure of this application,
                    see the{" "}
                    <a href="https://github.com/RedHatTraining/DO328-apps/">
                        DO328-apps
                    </a>{" "}
                    repository.
                </p>
                <p>
                    You can ask questions or file issues{" "}
                    <a href="https://github.com/RedHatTraining/DO328-apps/issues">
                        here
                    </a>
                    .
                </p>
            </TextContent>
        </>
    );
}
