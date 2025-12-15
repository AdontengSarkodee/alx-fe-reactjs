// src/components/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6">
      <h1>Home Page</h1>

      <p>Examples:</p>
      <ul>
        <li><Link to="/profile">Go to Profile (Protected)</Link></li>
        <li><Link to="/posts/15">View Post #15</Link></li>
      </ul>
    </div>
  );
}
