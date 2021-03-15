import React,{useEffect} from "react";
import "../../scss/base.scss";
import TableauPostIt from "../Canvas";



function Accueil(){
    return (
        <>
            <div className="card col-lg">
                <div className="header">
                    <h1>
                        Accueil
                    </h1>
                    <p>Bienvenue sur mon premier template</p>
                    <TableauPostIt/>
                </div>
            </div>
            
        </>
        )
}

export default Accueil;