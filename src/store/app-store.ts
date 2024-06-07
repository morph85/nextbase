import { createStore } from "zustand/vanilla"

export type AppState = {
  // count: number,
  loadingCount: number
  // token: undefined | string,
  clientWidth: number
  clientHeight: number
  theme: string
}

export type AppActions = {
  // decrementCount: () => void
  // incrementCount: () => void
  setLoading: (addLoading: boolean) => void
  // setToken: (newToken: string) => void
  // clearToken: () => void
  setClientSize: (width: number, height: number) => void
  setTheme: (theme: string) => void
}

export type AppStore = AppState & AppActions

export const initAppStore = (): AppState => {
  return {
    // count: new Date().getFullYear(),
    loadingCount: 0,
    // token: undefined,
    clientWidth: -1,
    clientHeight: -1,
    theme: 'dark',
  }
}

export const defaultInitState: AppState = {
  // count: 0,
  loadingCount: 0,
  // token: undefined,
  clientWidth: -1,
  clientHeight: -1,
  theme: 'dark',
}

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    // decrementCount: () => set((state) => ({ count: state.count - 1 })),
    // incrementCount: () => set((state) => ({ count: state.count + 1 })),
    setLoading: (addLoading: boolean) =>
      set((state: any) => {
        let prev = state.loadingCount || 0
        let result = prev + (addLoading ? 1 : -1)
        if (result < 0) {
          return { loadingCount: 0 }
        }
        return {
          loadingCount: result,
        }
      }),

    // setToken: (newToken: string) => set((state: any) => ({ token: newToken })), // note: get token from cookie-client instead
    // clearToken: () => set((state: any) => ({ token: undefined })),

    setClientSize: (width: number, height: number) => 
      set((state: any) => {
        return {
          clientWidth: width != null ? width : -1,
          clientHeight: height != null ? height : -1,
        }
      }),

    setTheme: (theme: string) => 
      set((state: any) => {
        return {
          theme,
        }
      }),
  }))
}
