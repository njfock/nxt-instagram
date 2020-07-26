interface IPrueba {
    texto: string
    numero?: number
    booleano?: boolean
    obj?:{
        texto: string
        numero: number
        booleano: boolean
    }
    arr?: string[]
    arrN?: number[]
    arrB?: boolean[]
}

interface IUser{
    name: string
}

const fn = (x: IPrueba): IUser[] => {
   return [{name: ''}]
}

fn({texto:''})

class ClassPrueba implements IPrueba {

}