const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON dosyasının yolu
const dataPath = path.join(__dirname, "data", "vakitler2026.json");

// JSON'u yükle
const vakitler = JSON.parse(fs.readFileSync(dataPath, "utf8"));

app.get("/viyana", (req, res) => {
    const now = new Date();

    const yil = now.getFullYear();
    const ay = String(now.getMonth() + 1).padStart(2, "0");
    const gun = String(now.getDate()).padStart(2, "0");

    const bugun = `${yil}-${ay}-${gun}`;

    const satir = vakitler.find(v => v.t === bugun);

    if (!satir) {
        return res.status(404).json({ error: "Bugünün vakti bulunamadı" });
    }

    const sonuc = {
        imsak: satir.i,
        gunes: satir.g,
        ogle: satir.o,
        ikindi: satir.k,
        aksam: satir.a,
        yatsi: satir.y
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(sonuc);
});

app.listen(PORT, () => {
    console.log("Viyana Namaz API çalışıyor: " + PORT);
});

app.get("/", (req, res) => {
  res.send("Viyana 2026 API çalışıyor");
});
