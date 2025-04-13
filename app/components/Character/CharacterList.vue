<script setup lang="ts">
import type { Character } from '~/data/providers/provider'

interface Props {
  characters: Character[]
  viewMode: 'list' | 'grid'
  universeId: string
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      viewMode === 'grid'
        ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
        : 'space-y-4',
    ]"
  >
    <div
      v-for="character in characters"
      :key="character.id"
      class="block transition-transform"
    >
      <GridView
        v-if="viewMode === 'grid'"
        :character="character"
        :universe-id="universeId"
      />
      <ListView
        v-else
        :character="character"
        :universe-id="universeId"
      />
    </div>
  </div>
</template>
