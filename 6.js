const express = require('express');
const eta = require("eta");
const { is } = require('express/lib/request');
const port = 8000;

app = express();
app.use(express.urlencoded({extended: true}));
app.engine("eta", eta.renderFile);
app.set("views","./views");

lastBerechnungen = [];

app.get("/Error", (req, res)=>{
    console.log("Get Error");
    res.render("aufgabe6error.eta");
});

app.get("/EasterEgg", (req, res)=>{
    console.log("EasterEgg");
    res.render("aufgabe6easter.eta");
});

app.get("/", (req, res)=>{
    console.log("Get Request");
    res.render("aufgabe6.eta", {ergebnis: "", lastRechnungen: lastBerechnungen});
});

app.post("/", (req, res)=>{
    console.log("Post Request with");
    console.log(req.body);
    erg = NaN
    if(Number(req.body.Zahl1) == 42 || Number(req.body.Zahl2) == 42){
        res.redirect("/EasterEgg");
    }else{
        if(req.body.Rechenzeichen == "*"){
            erg = Number(req.body.Zahl1) * Number(req.body.Zahl2);
        }else if(req.body.Rechenzeichen =="+"){
            erg = Number(req.body.Zahl1) + Number(req.body.Zahl2);
        }else if(req.body.Rechenzeichen == "/"){
            if(Number(req.body.Zahl2) != 0){
                erg = Number(req.body.Zahl1) / Number(req.body.Zahl2);
            }
        }else if(req.body.Rechenzeichen == "-"){
            erg = Number(req.body.Zahl1) - Number(req.body.Zahl2);
        }
        if(isNaN(erg)){
            res.redirect("/Error");
        }else{
            lastBerechnungen.push(req.body.Zahl1 + req.body.Rechenzeichen + req.body.Zahl2 + "=" + erg);
            res.render("aufgabe6.eta", {ergebnis: erg, lastRechnungen: lastBerechnungen});
        }   
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    });
