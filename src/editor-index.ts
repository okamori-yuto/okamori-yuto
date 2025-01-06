import * as fs from 'fs';

// JSONデータを読み込む関数
function readJsonFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// JSONデータを保存する関数
function writeJsonFile(filePath: string, data: any): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// JSONデータを編集する関数
function editJsonData(filePath: string, key: string, value: any): void {
    const jsonData = readJsonFile(filePath);
    jsonData[key] = value; // 指定したキーの値を更新
    writeJsonFile(filePath, jsonData);
}

function removeFields(data: any[]): any[] {
    return data.map(item => {
        const {gengakuKubun, order, ...rest} = item
        return rest
    })
}

const inputFilePath = 'resouces/input/input-data.json'
const outputFilePath = 'resouces/output/output-data.json'

const jsonData = readJsonFile(inputFilePath)
const updatedData = removeFields(jsonData)
writeJsonFile(outputFilePath, updatedData)

console.log('JSONデータの編集が完了しました。')