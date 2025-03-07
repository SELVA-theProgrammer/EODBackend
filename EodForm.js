const express=require("express");
const cors=require("cors");
const db=require("./firebaseConfig");

const app=express();
app.use(express.json());
app.use(cors());

//1.initial Homepage
app.get("/",(req,res)=>{
    res.send("This server is created for Handling EOD Form");
})

//2.Add an EOD details to FireStore
app.post("/adddetails",async(req,res)=>{
  try{
     console.log("Incoming Data:", req.body);
     
     await db.collection("EODFORM").add(req.body);
     res.status(200).json({message:"Eod details Added"});
  }catch(error){

  }
})

app.get("/getDetails",async(req,res)=>{
    try{
   const Snapshot= await db.collection("EODFORM").get();
   const AllData=[];
   Snapshot.forEach((doc)=>{
   AllData.push({id:doc.id,...doc.data()});
   })
    res.status(200).json(AllData);
}
catch(error){
    res.status(500).json({error:error.message});
}
})

// Start Server
const PORT = 7000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


