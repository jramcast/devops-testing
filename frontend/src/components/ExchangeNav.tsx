import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import { NavLink, useRouteMatch } from "react-router-dom";

export function ExchangeNav() {
    const newsEnabled = process.env.REACT_APP_NEWS_ENABLED;
    return (
        <Nav theme="dark">
            <NavList>
                <NavItemLink label="Home" exact path="/" />
                <NavItemLink label="Historical Data" path="/history" />
                <NavItemLink label="Exchange" path="/exchange" />
                {newsEnabled && <NavItemLink label="News" path="/news" />}
            </NavList>
        </Nav>
    );
}

function NavItemLink(props: { path: string; label: string; exact?: boolean }) {
    const isMatch: boolean = !!useRouteMatch({
        path: props.path,
        exact: props.exact,
    });

    return (
        <NavItem isActive={isMatch}>
            <NavLink to={props.path} exact={props.exact}>
                {props.label}
            </NavLink>
        </NavItem>
    );
}
