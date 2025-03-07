const express = require("express"); //1.import the express
const app = express();              //2.create an instance of express then only we can use the methods of express
const cors = require("cors");       //3.import the cors
const db = require("./firebaseConfig"); 
 

app.use(express.json());            //4.use the express.json() method to parse the incoming request with JSON payloads
app.use(cors());                    //5.use the cors() method to enable CORS for the server we can use drifferent origin(PORT 3000 or 5000)

// 1. Welcome Route
app.get("/", (req, res) => {
    res.send("Welcome to the Employee API! Node Server started successfully.");
});

// 2. Get all employees
app.get("/employees", async (req, res) => {
    try {
        const snapshot = await db.collection("EODFOFM").get();
        let employeesDATA = [];
        snapshot.forEach((doc) => {
            employeesDATA.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(employeesDATA);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Add employee
app.post("/addemployee", async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);
        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ error: "Name and Email are required!" });   //5.we can send like a .send("name email are required!") instead of .json
        }

        const newEmployee = await db.collection("EODFORM").add(req.body);
        res.status(201).json({ message: "Employee added", id: newEmployee.id });
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// 4. Delete employee
app.delete("/deleteemployee/:id", async (req, res) => {
    try {
        await db.collection("employees").doc(req.params.id).delete();
        res.status(200).json({ message: "Employee deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// 5. Update employee
app.put("/updateemployee/:id", async (req, res) => {
    try {
        await db.collection("employees").doc(req.params.id).update(req.body);
        res.status(200).json({ message: "Employee updated" });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// 6. Get single employee
app.get("/employee/:id", async (req, res) => {
    try {
        const employee = await db.collection("employees").doc(req.params.id).get();
        if (!employee.exists) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).json({ id: employee.id, ...employee.data() });
    } catch (error) {
        console.error("Error getting employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// 7. Search employee by name
app.get("/searchemployee", async (req, res) => {
    try {
        const snapshot = await db.collection("employees").where("name", "==", req.query.name).get();
        if (snapshot.empty) {
            return res.status(200).json({ error: "Employee not found" });
        }

        let employeesDATA = [];
        snapshot.forEach((doc) => {
            employeesDATA.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(employeesDATA);
    } catch (error) {
        console.error("Error searching employee:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
