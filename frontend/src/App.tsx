import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { VerticalLayout } from "./VerticalLayout";
import { HistoricalDataForm } from "./pages/HistoricalDataForm";
import { Welcome } from "./pages/Welcome";
import { SingleCurrencyExchange } from "./pages/SingleCurrencyExchange";
import { NewsBoard } from "./pages/NewsBoard";

export function App() {
    const newsEnabled = process.env.REACT_APP_NEWS_ENABLED ?? true;
    return (
        <Router basename="/frontend">
            <Switch>
                <VerticalLayout>
                    <Route path="/" exact component={Welcome} />
                    <Route
                        path="/exchange"
                        component={SingleCurrencyExchange}
                    />
                    <Route path="/history" component={HistoricalDataForm} />
                    {newsEnabled && (
                        <Route path="/news" component={NewsBoard} />
                    )}
                </VerticalLayout>
            </Switch>
        </Router>
    );
}
