import { combineReducers } from "redux"
import accountReducer from "./reducers/accountReducer"
import editModeReducer from "./reducers/editModeReducer"
import encryptionKeyReducer from "./reducers/encryptionKeyReducer"
import recordsReducer from "./reducers/recordsReducer"
import recordsVisibleReducer from "./reducers/recordsVisibleReducer"
import rememberMeReducer from "./reducers/rememberMeReducer"

const rootReducer = combineReducers({
    accountReducer,
    editModeReducer,
    encryptionKeyReducer,
    recordsReducer,
    recordsVisibleReducer,
    rememberMeReducer
})

export default rootReducer;