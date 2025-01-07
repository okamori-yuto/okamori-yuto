import * as fs from 'fs';
import * as path from 'path';

function splitCSV(inputFilePath: string, outputDir: string, linesPerFile: number) {
    const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
    const lines = fileContent.split('\n');
    
    let fileIndex = 0;
    for (let i = 0; i < lines.length; i += linesPerFile) {
        const chunk = lines.slice(i, i + linesPerFile).join('\n');
        const outputFilePath = path.join(outputDir, `output_${fileIndex}.csv`);
        fs.writeFileSync(outputFilePath, chunk);
        fileIndex++;
    }
}

// 使用例
const inputFilePath = 'resouces/split/input/input.csv'; // 入力ファイルのパス
const outputDir = 'resouces/split/output';
// スプレッドシートは一度に50.MBまで追加できる
const linesPerFile = 1000; // 分割する行数

splitCSV(inputFilePath, outputDir, linesPerFile);
console.log('CSVファイルの分割が完了しました。');