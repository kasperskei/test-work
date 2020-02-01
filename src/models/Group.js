
/**
 * @typedef {Object} Group
 * @property {number} id
 * @property {string} name
 */
export default class Group {
  constructor({
    id,
    name,
  }) {
    this.id = id
    this.name = name
  }
}
