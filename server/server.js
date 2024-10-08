const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require('./routes/htmlRoutes')(app);
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
