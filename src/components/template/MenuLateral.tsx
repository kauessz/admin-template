import useAuth from "../../data/hook/useAuth";
import { IconeHome, IconeLogout, IconeSettings, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {

    const { Logout } = useAuth()

    return (
        <aside className={`flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900`}>
            <div className={`flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20`}>
                    <Logo/>

            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={IconeHome}/>
                <MenuItem url="/settings" texto="Ajustes" icone={IconeSettings}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}/>
            </ul>
            <ul>
                <MenuItem url="/notificacoes" texto="Logout" icone={IconeLogout} 
                    onClick={Logout} 
                        className={`text-red-600 dark:text-red-400
                            hover:bg-red-400 hover:text-white dark:hover:text-white`}/>
            </ul>
        </aside>
    )
}