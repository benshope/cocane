/**
 * Get unique property values from an array.
 * @param {Array} arr Array of data.
 * @param {string} propertyName Prop name.
 * @returns {Array} Array of unique values.
 */
export function getUniquePropertyValues(arr, accessor) {
  const setOfValues = new Set(arr.map(accessor))
  return Array.from(setOfValues)
}

/**
 * Add zero to the domain.
 * @param {Array} arr Add zero to the domain.
 * @param {Number} value Add zero to domain.
 * @returns {Array} Adjusted domain.
 */
export function addValueToArray(arr, value) {
  const result = [].concat(arr)
  if (result[0] > value) {
    result[0] = value
  }
  if (result[result.length - 1] < value) {
    result[result.length - 1] = value
  }
  return result
}

/**
 * Transforms a value ( number or date ) to a string.
 * @param {Date | number} value The value as date or number.
 * @returns {string | number} The value as string.
 */
export function transformValueToString(value) {
  return Object.prototype.toString.call(value) === '[object Date]'
    ? value.toDateString()
    : value
}
