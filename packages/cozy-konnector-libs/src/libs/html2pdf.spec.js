const { htmlToPDF, createCozyPDFDocument } = require('./html2pdf')
const cheerio = require('cheerio')

describe('htmlToPDF', () => {
  let pdf

  it('generate base documents', () => {
    pdf = createCozyPDFDocument('Generated for tests', 'https//example.com')
  })

  it('should handle simple table', () => {
    const $ = cheerio.load(`
      <div id="root">
        <table>
          <tr><td>A</td><td>B</td><td>C</td></tr>
          <tr><td>1</td><td>2</td><td>3</td></tr>
          <tr><td>1</td><td>2</td><td>3</td></tr>
          <tr><td>1</td><td>2</td><td>3</td></tr>
        </table>
      </div>
    `)

    htmlToPDF($, pdf, $('#root'))
  })

  it('should handle colspan', () => {
    const $ = cheerio.load(`
      <div id="root">
        <table>
          <tr><td>A</td><td>B</td><td>C</td></tr>
          <tr><td colspan=2>1</td><td>3</td></tr>
          <tr><td>1</td><td colspan=2>2</td></tr>
          <tr><td colspan=3>1</td></tr>
        </table>
      </div>
    `)

    htmlToPDF($, pdf, $('#root'))
  })

  it('should handle missing cell', () => {
    const $ = cheerio.load(`
      <div id="root">
        <table>
          <tr><td>A</td><td>B</td><td>C</td></tr>
          <tr><td colspan=2>1</td></tr>
          <tr><td >1</td></tr>
        </table>
      </div>
    `)

    htmlToPDF($, pdf, $('#root'))
  })

  it('should handle colspan in header', () => {
    const $ = cheerio.load(`
      <div id="root">
        <table>
          <tr><td colspan=2>A</td><td>C</td></tr>
          <tr><td>1</td><td>2</td><td>3</td></tr>
        </table>
      </div>
    `)

    htmlToPDF($, pdf, $('#root'))
  })
})