import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Card from '../../components/Card'
import Container from '../../components/Container'
import Title from '../../components/Title'
import RegisterForm from '../../components/RegisterForm'
import { IRegister, register as registerThunk } from '../../ducks/Users'

interface IRegisterProps {
    register: (a: IRegister)=>void
}
class Register extends React.Component<IRegisterProps> {
    public render(){
        const { register } = this.props
        return (
            <Container center={true}>
                <Card>
                    <Title>Registrar</Title>
                    <RegisterForm onSubmit={register}/>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state:any) => state

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    register: (payload: any) => dispatch(registerThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)