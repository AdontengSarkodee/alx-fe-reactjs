
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Post from './Post';

const isAuth = true;
const Protected = ({ children }) => isAuth ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/profile/*" element={
          <Protected><Profile /></Protected>
        } />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}
