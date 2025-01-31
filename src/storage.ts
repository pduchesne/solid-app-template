import {PersonalDataStorage, FolderStorage, JsonPDSDecorator, JSONStorage} from "@hilats/solid-utils";
import {useMemo} from "react";

export const PATH_PREFERENCES = 'preferences.json';

export type Preferences = any;

export function useAppStorage(storage: PersonalDataStorage, appFolder: string) {
    return useMemo(
        () => new AppStorage(storage, {appFolder}),
        [storage, appFolder]
    );
}

export class AppStorage {

    private _storage: JSONStorage;

    constructor(storage: PersonalDataStorage, options?: { appFolder: string }) {
        this._storage = new JsonPDSDecorator(options?.appFolder ? new FolderStorage(storage, options.appFolder) : storage);
    }

    fetchPreferences(): Promise<Preferences> {
        return this._storage.fetchJSON<Preferences>(PATH_PREFERENCES).then(preferences => preferences || {});
    }

    savePreferences(prefs: Preferences) {
        return this._storage.putJSON(PATH_PREFERENCES, prefs);
    }
}

