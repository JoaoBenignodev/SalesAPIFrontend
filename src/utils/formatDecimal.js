/**
 * @param {string} value - Value with mask
 * @returns {number}} - Return a Double
 */
export function formatDecimal(value) {
    return value.replace(".", "").replace(",", ".");
}
