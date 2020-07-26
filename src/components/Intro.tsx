import React from 'react';

interface IIntroProps{
    text?: string
}
interface IIntroState{
    text: string
    dato: number
}

export default class Intro extends React.Component<IIntroProps,IIntroState>{
    public state = {
        dato: 1,
        text: 'Hola Mundo!'
    }

    public render(){
        let { text } = this.props
        text = text? text : this.state.text
        return(
            <p onClick={this.handleClick} className="App-intro">
                <span>{text}</span>
            </p>
        )
    }

    private handleClick = () => {
        this.setState({ text: 'Me actualice!'})
    }

}