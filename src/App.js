import logo from './logo.svg';
import './App.css';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import MenuLeft from './component/MenuLeft'

function App(props) {
  return (
    <div>
      <Header/>
      <section id='slider'>
        <div className='container'>
          <div className='row'>
            <MenuLeft/>
            <div className="content">{props.children}</div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;
