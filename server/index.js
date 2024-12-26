import express from "express"
import cors from "cors"
import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create_preference", async (req, res) => {
  // console.log(req.body);
  try {
    const body = req.body;
    const preference = new Preference(client);
    const result = await preference.create({body});
    res.json({
      id: result.id,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error al crear la preferencia",
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});