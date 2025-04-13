export function useViewMode(storageKey: string) {
  const viewMode = ref<'list' | 'grid'>('grid')

  onMounted(() => {
    try {
      const savedMode = localStorage.getItem(storageKey) as 'list' | 'grid'
      if (savedMode) {
        viewMode.value = savedMode
      }
    }
    catch (e) {
      console.error('Failed to read from localStorage:', e)
    }
  })

  watch(viewMode, (newMode) => {
    try {
      localStorage.setItem(storageKey, newMode)
    }
    catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  })

  return {
    viewMode,
  }
}
