const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// set up port
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
// add routes
const router = require('./routes/router.js');
// module.exports = router;
app.use('/api', router);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));