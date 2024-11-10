/**
 * @param {number} value - Value number
 * @returns {string}} - Return a formatted string in BRL format
 */
export function formatLocale(value = "") {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
