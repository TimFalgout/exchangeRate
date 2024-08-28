import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// render initial page index.ejs
app.get("/", (req, res) => {
    res.render("index");
});

// get exchange rate from API and insert two currencies picked from dropdowns in index.ejs
app.get('/getExchangeRate', async (req, res) => {
    const { baseCurrency, targetCurrency } = req.query;
  
    const apiURL = `https://v6.exchangerate-api.com/v6/b4b259f7bf42cd46193187e2/pair/${baseCurrency}/${targetCurrency}`;
    try {
      const response = await axios.get(apiURL);
      res.json({
        rate: response.data.conversion_rate,
        base: baseCurrency,
        target: targetCurrency
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching exchange rate' });
    }
  });
  

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})