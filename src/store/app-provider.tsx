"use client"

import { type ReactNode, createContext, useRef, useContext, useEffect } from "react"
import { type StoreApi, useStore } from "zustand"

import { type AppStore, createAppStore, initAppStore } from "@/store/app-store"

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null)

export interface AppStoreProviderProps {
  children: ReactNode
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  // const [clientSize, setClientSize] = useState({ width: -1, height: -1 })

  const storeRef = useRef<StoreApi<AppStore>>()
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore())
  }
  
  useEffect(() => {
    const getWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window
      return { width, height }
    }
    const setClientSize = ({ width, height }: any) => {
      const store = storeRef.current
      store?.setState((state) => {
        return {
          ...state,
          clientWidth: width,
          clientHeight: height,
        }
      })
    }
    
    setClientSize(getWindowDimensions())
    const onResize = () => {
      setClientSize(getWindowDimensions())
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext)
  if (!appStoreContext) {
    throw new Error(`useAppStore must be use within AppStoreProvider`)
  }
  return useStore(appStoreContext, selector)
}
