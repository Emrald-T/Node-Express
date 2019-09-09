const express = require("express")
// const createError = require("http-errors");
const listRouter = require("./routes/list");

// Initialize the Server
var app = express();
// view engine setup - use 'ejs' template engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
// Middleware
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.use("/", listRouter)
app.use("/add2List", listRouter)
app.use("/deleteItem", listRouter)
app.use("/completeItem", listRouter)

// Start the Server
const server = app.listen(3000, () => {
   console.log("Example app listening at http://localhost:%s", server.address().port);
})
