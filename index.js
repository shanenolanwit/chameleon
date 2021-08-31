

const path = require("path");
const fs   = require("fs");
const { execSync } = require('child_process')
const latex = require('node-latex')

const LATEX_DIR = 'latex';
const PDF_DIR = 'pdf';

function convertToLatex(fpath){
    const filename = path.basename(fpath, path.extname(fpath));
    const dirname = path.dirname(fpath)
    const latexPath = `${LATEX_DIR}/${dirname}`
    if (!fs.existsSync(latexPath)){
        fs.mkdirSync(latexPath, { recursive: true });
    }
    try {
        console.log(`reading from ${fpath} and converting to latex`)
        const latexFile = `${latexPath}/${filename}.tex`;
        execSync(`pandoc -s ${fpath} -o ${latexFile}`);
        convertToPDF(fpath, latexFile)
    } catch (err) {
        console.error(err)
    }
}

function convertToPDF(fpath, latexFile){
    const filename = path.basename(fpath, path.extname(fpath));
    const dirname = path.dirname(fpath)
    const pdfPath = `${PDF_DIR}/${dirname}`
    
    if (!fs.existsSync(pdfPath)){
        fs.mkdirSync(pdfPath, { recursive: true });
    }
    try {
        const pdfFile = `${pdfPath}/${filename}.pdf`;
        console.log(`reading from ${latexFile} and converting to ${pdfFile}`)
        const file = fs.readFileSync(`${latexFile}`, 'utf-8')
        const output = fs.createWriteStream(`${pdfFile}`)
        const pdf = latex(file)
        pdf.pipe(output)
        pdf.on('error', err => console.error(err))
    } catch (err) {
        console.error(err)
    }
}

function convert(fpath){
    convertToLatex( fpath);
}

function traverse(directory) {
    fs.readdirSync(directory).forEach(f => {
        const abs = path.join(directory, f);
        if (fs.statSync(abs).isDirectory()) { 
            traverse(abs);
        } else {
            convert(abs)
        }
    });
}


const target = process.env.TARGET || "./manual/";
traverse(target);

