import express from "express"
import cors from "cors"
import { MercadoPagoConfig, Preference } from "mercadopago"

const client = new MercadoPagoConfig({
  accessToken: "TEST-7412840046377736-112209-aa596de8c4acbeafbe70ce88ad8cdc02-18538904",
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: "Test",
          unit_price: Number(100),
          quantity: Number(1),
          currency_id: "ARS",
        },
      ],
      backUrls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: approved,
    }
    const preference = new Preference(client);
    const result = await preference.create(body);
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