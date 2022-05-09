var mongoose = require("mongoose");
var key = require("../codes");
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,

  useUnifiedTopology: true,
};
mongoose.connect(key.keyMongodb, options, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(
      "========================connexion data ok=================================="
    );
  }
});
