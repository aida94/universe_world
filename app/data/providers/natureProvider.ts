import type { Character, DataProvider } from './provider'
import { UniverseId } from '~/constants/universes'

export const NatureProvider: DataProvider = {
  id: UniverseId.NATURE,
  displayName: 'Nature',
  image: 'mdi:cat',

  getCharacters: async (): Promise<Character[]> => {
    const animals = await queryCollection('natureAnimal').all()

    return animals.map((animal, index) => ({
      id: index + 1,
      name: animal.name,
      image: animal.icon || '',
      attributes: {},
    }))
  },

  getCharacterById: async (id: string): Promise<Character> => {
    const animals = await queryCollection('natureAnimal').all()
    const animal = animals[Number(id) - 1]

    if (!animal) {
      throw new Error(`Animal with id ${id} not found`)
    }

    return {
      id: Number(id),
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
