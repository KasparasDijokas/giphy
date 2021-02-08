import './App.scss';
import Gifs from './components/Gifs/Gifs';
import SearchInput from './components/SearchInput/SearchInput';
import logo from './images/giphy-logo-1.svg';

function App() {
  const getUserInput = (data) => {
    console.log(data);
  }
  return (
    <div className="app">
      <div className="container">
      <nav>
        <img src={logo} alt="logo"/>
        <h1>GIPHY</h1>
      </nav>
     <SearchInput getUserInput={getUserInput}/>
      </div>
    </div>
  );
}

export default App;
