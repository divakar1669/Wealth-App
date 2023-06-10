const express = require('express');
const PDFDocument = require('pdfkit');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/generate-pdf', (req, res) => {
  const { value1, value2 } = req.query;

  const doc = new PDFDocument({ margin: 20 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=divaInvestSolutions.pdf');

  generateHeader(doc); // Invoke `generateHeader` function.
  generateFooter(doc); // Invoke `generateFooter` function.

  doc.pipe(res);

  

  doc.end();
});


function generateHeader(doc) {
	doc.image('./diva-invest-solutions-low-resolution-color-logo.png', 50, 50, { width: 100 })
		.fillColor('#444444')
		.moveDown();
}

function generateFooter(doc) {
	doc.image('./images/logo-color.png', 50, 700, { width: 50 }, {align : 'left'})
	.fontSize(
		3,
	).text(
		'The Calculators are helpful for determining appropriate amounts, but they should not be relied upon solely for investment strategies. ]It is recommended to consult with an advisor or tax consultant before making any investment decisions.',
		90,
		700,
		{ align: 'center', width: 550},
	).fontSize
	(
		5
	).text(
		'Diva Invest Solutions, 123 Silver Street, Chennai, TN, India, 600016', 90, 710, { align: 'center', width: 500 },
	).text(
		'--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
		90,
		715,
		{ align: 'center', width: 500 },
	).text(
		' © 2023 || Diva Invest Solutions || All rights reserved.',
		90,
		720,
		{ align: 'center', width: 500 },
	);

}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


