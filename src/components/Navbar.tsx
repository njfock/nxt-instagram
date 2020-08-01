import * as React from 'react'
import { Link } from 'react-router-dom'

import { faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const style = {
    link:{
        color: '#555',
        textDecoration:'none',
    },
    navbar:{
        borderBottom: 'solid 1px #aaa',
        padding: '10px 15px',
    },
}

export default class Navbar extends React.Component {
    public render(){
        return(
            <div style={style.navbar}>
                <Link to='/app/newsfeed' style={style.link}>
                    <FontAwesomeIcon icon={faNewspaper} /> NXT Instagram
                </Link>
                <div style={{float: 'right'}}>
                    <Link to='/app/profile' style={style.link}> 
                        <FontAwesomeIcon icon={faUser} /> Perfil
                    </Link>
                </div>
            </div>
        )
    }
}