import React from 'react';
import "../../scss/menu.scss";
import Category from '../Category';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as menuActions from "../../action/MenuActions";
import App from '../../../App';
import Accueil from "./Accueil";
import PostIt from '../PostIt';

const category = [
    {
        key:0,
        title:"Accueil",
        icone: "fa fa-home",
        link: <Accueil/>,
        subCategory:[]
    },
    {
        key:1,
        title:"PostIt",
        icone: "fa fa-star",
        link: <PostIt/>,
        subCategory:[]
        
    } ,
    {
        key:2,
        title:"Rejets",
        icone: "fa fa-times",
        link: "Non implémenté",
        subCategory:[
            {
                key:21,
                title:"Rejets à traiter",
                icone: "fa fa-angry",
                link: "Non implémenté",
                subCategory:[]
            },
            {
                key:22,
                title:"Deja traité",
                icone: "far fa-smile-wink",
                link: "Non implémenté",
                subCategory:[]
            },
        ]
    },
    {
        key:3,
        title:"Tableau",
        icone: "fa fa-table",
        link: "Non implémenté",
        subCategory:[]
    },
    {
        key:4,
        title:"Reporting",
        icone: "fa fa-bars",
        link: "Non implémenté",
        subCategory:[]
    }                             
]

const menuClassSelector= (menuState) => {
    let classe="menu"
    if(menuState.hiddenClass){
        classe = classe+" hidden" 
    }
    if (!menuState.display){
        classe = classe+" dispNone" ;
    }
    return classe;
}

const appClassSelector= (menuState, connexionState) => {
    let classe="AppWindows"
    if(connexionState.loggedIn){
        if(!menuState.hiddenClass){
            classe = classe+" withMenu" 
        }
    }   
    return classe;
}

const flexClassSelector= (menuState, connexionState) => {
    let classe="main"
    if(connexionState.loggedIn){
        if(!menuState.hiddenClass){
            classe = classe+" withMenu" 
        }
    }   
    return classe;
}
const handleClick = ( actions, menuState) => {
    if(menuState.display){
        actions.setHiddenClass();
        setTimeout(function(){actions.setDisplay()},1000);
    }
    else{
        actions.setDisplay();
        setTimeout(function(){actions.setHiddenClass();},100);
        
}
    
    
}

const preRender=({actions,menuState,connexionState,categoryReducer}) => {
    if(connexionState.loggedIn){
        return (
        <div className="flexer"> 
            <button onClick={() => handleClick(actions, menuState)} className="MenuDisplayer" ><i className="fa fa-bars icone"></i>  </button>
            <div className={menuClassSelector(menuState)}>
                <Category  categorys={category} main/>
            </div>
            <div className={flexClassSelector(menuState,connexionState)}>
                <div className="container">
                    <div className="row">
                        {categoryReducer.active.link}
                    </div>
                </div>
            </div>
        </div>)
    }
    else return (
        <div >
            <App className={appClassSelector(menuState,connexionState)}/>
        </div>);
}

 function Menu({actions,menuState, connexionState,categoryReducer}) {
    return (
        <div>
            {preRender({actions,menuState,connexionState,categoryReducer})}
        </div>
    );
}

const mapStateToProps = (state) => ({
    menuState:state.menuReducer,
    connexionState:state.connexionReducer,
    categoryReducer:state.categoryReducer,
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(menuActions, dispatch),
})


const visibleMenu = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Menu)

export default visibleMenu;










