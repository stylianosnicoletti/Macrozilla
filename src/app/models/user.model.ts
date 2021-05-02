/**
 * Includes User Document entries.
 */
export interface User {
  Options: Options;
}

/**
 * User specific Options.
 */
export interface Options {
  DarkMode: boolean;
  
  UseOnlyPersonalDb: boolean;
}