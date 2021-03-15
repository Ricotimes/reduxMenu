import React from "react";
import {connect} from 'react-redux';
import * as connectionAction from '../../action/ConnexionAction'
import {bindActionCreators} from 'redux';
import '../../scss/connexion.scss';
import logo from '../../../logo.png'

function Connexion({actionDispatch}){

    return( 
        <div className="PageConnexion">
            <img src={logo}></img>
            <div className="mire">
                <div className="connectionForm">
                    <div className="login">
                        <p>Identifiant</p>
                        <input type="text"></input>
                    </div>
                    <div className="mdp">
                        <p>Mot de passe</p>
                        <input type="password"></input>
                    </div>
                    <button className="button" onClick={() => actionDispatch.setLogin()} > Se connecter </button>
                </div>
                <div className="info">
                    <p>Bienvenue sur le template react. Cette application a pour but d'industrialiser le processus de création de webservice</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.connexionReducer.loggedIn
})

const mapDispatchToProps = (dispatch) => ({
    actionDispatch: bindActionCreators(connectionAction,dispatch)
})

const VisibleConnexion = connect(
    mapStateToProps,
    mapDispatchToProps
)(Connexion)

export default VisibleConnexion;