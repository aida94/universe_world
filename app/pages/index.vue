<script setup lang="ts">
import { useUniverseProvider } from '~/composables/useUniverseProvider'

const { providers } = useUniverseProvider()
const universes = Object.values(providers)
</script>

<template>
  <div class="py-8">
    <UContainer>
      <header class="border-b mb-8 py-2 text-xl">
        <h1>
          Welcome to the home page!
        </h1>
      </header>
      <div class="grid gap-4 xl:grid-cols-2">
        <NuxtLink
          v-for="universe in universes"
          :key="universe.id"
          :to="`/${universe.id}/characters`"
          class="transition-transform hover:scale-105"
        >
          <PageSection :title="`${universe.displayName} Universe`">
            <div class="space-y-4">
              Explore the characters of {{ universe.displayName }}
            </div>
          </PageSection>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
