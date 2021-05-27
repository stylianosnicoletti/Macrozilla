/**
 * Maintenance Model.
 */
export interface Maintenance {

    Enabled: boolean;

    EnabledMessage: string;
    /**
     * Latest Android version (E.g. 2.13) -> (2: Major, 1: Minor, 3: Patch).
     * Latest Web version (E.g. 2.1.3) -> (2: Major, 1: Minor, 3: Patch)
     */
    UpdateLatestVersion: string;

    UpdateMessageMajor: string;

    UpdateMessageMinor: string;

    UpdateUrl?: string;
}