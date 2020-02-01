
/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} groupId
 * @property {number} count
 * @property {Object} price
 */
export default class Product {
  constructor({
    id,
    name,
    groupId,
    count,
    price,
  }) {
    this.id = id
    this.name = name
    this.groupId = groupId
    this.count = count
    this.price = price
  }
}
