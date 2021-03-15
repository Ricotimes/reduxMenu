import * as type from "../constants/CanvasTypes";


const initialState = [{
    key:0,
    x:100,
    y:120,
    color1:1,
    color2:1,
    text:"EXEMPLE",
    taskSolver:"Thibelt"
},
{
    key:1,
    x:50,
    y:50,
    color1:3,
    color2:1,
    text:"key 1",
    taskSolver:"Suillot"
}];



export const canvasReducer = (state = initialState, action) => {
    switch (action.type){
        case(type.ADD_TASK):
            return [
                ...state,
                {
                    key:state.reduce((maxKey,task) => Math.max(task.key, maxKey),-1)+1,
                    x:action.task.x,
                    y:action.task.y,
                    color1:action.task.color1,
                    color2:action.task.color2,
                    text:action.task.text,
                    taskSolver:action.task.taskSolver
                }
            ];
        
        case(type.MODIFY_TASK):
        console.log(action)
            return state.map((element) =>  element.key===action.key ? {
                ...element,
                text : action.task,
                taskSolver : action.taskSolver
            } : element)

        case(type.MODIFY_POSITION):
            return state.map((task) =>  task.key===action.key ? {
                ...task,
                x : action.x,
                y : action.y                    
            } : task)
        
        case(type.MODIFY_TASKSOLVER):
                return state.map((task) =>  task.key===action.key ? {
                    ...task,
                    taskSolver : action.taskSolver} : task)


        case(type.DELETE_COMPLETED):
            return state.filter((task) => !task.completed)

        case(type.DELETE_TASK):
            return state.filter((task) => task.key !== action.key)

        default :
            return state
    }
}

const initialStateMouse = {
    mouseClicked:false,
    moveX:-1,
    moveY:-1,
    idTaskSelected:-1,
    initX:-1,
    initY:-1,
    popupDisplay:false,
    xnewTask:-1,
    ynewTask:-1,
    tempTask:"",
    tempTaskSolver:"",
    initChange:true,
}


export const canvasMouse = (state = initialStateMouse, action) => {
    switch (action.type){
        case(type.SET_MOUSE_CLICK):
            return {...state,
                mouseClicked:true,
                initX:action.event.nativeEvent.layerX,
                initY:action.event.nativeEvent.layerY,
                idTaskSelected:action.key
            };

        case(type.SET_MOUSE_UNCLICK):
            return {...state,
                mouseClicked:false,
                initX:-1,
                initY:-1,
                idTaskSelected:-1,
                initChange:true
            };


        case(type.SET_POPUP):
            return {...state,
                xnewTask:action.x,
                ynewTask:action.y,
                popupDisplay:true,
                mouseClicked:false
            };

        case(type.SET_TEMP_TASK):
            return {...state,
                tempTask: action.task,
                initChange:false           
            };

        case(type.SET_TEMP_TASKSOLVER):
            return {...state,
                tempTaskSolver:action.taskSolver,
                initChange:false                      
            };

        case(type.CLEAR_TEMP_VAR):
            return {...state,
                tempTaskSolver:"",
                tempTask:""           
            };
            
        case(type.UNSET_POPUP):
            return {...state,
                xnewTask:-1,
                ynewTask:-1,
                popupDisplay:false,
                mouseClicked:false
            };

            
        default :
            return state
    }
}

