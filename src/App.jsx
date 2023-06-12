import { Routes, Route } from 'react-router-dom';
import Header from './components/Hearder';
import Home from './components/Home';
import PaginatedPosts from './components/PaginatedPosts';

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
