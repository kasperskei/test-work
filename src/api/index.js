import random from '@/lib/random'
import Group from '@/models/Group'
import Product from '@/models/Product'
import EventObserver from '@/models/EventObserver'

export const getGroupList = async () => {
  const { default: names } = await import('@/assets/data/names.json')

  const groupList = Object
    .entries(names)
    .map(([groupId, group]) => new Group({
      id: +groupId,
      name: group.G,
    }))

  return groupList
}

export const getProductList = async () => {
  const { default: data } = await import('@/assets/data/data.json')
  const { default: names } = await import('@/assets/data/names.json')

  const productList = data.Value.Goods
    .map((product) => new Product({
      id: product.T,
      name: names[product.G].B[product.T].N,
      groupId: product.G,
      count: product.P,
      price: {
        USD: product.C,
      },
    }))

  return productList
}

export const getRateUsdInRub = async () => random(20, 80)

export const rateUsdInRubObserver = new EventObserver()

setInterval(() => random(20, 80) |> rateUsdInRubObserver.broadcast, 15000)
