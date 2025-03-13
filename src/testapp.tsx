import React, {useMemo} from "react";
import ReactDOM from 'react-dom';
import TemplateDashboard from "./index";
import { BrowserLocalStorage } from "@hilats/solid-utils";
import {BrowserRouter} from "react-router-dom";

const TestApp = function(props: {}){

    const browserStorage = useMemo(() => new BrowserLocalStorage(), []);

    return <TemplateDashboard storage={browserStorage}/>
}

const container = document.createElement("div");
document.body.prepend(container);;
ReactDOM.render(<BrowserRouter><TestApp /></BrowserRouter>, container);