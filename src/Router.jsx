import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { SearchResult } from './pages/SearchResult';
import ShowItem from './pages/Showitem';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/items' element={<SearchResult />}></Route>
        <Route path='/items/:id' element={<ShowItem />}></Route>
      </Route>
    </Routes>
  )
}
