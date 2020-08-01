import React from 'react';
import './App.css';
import { Route } from 'react-router'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import NewsFeed from './containers/NewsFeed'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import services from './services'

class App extends React.Component{
    public state = {
        loading: true,
    }
    public componentDidMount(){
        const { auth } = services
        auth.onAuthStateChanged(user => {
            console.log(user)
            this.setState({loading:false})
        })
    }
    public render() {
        const { loading } = this.state
        return (
            loading? 'Loading':
            <div>
                <Route exact={true} path='/' component={Login}/>
                <Route exact={true} path='/register' component={Register}/>
                <Route path='/app' component={Navbar}/>
                <Route exact={true} path='/app/newsfeed' component={NewsFeed}/>
                <Route exact={true} path='/app/profile' component={Profile}/>
            </div>
        );
    }
}

export default App;
