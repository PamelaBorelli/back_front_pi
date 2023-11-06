import { Link } from 'react-router-dom';


function Error() {
    return (
      <div>
        <h1>Ops, parece que a página que você está acessando não existe!</h1><br/>


        <span>Detectamos as seguintes páginas: </span><br/><br/>
        <Link to="/">Home</Link> <br/>
        <Link to="/dashboard">Dashboard</Link><br/>
        <Link to="/login">Login</Link>

        

      </div>
    );
  }
  
  export default Error;