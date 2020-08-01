import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import Container from '../../components/Container'
import Post from '../../components/Post'
import * as postDuck from '../../ducks/Posts'

interface INewsFeedProps{
    fetchPosts: () => void
    fetched: boolean
    loading: boolean
    data:postDuck.IDataPosts
}
class NewsFeed extends React.Component<INewsFeedProps> {
    constructor(props: INewsFeedProps){
        super(props)
        const { fetchPosts, fetched } = props
        if(fetched){
            return
        }
        fetchPosts()
    }
    public render(){
        //const { data } = this.props
        return(
            <Container>
                <div style={{ margin: '0 auto'}}><Post image={'http://placekitten.com/300/200'}/></div>
                <div style={{ margin: '0 auto'}}><Post image={'http://placekitten.com/300/200'}/></div>
                
            </Container>
            
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postDuck, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)