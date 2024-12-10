import { useState, useEffect } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import { fetchUsers, createUser } from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleAddUser = (userData) => {
    createUser(userData).then((newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="parkinsans-font">Users</h1>
      <Form
        onSubmit={handleAddUser}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
        ]}
      />
      <Table columns={["name", "email"]} data={users} />
    </div>
  );
};

export default UsersPage;
