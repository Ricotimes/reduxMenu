import * as type from "../constants/MenuTypes";



const initialState = {
    display:true,
    hiddenClass:false,
};



export const menuReducer = (state = initialState, action) => {
    switch (action.type){
        case(type.SET_DISPLAY):
            return {...state,
                display: !state.display,
            };
        
        case(type.SET_HIDDEN_CLASS):
            return {...state,
                hiddenClass:!state.hiddenClass
            }
        
        default :
            return state
    }
}

export default menuReducer;