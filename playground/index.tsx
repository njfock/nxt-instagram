interface IPrueba {
    texto: string
    met(x: string): number
}

class ClassPrueba implements IPrueba {
    public texto = 'Texto!'
    public met(x: string){
        return 1
    }
}