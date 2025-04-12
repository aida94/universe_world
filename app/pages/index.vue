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
      <div class="grid gap-8 xl:grid-cols-2">
        <NuxtLink
          v-for="universe in universes"
          :key="universe.id"
          :to="`/${universe.id}/characters`"
          class=""
        >
          <UCard class="rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-102 transition text-center">
            <h2 class="text-xl font-semibold">
              {{ universe.displayName }} Universe
            </h2>
            <img
              :src="universe.image"
              :alt="universe.displayName"
              class="size-48 rounded-full object-cover mx-auto"
            >
            <p class="mt-2">
              Explore the characters of {{ universe.displayName }}
            </p>
          </UCard>
        </NuxtLink>
      </div>
    </UContainer>
  </div>
</template>
