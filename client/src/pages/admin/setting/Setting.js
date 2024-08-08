import React, { useState } from 'react';
import { useValudasData } from "../../../context/Storage";
import HOC from '../layout/HOC';
import { toast } from "react-toastify";
import { DeleteModal } from "../../admin/layout/Modal";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

const Setting = () => {
    const { settingData, setSettingData } = useValudasData();
    const [insertSetting, setInsertSetting] = useState({
        uname: "",
        password: ""
    })
    const [techStackId, setTechStackId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // inserting tech stack data
    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const InsertData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/addsettingdata`, insertSetting);
            if (response.status === 200) {
                const response = await axios.get(`${API}/getsettingdata`);
                const finelData = response.data;
                setSettingData(finelData);
                setInsertSetting({
                    uname: "",
                    password: ""
                });
                toast.success("inserted successfully");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // delete setting
    const deleteSetting = async () => {
        try {
            const response = await axios.delete(`${API}/deletesetting/${techStackId}`);

            if (response.status === 200) {
                const response = await axios.get(`${API}/getsettingdata`);
                const finelData = response.data;
                setSettingData(finelData);
                closeDeleteModal();
                toast.success("deleted successfully");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // open Delete modal
    const openDeleteModal = (techStackId) => {
        setDeleteModalOpen(true);
        setTechStackId(techStackId);
    };
    // close Delete modal
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setTechStackId(null);
    };
    return (
        <>
            <HOC />
            <DeleteModal
                isDeleteOpen={deleteModalOpen}
                onCloseDelete={closeDeleteModal}
                onDelete={deleteSetting}
                itemId={techStackId}
            />
            <section id="content">
                <main>
                    <div className="head-title">
                        <div className="adminleft">
                            <h1>Setting</h1>
                        </div>
                    </div>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Setting Data</h3>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Password</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {settingData && settingData.length > 0 ? (
                                        settingData.map((setting, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>
                                                            {setting.uname}
                                                        </td>
                                                        <td>
                                                            <p>{setting.password}</p>
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
                                                                onClick={() => openDeleteModal(setting.id)}
                                                            >
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>

                                                            <button
                                                                style={{
                                                                    fontSize: "1.2rem",
                                                                    backgroundColor: "transparent",
                                                                    border: "none",
                                                                    color: "#52a01f",
                                                                    padding: "0.5rem",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-pen"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" style={{ color: "red" }}>
                                                No portfolio data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="todo">
                            <div className="head">
                                <h3>Insert Setting</h3>
                            </div>
                            <div className="todo-list">
                                <form
                                    method="post"
                                    encType="multipart/form-data"
                                    name="insert form"
                                    onSubmit={InsertData}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: "10px",
                                    }}
                                >
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <label htmlFor="uname" className="form-label">
                                            User Name
                                        </label>
                                        <input
                                            style={{ padding: "12px 5px", fontSize: "15px" }}
                                            type="text"
                                            className="form-control"
                                            id="uname"
                                            name="uname"
                                            onChange={(e) => handleInputChange(e, setInsertSetting)}
                                            placeholder="Enter user name Here"
                                        />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            style={{ padding: "12px 5px", fontSize: "15px" }}
                                            type="text"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            onChange={(e) => handleInputChange(e, setInsertSetting)}
                                            placeholder="Enter password Here"
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor: "#fd7238",
                                                border: "none",
                                                color: "#FFF",
                                                marginRight: "5px",
                                                padding: "7px 10px",
                                                cursor: "pointer",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="submit"
                                            style={{
                                                backgroundColor: "#52a01f",
                                                border: "none",
                                                color: "#FFF",
                                                cursor: "pointer",
                                                marginLeft: "5px",
                                                padding: "7px 10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Setting
