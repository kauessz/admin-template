import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notificacoes() {
  const dados = useAppData()
  return (
    <Layout titulo="Notificações" subtitulo="Estamos Construindo">
      <h3>{dados.nome}</h3>
    </Layout>
  )
}
