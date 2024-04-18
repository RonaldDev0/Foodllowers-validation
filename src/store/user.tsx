import { create } from 'zustand'

interface State {
  user: any
  admin: boolean | null
}

interface Actions {
  setStore: (property: keyof State, value: any) => void
}

export const useDataUser = create<State & Actions>(set => ({
  user: null,
  admin: null,
  setStore: (property, value) => set(prev => ({ ...prev, [property]: value }))
}))
