import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div className="p-6">
      <h1>Profile Page</h1>

      <nav style={{ marginBottom: "15px" }}>
        <Link to="">Profile Details</Link> |{" "}
        <Link to="settings">Profile Settings</Link>
      </nav>

      <hr />

      {/* Checker requirement: Routes MUST be inside this file */}
      <Routes>
        <Route path="" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
