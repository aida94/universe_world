<script setup lang="ts">
interface Props {
  modelValue: 'list' | 'grid'
}

const { modelValue } = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: 'list' | 'grid']
}>()

function setViewMode(mode: 'list' | 'grid') {
  emit('update:modelValue', mode)
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <UButton
      icon="i-lucide-grid"
      size="md"
      variant="ghost"
      class="cursor-pointer hover:bg-gray-50" :class="[
        modelValue === 'grid' ? 'bg-gray-100' : '',
      ]"
      aria-label="Switch to grid view"
      @click="setViewMode('grid')"
    />

    <UButton
      icon="i-lucide-list"
      size="md"
      variant="ghost"
      class="cursor-pointer hover:bg-gray-50" :class="[
        modelValue === 'list' ? 'bg-gray-100' : '',
      ]"
      aria-label="Switch to list view"
      @click="setViewMode('list')"
    />
  </div>
</template>
