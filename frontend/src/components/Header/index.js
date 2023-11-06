// import { Link } from 'react-router-dom';
// import './style.css';
// import React from "react";
// import logo_nome from "./logo_nome.png"; // importa a imagem

// function Header() {
//   return (
//     <header>
//       <img className="logo" src={logo_nome} alt="Logo" />
//       <div className="menu">
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </header>
//   );
// }

// export default Header;

import './style.css';
import React from "react";
import logo_nome from "./imagens/logo_nome.png"; 
import icone_entrar from "./imagens/icone_entrar.png"; 
import { Link } from "react-router-dom"; 


function Header() {
  return (
    <header>
      <Link to="/"> 
        <img className="logo" src={logo_nome} alt="Logo" />
      </Link>

      <div className="menu">
        <Link to="/login"> <img className="icone_entrar" src={icone_entrar} alt="icone_entrar" /> </Link>
      </div>
    </header>
  );
}

export default Header;

