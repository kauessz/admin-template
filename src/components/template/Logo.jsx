import torneio from '../../../imagens/icon.svg'

export default function Logo() {
    return (
        <div className={`flex flex-col items-center justify-center h-16 w-16`}>
            <img src={torneio} />
        </div>
    )
}