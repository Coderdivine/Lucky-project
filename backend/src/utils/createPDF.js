const fs = require("fs");
const pdfCreator = require("pdf-creator-node");
const htmlTemplate = fs.readFileSync(`${__dirname}/report.html`, "utf8");

class ReportPrinting {
  constructor() {
    return;
  }

  async createPDF(details) {

    const data = {
      details,
    };

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "10mm",
        contents:
          '<div style="text-align: center;">Enugu Population Census</div>',
      },
      footer: {
        height: "10mm",
        contents: {
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        },
      },
    };

    const document = {
      html: htmlTemplate,
      data: data,
      path: "./output.pdf",
    };

    const generatedPDF = await pdfCreator.create(document, options);
    return generatedPDF?.filename || null;
  }

}

module.exports = new ReportPrinting();
