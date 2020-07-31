import * as React from 'react'
import { faThumbsUp, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles= {
    button:{
        flex: 1, 
        textAlign: 'center', 
        padding: '10px 15px', 
        cursor: 'pointer',
    },
    footer:{ 
        display: 'flex', 
        backgroundColor: '#eee', 
        marginLeft:'-15px', 
        marginBottom:'-10px',
        width: 'calc(100% + 30px)',
    },
} 
export default class Footer extends React.Component {
    public render(){
        return(
            <div style={styles.footer}>
                <div style={styles.button as React.CSSProperties}> <FontAwesomeIcon icon={faThumbsUp} /> Like</div>
                <div style={styles.button as React.CSSProperties}> <FontAwesomeIcon icon={faRetweet} /> Compartir</div>
            </div>
        )
    }
}