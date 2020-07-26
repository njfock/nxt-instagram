interface IPrueba<T>{
    data: T
}

interface IData<T>{
    name: string
    email: T
}

type UserState = IPrueba<IData<string>>

const x: UserState

x.data.email