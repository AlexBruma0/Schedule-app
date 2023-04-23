var express = require('express');
var mongoose = require('mongoose')
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(`mongodb+srv://bruma:Canuckhead22@cluster0.egeqpgy.mongodb.net/test?retryWrites=true&w=majority`)

var db = mongoose.connection

db.on("error", console.error.bind(console,"connection error"))

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    start: {type: String},
    end: {type: String },
    date: {type: String}
})

var Item = mongoose.model("item", itemSchema)

app.post("/", async(req,res) =>{
    res.send('posted')

    var item = new Item({
        start: req.body.start,
        end: req.body.end,
        date: req.body.date
    })

    try {
        await item.save()
        console.log('done!!')
    } catch (e) {
        console.log(e.errors)
    }
})
app.get("/", async(req,res) =>{
    const result = await Item.find()
    res.json({result});

})
app.delete("/:id", async(req,res) =>{
    console.log(req.params.id)
    await Item.deleteOne({ _id: req.params.id });
})

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});