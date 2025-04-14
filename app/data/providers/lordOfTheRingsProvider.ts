import type { Character, DataProvider } from './provider'
import { UniverseId } from '~/constants/universes'

const LORD_OF_THE_RINGS_PREVIEW_IMAGE = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/475413e1-216c-42d6-a737-12e467e7dfd2/dcndjdf-d327b8ca-6f69-4ff0-9a86-ca5aed0a4294.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ3NTQxM2UxLTIxNmMtNDJkNi1hNzM3LTEyZTQ2N2U3ZGZkMlwvZGNuZGpkZi1kMzI3YjhjYS02ZjY5LTRmZjAtOWE4Ni1jYTVhZWQwYTQyOTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._G1afqe7QNrp7ZGMch4d_l9a6tswA-GyMKsoyavOcD8'

export const LordOfTheRingsProvider: DataProvider = {
  id: UniverseId.LORD_OF_THE_RINGS,
  displayName: 'Lord of the Rings',
  image: LORD_OF_THE_RINGS_PREVIEW_IMAGE,

  getCharacters: async (): Promise<Character[]> => {
    const characters = await queryCollection('lordOfTheRingsCharacter').all()

    return characters.map((character, index) => ({
      id: index + 1,
      name: [character.nameFirst, character.nameLast].filter(Boolean).join(' '),
      image: character.image || '',
      attributes: {
      },
    }))
  },

  getCharacterById: async (id: string): Promise<Character> => {
    const characters = await queryCollection('lordOfTheRingsCharacter').all()
    const character = characters[Number(id) - 1]

    if (!character) {
      throw new Error(`Character with id ${id} not found`)
    }

    return {
      id: Number(id),
      name: [character.nameFirst, character.nameLast].filter(Boolean).join(' '),
      image: character.image || '',
      attributes: {
        name: character.nameFirst,
        last_Name: character.nameLast,
        hobbies: character.hobbies,
        age: character.age,
        height: character.height,
      },
    }
  },
}
