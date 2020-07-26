import React from 'react';

interface IIntroProps{
    text: string
}

export default class Intro extends React.Component<IIntroProps>{
    public render(){
        const { text } = this.props
        return(
            <div className="App-intro">
                <span>{text}</span>
            </div>
        )
    }
}