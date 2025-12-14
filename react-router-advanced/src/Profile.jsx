
import { Routes, Route, Link } from 'react-router-dom';

const Details = () => <p>Profile Details</p>;
const Settings = () => <p>Profile Settings</p>;

export default function Profile() {
  return (
    <div>
      <Link to="details">Details</Link>
      <Link to="settings">Settings</Link>
      <Routes>
        <Route path="details" element={<Details />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
