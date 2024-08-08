const connectDB = require("../database/connection");

// get data
const getSettingData = async (req, res) => {
    try {
        const Que = `SELECT * FROM setting`;
        connectDB.query(Que, (err, data) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ message: "error got from getting setting" });
            }
            return res.json(data);
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
    }
};

const addSettingData = async (req, res) => {
    try {
        const { uname, password } = req.body;

        const Que = `INSERT INTO setting (uname, password) VALUES (?,?)`;
        const data = [uname, password];

        connectDB.query(Que, data, (err, data) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ message: "error got from posting users data" });
            }
            return res.json(data);
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
    }
}

const deleteSetting = async (req, res) => {
    try {
        const { id } = req.params;
        const Que = `DELETE FROM setting WHERE id = ?`;

        connectDB.query(Que, [id], (err, data) => {
            if (err) {
                console.error(err.message);
                return res
                    .status(500)
                    .json({ message: "error got from deleting setting " });
            }
            return res.json(data);
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "internal server error" });
    }
};

module.exports = {
    getSettingData,
    addSettingData,
    deleteSetting
}
