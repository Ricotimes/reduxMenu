import * as types from '../constants/CanvasTypes';

export const addTask = (task) => ({
	type: types.ADD_TASK,
	task:task,
})

export const removeTask = (key) => ({
	type: types.DELETE_TASK,
	key:key
})

export const modifyTask = (key,task,taskSolver) => ({
	type: types.MODIFY_TASK,
	key:key,
	task:task,
	taskSolver:taskSolver
})

export const modifyTaskSolver = (taskSolver,key) => ({
	type: types.MODIFY_TASKSOLVER,
	key:key,
	taskSolver:taskSolver
})

export const modifyPosition = (x,y,key) => ({
	type: types.MODIFY_POSITION,
	key:key,
	x:x,
	y:y
})

export const setTempTask = (task) => ({
	
	type: types.SET_TEMP_TASK,
	task:task
})

export const setTempTaskSolver = (taskSolver) => ({
	type: types.SET_TEMP_TASKSOLVER,
	taskSolver:taskSolver
})

export const clearTempVar = () => ({
	type: types.CLEAR_TEMP_VAR,
})

export const setMouseClick = (event,key) => ({
	type: types.SET_MOUSE_CLICK,
	event:event,
    key:key
})
export const setMouseUnclick = () => ({
	type: types.SET_MOUSE_UNCLICK,
})

export const mouseMove = (event) => ({
	type: types.MOUSE_MOVE,
	event:event
})

export const setPopup = (x,y) => ({
	type: types.SET_POPUP,
	x:x,
	y:y
})

export const unsetPopup = () => ({
	type: types.UNSET_POPUP,
})



