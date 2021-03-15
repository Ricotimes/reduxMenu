import React from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as categoryActions from "../action/CategoryActions";



function chooseClassName(element, active, main){
    let res = main ? "stCategory" : "subCategory"
    if(main){
        res += " Element"
    }
    if( element.key === active.key){
        return res+" Active";
    }
    return res;
}


function Category({actions,categoryState,categorys,main,key=0}){
    let res = categorys.map((element) => {
                         return (
                        <div className="categorie">
                            <div onClick={() => actions.setActive(element)}  className={chooseClassName(element, categoryState,main)} key={element.key}> 
                                <table >
                                    <tbody>
                                        <tr><td key={element.key}><i className={element.icone}></i></td><td><p className="title">{element.title}</p></td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="subCat">
                                <Category actions={actions} categoryState={categoryState} categorys={element.subCategory}/>
                            </div>
                        </div>
                    )}
                )
    return (
        res
    )
}


const mapStateToProps = (state) => ({
    categoryState : state.categoryReducer.active
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(categoryActions, dispatch),
})

const VisibleCategorie = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Category)


export default VisibleCategorie;