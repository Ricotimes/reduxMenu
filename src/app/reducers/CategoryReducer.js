import * as type from "../constants/CategoryTypes";
import Accueil from "../containers/Pages/Accueil"


const initialState = {
    active:{
        key:0,
        title:"Accueil",
        icone: "fa fa-home",
        link: <Accueil/>,
        subCategory:[]
    }
};



export const categoryReducer = (state = initialState, action) => {
    switch (action.type){
        case(type.SET_ACTIVE):
            return {
                ...state,
                active: action.active
            }
        
        default :
            return state
    }
}

export default categoryReducer;