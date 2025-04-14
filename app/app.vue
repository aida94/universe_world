<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <UApp
      :ui="{
        notifications: {
          provider: '$dynamic-slots',
        },
      }"
    >
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
