import { Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';
import { SearchResult } from './pages/SearchResult';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path='/' element={<Home />}></Route>
        <Route path='/items' element={<SearchResult />}></Route>
      </Route>
    </Routes>
  )
}
