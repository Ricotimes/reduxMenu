import { bindActionCreators } from "@reduxjs/toolkit";
import {connect} from 'react-redux';
import {useEffect} from "react";
import "../scss/canvas.scss";
import * as canvasActions from "../action/CanvasActions";
import {InputText} from 'primereact/inputtext';






//---------------------------------------------------------------------------------------------------------------------------
//                                     Canvas drawing Functions
//---------------------------------------------------------------------------------------------------------------------------



const addBreack=(str,ctx,x,y) => {
    let strTab = str.match(/.{1,25}/g);
    var Y=y;
    var X=x;
    // strTab.reduce(function(res,b){
    //     if((res[res.length-1]+b).length <23 ){
    //         res[res.length-1]+=" "+b
    //     }
    //     else{
    //         res = [...res,b]
    //     }
    //     return res
    // });

    strTab.map((element) => {
        ctx.fillStyle = 'rgb(0,0,0)'; 
        ctx.fillText(element, x,Y);
        Y+=20;
    });
    
}

const drawPostIt=(x,y,i,j,task,TaskSolver,canvas) => {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        task = "Tache : " + task;
        TaskSolver= "Choisi par : "+TaskSolver;

        ctx.font = '15px Papyrus';
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
                             Math.floor(255 - 42.5 * j) + ', 0)';
        ctx.fillRect(x, y, 200, 200);
        ctx.fillStyle = 'rgb(0,0,0)'; 
        addBreack(task,ctx,x+20,y+50);
        ctx.fillText(TaskSolver, x+20,y+160,400);
    }
}

const getColor=()=> {
    return Math.floor(Math.random() * Math.floor(4));
  }

// const handleCanvasClic=(event,canvas) =>{
//     let x = event.nativeEvent.layerX 
//     let y = event.nativeEvent.layerY

//     drawPostIt(x,y,getColor(),getColor(), "Default Task","SuperCC",canvas);
// }

const findPostItSelected=(e,stateCanvas) => {
    
    let x = e.nativeEvent.layerX 
    let y = e.nativeEvent.layerY
    let postIt = stateCanvas.filter((element) => 
        element.x<x & element.x+200>x & element.y<y & element.y+200>y
    ).reduce((maxKey,element) => Math.max(element.key, maxKey),-1)
    return postIt
}

//---------------------------------------------------------------------------------------------------------------------------
//                                     Event Handler
//---------------------------------------------------------------------------------------------------------------------------


const startMoving=(e,actions,stateCanvas,stateMouse) => {
    let selected = findPostItSelected(e,stateCanvas)
    actions.setMouseClick(e,selected);
}

const finishMoving=(e,actions,stateCanvas,stateMouse) => {
    if(e.nativeEvent.layerX <40 & stateMouse.idTaskSelected!==-1){
        deleteTaskfunc(actions,stateMouse)
    }
    if( (Math.abs(stateMouse.initX-e.nativeEvent.layerX)<2 ) & ( Math.abs(stateMouse.initY-e.nativeEvent.layerY)<2) ){
        let x = e.nativeEvent.layerX 
        let y = e.nativeEvent.layerY
        actions.setPopup(x,y);
    }
    else{
        actions.setMouseUnclick();
    }
}


const Moving=(e,actions,stateCanvas,stateMouse) => {
    let x = e.nativeEvent.layerX 
    let y = e.nativeEvent.layerY
    if(stateMouse.idTaskSelected!== -1){
       actions.modifyPosition(x,y,stateMouse.idTaskSelected); 
    }
}



const addTaskfunc = (actions,stateMouse) => {
    actions.addTask(
        {
            x:stateMouse.xnewTask,
            y:stateMouse.ynewTask,
            color1:getColor(),
            color2:getColor(),
            text:stateMouse.tempTask,
            taskSolver:stateMouse.tempTaskSolver
        }
    )
    cancel(actions)
}

const modifyTaskfunc = (actions,stateMouse) => {
    actions.modifyTask(stateMouse.idTaskSelected,stateMouse.tempTask,stateMouse.tempTaskSolver)
    cancel(actions)
}

const deleteTaskfunc = (actions,stateMouse) => {
    console.log(stateMouse)
    actions.removeTask(stateMouse.idTaskSelected)
    cancel(actions)
}

const cancel = (actions)=>{
    actions.unsetPopup();
    actions.setMouseUnclick();
    actions.clearTempVar();
}




//---------------------------------------------------------------------------------------------------------------------------
//                                     POPUP DISPLAY
//---------------------------------------------------------------------------------------------------------------------------



