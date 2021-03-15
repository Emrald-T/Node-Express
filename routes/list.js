const database = require("../getFirebase")
const express= require("express")
const router = express.Router()

let max_count = 0;

// Function to get the Data from database
const getData = (req, res, path) => {
  database.collection("todo").doc("ETHADA").collection("list").orderBy("Item_No", "asc").get()
  .then(snapshot => {
    let data = [];
    snapshot.forEach(doc => {
      let docData = doc.data()
      docData.ID = doc.id
      data.push(docData);
      // Save the count, so that we can increment this while adding new items
      if (docData.Item_No > max_count) {
        max_count = docData.Item_No
      }
    })
    res.statusCode = 200;
    if (path === "home") {
      res.render("home", {
        title: "User List",
        output: data
      })
    } else {
      res.render("list", {
        output: data
      })
    }
  })
  .catch(e => {
    res.statusCode = 404;
    return new Error(e);
  })
}

// Default
router.get("/", async (req, res) => {
  getData(req, res, "home")
})

// Adding new todo item
router.post("/add2List", (req, res) => {
  let newItem = req.body.todo;
  database.collection("todo").doc("ETHADA").collection("list").doc().set({
    Task: newItem,
    Completed: false,
    Priority: 1,
    Item_No: max_count + 1
  })
  .then(() => {
    getData(req, res, "list");
  })
  .catch(e => {
    res.statusCode = 404;
    return new Error(e);
  })
})

// Deleting an item
router.post("/deleteItem", (req, res) => {
  let key = req.body.value;
  database.collection("todo").doc("ETHADA").collection("list").doc(key).delete()
  .then(() => {
    getData(req, res, "list");
  })
  .catch(e => {
    res.statusCode = 404;
    return new Error(e);
  })
})

// Completing an item
router.put("/completeItem", (req, res) => {
  let key = req.body.value;
  database.collection("todo").doc("ETHADA").collection("list").doc(key).update({
    Completed: true
  })
  .then(() => {
    getData(req, res, "list");
  })
  .catch(e => {
    res.statusCode = 404;
    return new Error(e);
  })
})

module.exports = router;
