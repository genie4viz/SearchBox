import React, { useState } from "react";
import { NameList, sendAnalyticsPing } from "./helpers";
import Header from "./Header";
import Description from "./Description";

import {
    unstable_LowPriority,
    unstable_next,
    unstable_runWithPriority,
    unstable_scheduleCallback
} from "scheduler";

import "./App.css";

export default function App() {
    const [searchValue, setSearchValue] = useState("");
    const handleChange = value => {
        setSearchValue(value);
    }

    return (
        <div className="App">
            <Header>ScheduleTron 3000</Header>
            <SearchBox onChange={handleChange} />
            <NameList searchValue={searchValue} />
            <Description />
        </div>
    );
}

function SearchBox(props) {
    const [inputValue, setInputValue] = useState("");

    const handleChange = event => {
        const value = event.target.value;
        const onChange = props.onChange;

        setInputValue(value);

        unstable_next(function () {
            onChange(value);
        });

        sendDeferredAnalyticsPing(value);

    };

    return (
        <div className="clearfix">
            <input
                type="text"
                className="input"
                value={inputValue}
                onChange={handleChange}
                placeholder="Filter 🔍"
            />
        </div>
    );
}


function sendDeferredAnalyticsPing(value) {
    unstable_runWithPriority(unstable_LowPriority, function () {
        unstable_scheduleCallback(function () {
            sendAnalyticsPing(value);
        });
    });
}