const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message: "stong-reader API V1",
  });
});

app.get("/read-local-data", (req, res) => {
  fs.createReadStream("strong.csv")
    .pipe(csv())
    .on("data", (row) => {
      const {
        Data: date,
        ["Nome do treino"]: sessionName,
        ["Nome do exercício"]: exercise,
        ["Ordem da série"]: setOrder,
        Peso: kg,
        Reps: reps,
        ["Distância"]: distance,
        Segundos: seconds,
        Notas: notes,
        "Notas do treino": sessionNotes,
        RPE: rpe,
      } = row;

      console.log({
        date,
        sessionName,
        exercise,
        setOrder,
        kg,
        reps,
        distance,
        seconds,
        notes,
        sessionNotes,
        rpe,
      });
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });

  return res.json({});
});

app.put("/testground/:id", (req, res) => {
  const { id } = req.params;
  return res.json(["value1", "value2", `${id}`]);
});

app.listen(3124);
