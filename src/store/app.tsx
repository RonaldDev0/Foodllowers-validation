import { create } from 'zustand'

interface State {
  darkMode: boolean
  deliveryPending: [
    {
      id: string
    }
  ] | null
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useDataApp = create<State & Actions>(set => ({
  darkMode: true,
  deliveryPending: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
