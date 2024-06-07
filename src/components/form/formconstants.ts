export const REGEX_INT = /^\d+$/
export const REGEX_FLOAT = /^(\d*\.)?\d+$/
export const REGEX_HOUR_12 = /^(\d|1[0-2])$/
export const REGEX_HOUR_24 = /^([01]?\d|2[0-4])$/
export const REGEX_MINUTE = /^[0-5]?\d$/

export const REGEX_SSN = /^\d{3}-\d{2}-\d{4}$/

export const REGEX_CONTAIN_SPACE = /\s/

const FormConstants = {
  Error: {
    REQUIRED: "Required",
    INVALID_FORMAT: "Invalid format",
    INVALID_FORMAT_FUNC: (format: string) => `Invalid format: (${format})`,
    INVALID_FORMAT_NUMBER: "Invalid format. Please enter numbers only.",
    INVALID_EMAIL: "Invalid email format",
    INVALID_NUMBER: "Invalid number",
    INVALID_NUMBER_0: "Invalid value (more than 0)",
    PASSWORD_NOT_MATCH: "Password does not match",
    NO_SPACE: "Input should not include space (' ')",
    MIN_CHAR: (min: number) => `Minimum ${min} characters`,
  },
}

export default FormConstants
