import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { RootState, AppDispatch } from "../app/Store/store"


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


