import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import Card from '../../components/Card'
import Container from '../../components/Container'
import Title from '../../components/Title'
import LoginForm from '../../components/LoginForm'
import { ILogin, login as loginThunk } from '../../ducks/Users'

interface ILoginProps {
    login: (a: ILogin)=>void
}
class Login extends React.Component<ILoginProps> {
    public render(){
        const { login } = this.props
        return (
            <Container center={true}>
                <Card>
                    <Title>Iniciar sesión</Title>
                    <LoginForm onSubmit={login}/>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = (state:any) => state

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    login: (payload: any) => dispatch(loginThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)