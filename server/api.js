var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017/";

var app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

 app.get("/",(req,res)=>{
    res.send('<h1> To Do</h1>');
 })

app.get("/users",(req,res)=>{
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

});

app.post("/register-user",(req,res)=>{
    var user = {
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Mobile:req.body.Mobile,
        Email:req.body.Email
    };
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("users").insertOne(user).then(()=>{
            console.log(`Task Added Successfully...`);
            res.end();
        })
    })

});

app.post("/add-task",(req,res)=>{
    var task = {
        Appointment_Id:parseInt(req.body.Appointment_Id),
        Title:req.body.Title,
        Description:req.body.Description,
        Date:new Date(req.body.Date),
        UserId:req.body.UserId
    }
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").insertOne(task).then(()=>{
            console.log(`Task Added Successfully...`);
            res.end();
        })
    })

});

app.put("/edit-task/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").updateOne({Appointment_Id:id},{$set: {Appointment_Id:id,Title:req.body.Title,Description:req.body.Description,Date:new Date(req.body.Date),UserId:req.body.UserId}})
        .then(()=>{
            console.log("Task Updated successfully..");
            res.end();
        })
    })
})

app.delete("/delete-task/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").deleteOne({Appointment_Id:id}).then(()=>{
            console.log("Task Deleted Successfully...");
            res.end();
        })
    })

});

app.get("/appointments/:userId",(req,res)=>{
    //var id = parseInt(req.params.id);
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").find({UserId:req.params.userId}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

});

app.get("/get-task/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").find({Appointment_Id:id}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

});

app.get("/appointments",(req,res)=>{
    mongoClient.connect(connectionString)
    .then(dc=>{
        var database = dc.db("todo");
        database.collection("appointments").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })

});


 app.listen(4000);
 console.log(`server  started : http://127.0.0.1:4000`);
