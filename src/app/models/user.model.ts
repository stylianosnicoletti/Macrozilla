/**
 * Includes User Document entries.
 */
export interface User {

  Options: Options;

  Sizes: Sizes;
}

/**
 * User specific Options.
 */
export interface Options {

  DarkMode: boolean;

  UseOnlyPersonalDb: boolean;

  TransferEntriesEnabled: boolean;

  DeletingAllDailyEntriesEnabled: boolean;
}

/**
 * Collection sizes.
 */
export interface Sizes {

  DailyEntries: number;
}