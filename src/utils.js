/**
 * Saves an item in the session storage under the specified key. If the session storage already contains items under the same key, it keeps only the last 5 items to limit the storage size.
 * @param {string} key - The key under which to store the item in session storage.
 * @param {any} item - The item to be saved in session storage.
 */
export function saveInSession(key, item) {
  if (sessionStorage.getItem(key)) {
    const lastItem =
      JSON.parse(sessionStorage.getItem(key)).length >= 5
        ? JSON.parse(sessionStorage.getItem(key)).slice(-5)
        : JSON.parse(sessionStorage.getItem(key));
    const updatedItem = [].concat(lastItem, item);
    sessionStorage.setItem(key, JSON.stringify(updatedItem));
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(item));
  return;
}

/**
 * Retrieves and returns items stored in the session storage under the specified key.
 * @param {string} key - The key under which items are stored in session storage.
 * @returns {Array} - An array containing the stored items or a message if the session storage is empty.
 */
export function getFromSession(key) {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  return "El historial está vacío";
}

/**
 * Saves a key pressed in session storage under the specified key.
 * @param {string} key - The key under which the key pressed will be stored in session storage.
 * @param {string} letter - The key pressed to be stored.
 */
export function saveKeyPressed(key, letter) {
  sessionStorage.setItem(key, JSON.stringify(letter));
}

/**
 * Retrieves and returns the most recently saved key pressed from session storage under the specified key.
 * @param {string} key - The key under which the last key pressed is stored in session storage.
 * @returns {string} - The last saved key pressed or undefined if the key is not found.
 */
export function getLastKeyPressed(key) {
  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}
