import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'

const style = {
   backgroundColor: '#fff' ,
   border:'1px solid #ddd',
   borderRadius: '4px',
   marginBottom: '10px',
   padding: '10px 15px',
   width: 'calc(100% - 30px)',

}

const spanStyle = {
    color: '#777',
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 900
} as React.CSSProperties

interface IInputProps{
    placeholder?: string
    label: string
}

 const Input: React.StatelessComponent<WrappedFieldProps & IInputProps> = props => {
    const { label, input } = props
    return (
        <div>
            <span style={spanStyle}>{label}</span>
            <input {...props} {...input}style={style}/>


        </div>
    )
}

export default Input