import { create } from 'zustand'

interface State {
  darkMode: boolean
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useDataApp = create<State & Actions>(set => ({
  darkMode: true,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
