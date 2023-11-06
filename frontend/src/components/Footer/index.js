import './style.css';
import React from "react";
import logo_nome from "./imagens/logo_nome.png"; 


function Footer() {
    return (
    <footer>
       

        <ul>
          <img className="logo_nome" src={logo_nome} alt="Logo" />
          <li>RUA: Irenio Greco, 201 - FRANCA-SP</li>
          <li>TELEFONE: (16) 9999-9999</li>
          <li>E-MAIL: solaire@gmail.com</li>
        </ul>

       <section className='maps'>
       <iframe title="Mapa da Fatec Franca" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.788156498571!2d-47.402882985951955!3d-20.514908762058994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0a650b93c4b5f%3A0xbe0e42f3aa42525c!2sFatec%20Franca%20-%20Faculdade%20de%20Tecnologia%20de%20Franca%20Dr%20Thomaz%20Novelino!5e0!3m2!1spt-BR!2sbr!4v1680459970193!5m2!1spt-BR!2sbr" width="400" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </section>

    </footer>
    );
  }
  
  export default Footer;