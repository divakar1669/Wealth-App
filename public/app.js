const express = require('express');
const PDFDocument = require('pdfkit');
const app = express();
const port = 3000;

app.get('/generate-pdf/endpoint', (req, res) => {
  const { data } = req.query;
  const decodedData = decodeURIComponent(data);

  // Create a new PDF document
  const doc = new PDFDocument();
  generateHeader(doc);
  doc.fontSize(24).text(decodedData, 100, 100);
  generateFooter(doc);
  // Set the response headers for file download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
  doc.addPage();
  generateHeader(doc);
  generateContentIntrustion(doc);
  generateFooter(doc); //Stream the generated PDF as the response
  doc.pipe(res);

  doc.end();
});


function generateContentIntrustion(doc) {


	doc.fontSize(
		20,
	).text(
		'Wealth Hack : Pro Personal Finance.', 60,100,  { align: 'center', width: 500, 'font-family': 'sans-serif' }
	).fontSize
	(
		3
	).text
		('---------------------------------------------------------------------------',  { align: 'center', width: 500 });

	
	// Define the multiline text
	const multilineText = [
	"I.    Create a budget: Track income and expenses, allocate funds for essentials and discretionary spending.",
	"II.   Save and invest: Save regularly, set financial goals, and consider investing wisely",
	"III.  Minimize debt: Avoid excessive borrowing, prioritize paying off high-interest debt.",
	"IV.   Build an emergency fund: Save 3-6 months' living expenses for unexpected costs.",
	"V.    Plan for retirement: Start saving early, contribute to retirement accounts, review investments.",
	"VI.   Maintain good credit: Pay bills on time, keep credit utilization low, review credit report.",
	"VII.  Educate yourself: Learn about personal finance through books, websites, or advisors.",
	"VIII. Set financial goals: Establish short-term and long-term goals, track progress.",
	"IX.   Protect yourself: Obtain appropriate insurance coverage for health, life, and property.",
	"X.    Regularly review and adjust: Monitor spending, investments, and adapt your plan as needed."];

	// Set the font size and line height for the multiline text
	const fontSize = 10;
	const lineHeight = 2;

	// Calculate the width and height of the multiline text block
	const textWidth = 500; // Adjust the width as per your requirement
	const textHeight = doc.heightOfString(multilineText[0], { width: textWidth });

	let k = textHeight;
	// Draw the multiline text block
	for(let i in multilineText)
	{
		k=k+20;
		doc.fontSize(fontSize)
		.text(multilineText[i], 80,200+k, { width: textWidth, height: textHeight, align: 'left', lineGap: lineHeight });
	}
	

}

function generateHeader(doc) {
	doc.image('./diva-invest-solutions-low-resolution-color-logo.png', 50, 50, { width: 100 })
		.fillColor('#444444')
		.moveDown();
}

function generateFooter(doc) {
	doc.image('./images/logo-color.png', 50, 700, { width: 50 }, { align: 'left' })
		.fontSize(
			3,
		).text(
			'The Calculators are helpful for determining appropriate amounts, but they should not be relied upon solely for investment strategies. It is recommended to consult with an advisor or tax consultant before making any investment decisions.',
			90,
			680,
			{ align: 'center', width: 550 },
		).fontSize
		(
			5
		).text(
			'Diva Invest Solutions, 123 Silver Street, Chennai, TN, India, 600016', 90, 690, { align: 'center', width: 500 },
		).text(
			'--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
			90,
			700,
			{ align: 'center', width: 500 },
		).text(
			' © 2023 || Diva Invest Solutions || All rights reserved.',
			90,
			710,
			{ align: 'center', width: 500 },
		);

}




app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
  });
  