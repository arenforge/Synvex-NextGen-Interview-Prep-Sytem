
import './App.css'
import Header from './components/Header'
import MainComp from './components/MainComp'
import Footer from './components/Footer'
import { auth } from "./firebase";

console.log(auth);
function App() {
  return <>
  <Header/>
  <MainComp/>
  <Footer/>
  </>
}
  

export default App;
