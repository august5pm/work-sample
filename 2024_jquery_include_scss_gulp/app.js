const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'), console.error);
});

app.listen(8000, () => console.info('>>>>>>>>>>>> 서버 실행'));
