export const MacrozillaConstants = {
  /**
   * @returns {RegExp} /^(\d*\.)?\d+$/
   */
  REGEX_DECIMAL_PATTERN : /^(\d*\.)?\d+$/,

  /**
   * @returns {RegExp} /^[0-9]+$/
   */
  REGEX_INTEGER_PATTERN : /^[0-9]+$/,

  /**
   * @returns {RegExp} /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
   */
  REGEX_DATE : /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
};
