import * as type from "../constants/ConnexionTypes";



const initialState = {
    loggedIn:false
};



export const connexionReducer = (state = initialState, action) => {
    
    switch (action.type){
        case(type.SET_LOGIN):
            return {...state,
                loggedIn: !state.loggedIn
            }
        
        default :
            return state
    }
}

export default connexionReducer;