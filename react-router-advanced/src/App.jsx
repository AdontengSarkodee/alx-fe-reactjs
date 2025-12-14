
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const isAuth = true;

const Protected = ({ children }) => isAuth ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/profile" element={
          <Protected><h1>Profile</h1></Protected>
        } />
        <Route path="/post/:id" element={<h1>Dynamic Post</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
