import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data.data));
  }, []);

  return (
    <div className="card">
      <h2>Admin Panel</h2>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Org</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.organizationId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
