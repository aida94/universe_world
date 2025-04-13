<script setup lang="ts">
import type { Attributes } from '~/data/providers/provider'

interface Props {
  attributes: Attributes
}

defineProps<Props>()

function formatAttributeValue(value: unknown): string {
  const toString = (item: unknown) => String(item)
  const replaceHyphens = (str: string) => str.replace(/-/g, ' ')

  if (Array.isArray(value)) {
    return value
      .map(toString)
      .map(replaceHyphens)
      .join(', ')
  }

  return replaceHyphens(toString(value))
}

function formatLabelKey(key: string): string {
  const replaceUnderscores = (str: string) => str.replace(/_/g, ' ')
  return `${replaceUnderscores(key)}:`
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(value, key) in attributes"
      :key="key"
      class="flex gap-2 items-center"
    >
      <UButton
        :label="formatLabelKey(key)"
        color="primary"
        variant="ghost"
        class="!cursor-default hover:bg-transparent hover:text-primary-500 capitalize font-semibold"
      />
      <span>{{ formatAttributeValue(value) || "-" }}</span>
    </div>
  </div>
</template>
