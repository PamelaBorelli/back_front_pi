import solar_energy from "./imagens/solar_energy.jpg"
import instalacao_fotovoltaica from "./imagens/instalacao_fotovoltaica.jpg"
import mobilidade_eletrica from "./imagens/mobilidade_eletrica.jpg"
import natureza_fotovoltaica from "./imagens/natureza_fotovoltaica.jpg"
import "./style.css"

function Home() {
  return (
    <div>

      <img className="solar_energy" src={solar_energy} alt="solar_energy" />

      <div id="home"className="home">

      <img className="instalação_fotovoltaica" src={instalacao_fotovoltaica} alt="instalacao_fotovoltaica" />

      <p>A Solaire é uma empresa líder em energia fotovoltaica, comprometida com a sustentabilidade e a inovação. Nós nos esforçamos para fornecer soluções de energia limpa e eficientes, reduzindo a pegada de carbono e promovendo um futuro mais verde. Nossa responsabilidade e compromisso com nossos clientes e o planeta são inabaláveis.</p>

      <img className="mobilidade_eletrica" src={mobilidade_eletrica} alt="mobilidade_eletrica" />
      <p>Ilumine seu mundo com a energia fotovoltaica! Uma tecnologia inovadora que transforma a luz do sol em eletricidade. Graças aos avanços tecnológicos, nossos painéis solares são agora mais eficientes e acessíveis do que nunca. Diga adeus à dependência de combustíveis fósseis e abrace a sustentabilidade. A energia fotovoltaica é mais do que apenas uma solução energética, é a promessa de um futuro mais brilhante para nosso planeta. Junte-se à revolução energética hoje!</p>


      <img className="natureza_fotovoltaica" src={natureza_fotovoltaica} alt="natureza_fotovoltaica" />
      <p>Descubra a energia do futuro com a energia fotovoltaica! Economize em suas contas de energia enquanto contribui para um planeta mais verde. Com a tecnologia avançada dos painéis solares, você pode aproveitar a abundância da luz solar para gerar sua própria eletricidade. É limpo, renovável e bom para o seu bolso. Invista em energia fotovoltaica e faça parte da revolução energética sustentável! A natureza agradece e as futuras gerações também. Energia fotovoltaica, uma escolha inteligente para você e para o planeta.</p>
      </div>
    </div>
  );
}

export default Home;
