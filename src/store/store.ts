import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import loadingSlice from "./slices/loadingSlice";
import { saarthiList } from "./api/saarthiListApi";
import { LoginApi } from "./api/loginApi"
import { NewLoginApi } from "./api/newLoginApi";
import selectedSarathiReducer from "./slices/selectedSarathi";
import userInfoAuthSlice from "./slices/userInfoAuthSlice";
import alertReducer, { alertsActions } from "./slices/Alerts/reducer";
import loginModalSlice from "./slices/loginModalSlice";

import { Middleware, MiddlewareAPI, isRejected } from "@reduxjs/toolkit";
import globalConfigSlice from "./slices/globalConfigSlice";
import { StatsApi } from "./api/statsApi";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    const { dispatch } = api;

    if (isRejected(action)) {
      dispatch(
        alertsActions.setErrorMessage(
          action?.payload?.data?.error?.message || ""
        )
      );
    }
    
    return next(action);
  };

// export const store = configureStore({
//   reducer: {
//     authUserReducer: userInfoAuthSlice,
//     loadingReducer: loadingSlice,
//     loginModal: loginModalSlice,
//     alerts: alertReducer,
//     globalConfig: globalConfigSlice,
//     selectedSarathi: selectedSarathiReducer,
//     [saarthiList.reducerPath]: saarthiList.reducer,
//     [LoginApi.reducerPath]: LoginApi.reducer,
//     [StatsApi.reducerPath]: StatsApi.reducer,
//     [NewLoginApi.reducerPath]: NewLoginApi.reducer,
//   },
//   //@ts-ignore
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(
//       saarthiList.middleware,
//       LoginApi.middleware,
//       NewLoginApi.middleware,
//       StatsApi.middleware,
//       rtkQueryErrorLogger
//     );
//   },
// });
// function to make a Store 
export function makeStore() {
  return configureStore({
    reducer: {
      authUserReducer: userInfoAuthSlice,
      loadingReducer: loadingSlice,
      loginModal: loginModalSlice,
      alerts: alertReducer,
      globalConfig: globalConfigSlice,
      selectedSarathi: selectedSarathiReducer,
      [saarthiList.reducerPath]: saarthiList.reducer,
      [LoginApi.reducerPath]: LoginApi.reducer,
      [StatsApi.reducerPath]: StatsApi.reducer,
      [NewLoginApi.reducerPath]: NewLoginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        saarthiList.middleware,
        LoginApi.middleware,
        NewLoginApi.middleware,
        StatsApi.middleware,
        rtkQueryErrorLogger
      ),
  })
}
const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
