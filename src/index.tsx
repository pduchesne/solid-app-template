import * as React from "react";
import { PersonalDataStorage } from "@hilats/solid-utils";
import {Preferences, useAppStorage} from "./storage";
import {Navigate, Route, Routes, useLocation} from "react-router";
import {Overview} from "./pages/overview";
import {Settings} from "./pages/settings";
import {PromiseStateContainer, usePromiseFn} from "@hilats/react-utils";
import {useCallback} from "react";

export const TemplateDashboard = (props: {APP_ROOT?: string, storage: PersonalDataStorage}) => {

    const {search} = useLocation();

    const storage = useAppStorage(props.storage, "template-app/");

    const prefs$ = usePromiseFn(() => storage.fetchPreferences(), []);

    const savePrefs = useCallback(async (newPrefs: Preferences) => {
        storage.savePreferences(newPrefs);
        prefs$.setResult(newPrefs);
    }, [storage])

    return <div>
        <PromiseStateContainer promiseState={prefs$}>
            {prefs =>
            <Routes>
                <Route path="/overview/*" element={<Overview storage={storage} prefs={prefs}/>} />
                <Route path="/settings/*" element={<Settings storage={storage} prefs={prefs} onSavePrefs={savePrefs}/>} />
                <Route path="*" element={<Navigate to={"overview" + decodeURIComponent(search)} replace={true}/>}/>
            </Routes> }
        </PromiseStateContainer>
    </div>
}


export default TemplateDashboard;