import express from "express"
import path from "path"
import url from "url"
import {people,products} from "./data.js"
import { get } from "http";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

// app.use(express.static("./navbar-app/public"));

// // app.get("/",(req,res)=>{
// //     res.status(200).sendFile(path.resolve(__dirname,"./navbar-app/index.html"));
// // })

// app.all("*",(req,res)=>{
//     res.status(404).send("404");
// })

app.get('/',(req,res) => {
    //res.json([{name:'john'},{name:'susan'}]);
    //res.json(products);
    res.send('<h1>Home Page</h1><br><a href="/api/products">Products</a>');
});

app.get('/api/products',(req,res) => {
    //res.json(products);

    //return only certan params
    const newProducts = products.map((product) => {
        const {id,name,image} = product;
        return {id,name,image};
    });

    res.json(newProducts);
});

app.get('/api/products/:productID',(req,res) => {

    const productID = Number(req.params.productID);
    const singleProduct = products.find((product) => product.id === productID);

    singleProduct ? res.json(singleProduct) : res.status(404).json({error:404,desc:"Product does not exist"});

    //console.log(singleProduct);
    
});

app.listen(5000,()=>{
    console.log("listening");
    
})

