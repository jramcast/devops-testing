import React, { useState } from "react";
import {
    Brand,
    Page,
    PageHeader,
    PageSidebar,
    PageSection,
} from "@patternfly/react-core";

import imgBrand from "./images/training_white.png";
import { ExchangeNav } from "./components/ExchangeNav";
import { UserAlert } from "./components/UserAlert";

export function VerticalLayout(props: { children: React.ReactNode }) {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(true);

    const Header = (
        <PageHeader
            logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
            logoProps={{ href: "/frontend/" }}
            showNavToggle
            isNavOpen={isNavOpen}
            onNavToggle={() => setIsNavOpen(!isNavOpen)}
            style={{ borderTop: "2px solid #c00" }}
        />
    );

    const Sidebar = (
        <PageSidebar nav={<ExchangeNav />} isNavOpen={isNavOpen} theme="dark" />
    );

    return (
        <Page header={Header} sidebar={Sidebar} style={{ minHeight: "100vh" }}>
            <UserAlert />
            <PageSection>{props.children}</PageSection>
        </Page>
    );
}