const addPopup = ({actions,stateCanvas,stateMouse}) =>{
    if(stateMouse.idTaskSelected===-1 & stateMouse.popupDisplay){
        return (
        <div>
            <span className={stateMouse.popupDisplay ? "popup" : "popup hidden"}>
                <div className={stateMouse.popupDisplay ? "formPopup" : "formPopup hidden"}>
                    <h3>Ajoutez une Tâche</h3>
                    <InputText onChange={(e) => actions.setTempTask(e.target.value)}  placeholder="Tâche"/>
                    <InputText onChange={(e) => actions.setTempTaskSolver(e.target.value)}  placeholder="Réalisé par"/>
                    <div className="contButton">
                        <button className="button standard" onClick={() => cancel(actions)}>Annuler</button>
                        <button className="button success" onClick={() => addTaskfunc(actions,stateMouse)}>Ajouter</button>
                    </div>
                </div>
            </span>
            <span><div className={stateMouse.popupDisplay ? "Background" : "Background hidden"}></div></span>
        </div>)
    }
    else return true;
}




const modifyPopup = ({actions,stateCanvas,stateMouse}) =>{
    
    if(stateMouse.idTaskSelected!==-1  & stateMouse.popupDisplay){ 
        let taskToModify = stateCanvas.filter((task) => task.key===stateMouse.idTaskSelected)[0]              //TODO : GERER LES INPUTS VIA PRIMEREACT
        if(stateMouse.initChange){
            actions.setTempTask(taskToModify.text);
            actions.setTempTaskSolver(taskToModify.taskSolver)
        }
        return (
            <div>
                <span className={stateMouse.popupDisplay ? "popup" : "popup hidden"}>
                    <div className={stateMouse.popupDisplay ? "formPopup" : "formPopup hidden"}>
                        <h3>Modifier une tache</h3>
                        <InputText onChange={(e) => actions.setTempTask(e.target.value)} value={stateMouse.tempTask} placeholder="Tâche"/> 
                        <InputText onChange={(e) => actions.setTempTaskSolver(e.target.value)} value={stateMouse.tempTaskSolver} placeholder="Réalisé par"/>
                        <button className="button danger" onClick={() => deleteTaskfunc(actions,stateMouse)}><i className="fa fa-trash"/>Supprimer</button>
                        <div className="contButton">
                            <button className="button standard" onClick={() => cancel(actions)}>Annuler</button>
                            <button className="button success" onClick={() => modifyTaskfunc(actions,stateMouse)}>Modifier</button>
                        </div> 
                    </div>          
                </span>
                <span><div className={stateMouse.popupDisplay ? "Background" : "Background hidden"}></div></span>
            </div>)
    }
    else return true
}

//---------------------------------------------------------------------------------------------------------------------------
//                                     Component
//---------------------------------------------------------------------------------------------------------------------------


function CanvasPostIt({actions,stateCanvas,stateMouse}){
    let width=1400
    let height=1000
    // Use effect est lancé juste après l'apparition d'un composant
    useEffect(() =>
    {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(230,230,230)'; 
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'rgb(230,100,100)'; 
        ctx.fillRect(0, 0, 40, height);
        stateCanvas.map((postIt) => drawPostIt(postIt.x,postIt.y,postIt.color1,postIt.color2,postIt.text,postIt.taskSolver,canvas))
    })
    return (
        <div>
            <canvas className="canvas"
            id="canvas"
            width={width} height={height}
            onMouseDown={(e) => startMoving(e,actions,stateCanvas,stateMouse)}
            onMouseUp={(e) => finishMoving(e,actions,stateCanvas,stateMouse)}
            onMouseMove={(e) => Moving(e,actions,stateCanvas,stateMouse)}> 
            </canvas>
            
            {modifyPopup({actions,stateCanvas,stateMouse})}
            {addPopup({actions,stateCanvas,stateMouse})}

                
            
        </div>
    )
}

//---------------------------------------------------------------------------------------------------------------------------
//                                     Redux Connection
//---------------------------------------------------------------------------------------------------------------------------


const mapStateToProps = (state) => ({
    stateCanvas:state.canvasReducer,
    stateMouse:state.canvasMouse
})


const mapDispatchToProps = (dispatch) => ({
    actions:bindActionCreators(canvasActions,dispatch)
})


const VisiblePostIt = connect(
    mapStateToProps,
    mapDispatchToProps
)(CanvasPostIt)

export default VisiblePostIt;