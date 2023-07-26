import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Contato from './pages/Contato/Contato'
import Products from './pages/Products/Products'
import Product from './pages/Product/Product'

// Components
import Header from './components/Header'
import Aside from './components/Aside'
import Footer from './components/Footer' 
import Breadcrumb from './components/Breadcrumb'


function App() {

  return (  
        <div className='app'>
          <BrowserRouter>
            <Header />
            <Breadcrumb />
            <div className='container'>
              <Aside />
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/products' element={<Products />}></Route>
                <Route path='/products/product:id' element={<Product />}></Route>
                <Route path='/products/camisetas' element={<Products />}></Route>
                <Route path='/products/calcas' element={<Products />}></Route>
                <Route path='/products/sapatos' element={<Products />}></Route>
                <Route path='/Contato' element={<Contato />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
          <Footer />
        </div> 
    
  )
}

export default App
