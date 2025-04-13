import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRoute } from 'vue-router'

export function useTypedRoute<T extends Record<string, string>>() {
  return useRoute() as RouteLocationNormalizedLoaded & { params: T }
}
