import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, RootState } from './store'
// import type { AppDispatch, store as AppStore, RootState } from './store'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()
