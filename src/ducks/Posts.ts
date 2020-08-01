import { Dispatch, AnyAction } from "redux"
import { IServices } from "../services"
import { firestore } from 'firebase'

const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'

export interface IDataPosts {
    [key: string]:{
        comment: string,
        userId: string,
        createdAt: firestore.Timestamp,
        imageURL: string,
    }
}

const fetchStart = () => ({
    type: START,
})

const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: SUCCESS,
})

const fetchError = (error: Error) => ({
    type: ERROR,
    error
})

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
}

export default function reducer(state = initialState, action: AnyAction ) {
    switch (action.type){
        case START:
            return {
                ...state,
                fetching: true,
            }
        case SUCCESS:
            return {
                ...state,
                data: action.payload,
            }
        case ERROR:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
    
}

export const fetchPosts = () => 
    async (dispatch: Dispatch, getState: ()=> any, { db, storage }: IServices) => {
        dispatch(fetchStart())
        try{
            const snaps = await db.collection('posts').get()
            const posts: any = {}
            snaps.forEach(x => posts[x.id] = x.data())
            const imgIds = await Promise.all(Object.keys(posts)
            .map(async x => {
                const ref = storage.ref(`posts/${x}.jpg`)
                const url = await ref.getDownloadURL()
                return [x, url]
            }))
            const keyedImages : any = {}
            imgIds.forEach(x =>  keyedImages[x[0]] = x[1])
            dispatch(fetchSuccess(posts))
            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageURL: keyedImages[x]
            })
        }catch(e){
            dispatch(fetchError(e))
        }
    }