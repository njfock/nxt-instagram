import * as React from 'react'

const style = (block: boolean) => ({
   backgroundColor: '#00d1b2' ,
   border:'0px',
   borderRadius: '4px',
   padding: '10px 15px',
   color: '#fff',
   marginBottom: '10px',
   fontWeight: 900,
   width: block ? '100%' : undefined
})

interface IbuttonProps {
    block?: boolean
}

export default class Button extends React.Component<IbuttonProps> {
    public render(){
        const { block = false } = this.props
        return (
            <button {...this.props} style={style(block)}/>
        )
    }
}