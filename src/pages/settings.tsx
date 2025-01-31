import {AppStorage, Preferences} from "../storage";
import * as React from "react";
import {Input} from "@mui/material";

export const Settings = (props: {storage: AppStorage, prefs: Preferences, onSavePrefs: (prefs: Preferences) => void}) => {

    return <div>
        <h3>Settings</h3>
        <div>
            OpenAI Key: <Input value={props.prefs.openaiKey} onChange={(event) => props.onSavePrefs({...props.prefs, openaiKey: event.target.value})}/>
        </div>
    </div>
}