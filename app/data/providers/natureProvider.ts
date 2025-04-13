import type { NatureAnimalCollectionItem } from '@nuxt/content'
import type { Character, DataProvider } from './provider'
import { queryCollection } from '#imports'
import { generateIdFromString } from '~/utils/generateId'

export const NatureProvider: DataProvider = {
  id: 'nature',
  displayName: 'Nature',
  image: 'mdi:cat',

  getCharacters: async (): Promise<Character[]> => {
    const animals = await queryCollection('natureAnimal').all()

    return animals.map((animal: NatureAnimalCollectionItem) => ({
      id: generateIdFromString(animal.name),
      name: animal.name,
      image: animal.icon || '',
      attributes: {
      },
    }))
  },

  getCharacterById: async (id: string): Promise<Character> => {
    const animals = await queryCollection('natureAnimal').all()
    const animal = animals.find((a: NatureAnimalCollectionItem) => generateIdFromString(a.name) === Number(id))

    if (!animal) {
      throw new Error(`Animal with id ${id} not found`)
    }

    return {
      id: generateIdFromString(animal.name),
      name: animal.name,
      image: animal.icon || '',
      attributes: {
        latin_Name: animal.nameLatin,
        diet: animal.diet,
        size: animal.size,
        lifespan: animal.lifespan,
      },
    }
  },
}
