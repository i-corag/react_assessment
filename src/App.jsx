import { Routes, Route } from 'react-router-dom';
import Header from '../src/components/Header'
import Home from '../src/components/Home';
import Footer from '../src/components/Footer';
import PaginatedPosts from '../src/components/PaginatedPosts';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<PaginatedPosts />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
