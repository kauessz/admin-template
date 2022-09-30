import useAppData from "../../data/hook/useAppData"
import BotaoTema from "./BotaoTema"
import Titulo from "./Titulo"

interface TopBarProps {
    titulo: string
    subtitulo: string
}

export default function TopBar(props: TopBarProps) {
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end`}>
                <BotaoTema tema={tema} alternarTema={alternarTema}/>
            </div>
        </div>
    )
}