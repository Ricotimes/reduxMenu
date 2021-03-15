import { combineReducers } from 'redux'

import {menuReducer} from './MenuReducer';
import {categoryReducer} from './CategoryReducer';
import {connexionReducer} from './ConnexionReducer';
import {canvasReducer,canvasMouse} from './CanvasReducer';


const rootReducer = combineReducers({
	menuReducer,
    categoryReducer,
    connexionReducer,
    canvasReducer,
    canvasMouse,
})

export default rootReducer