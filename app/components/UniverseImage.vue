<script setup lang="ts">
interface Props {
  image: string
  alt: string
  imageClass?: string
  iconClass?: string
}

defineProps<Props>()
</script>

<template>
  <template v-if="image.startsWith('http')">
    <img
      :src="image"
      :alt="alt"
      :class="imageClass"
    >
  </template>
  <template v-else>
    <UIcon
      :name="image"
      :class="iconClass"
    />
  </template>
</template>
