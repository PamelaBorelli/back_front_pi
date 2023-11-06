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
import figura_dash from "./imagens/figura_dash.png"; 
import { Link } from "react-router-dom"; 


function Header() {
  return (
    <header>
      <Link to="/"> 
        <img className="logo" src={logo_nome} alt="Logo" />
      </Link>

      <div className="menu">
        <Link to="/login"> <img className="figura_dash" src={figura_dash} alt="figura_dash" /> </Link>
      </div>
    </header>
  );
}

export default Header;

