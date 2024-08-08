import React, { useState } from "react";
import { toast } from "react-toastify";
import { useValudasData } from "../../../context/Storage";
import "../../../assets/css/admin/main.css";
import { DeleteModal } from "../../admin/layout/Modal";
import axios from "axios";
import HOC from "../layout/HOC";

const Users = () => {
  const { users, setUsers } = useValudasData();
  const [userId, setUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // open Delete modal
  const openDeleteModal = (userId) => {
    setDeleteModalOpen(true);
    setUserId(userId);
  };

  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserId(null);
  };

  // delete user

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5665/deleteuser/${userId}`
      );
      console.log(userId, 44);
      if (response.status === 200) {
        const updateData = await axios.get("http://localhost:5665/getuser");
        const finalData = await updateData.data;
        setUsers(finalData);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <HOC />
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteUser}
        itemId={userId}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="adminleft">
              <h1>Users Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>All Users</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Skype Id</th>
                    <th>Budget</th>
                    <th>Prefer to</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{user.name}</p>
                            </td>
                            <td>
                              <p>{user.email}</p>
                            </td>
                            <td>
                              <p>{user.mobile_no}</p>
                            </td>
                            <td>
                              <p>{user.skype_id}</p>
                            </td>
                            <td>
                              <p>{user.budget}</p>
                            </td>
                            <td>
                              <p>{user.prefer}</p>
                            </td>
                            <td>
                              <p>{user.message}</p>
                            </td>
                            <td>
                              <button
                                style={{
                                  fontSize: "1.2rem",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#FD7238",
                                  padding: "0.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => openDeleteModal(user.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ color: "red" }}>
                        No portfolio data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Users;
