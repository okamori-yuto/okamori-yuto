import * as fs from 'fs';

// JSONファイルを読み込む関数
function readJsonFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// オブジェクトの比較を行う関数
function compareJsonObjects(obj1: any, obj2: any): string[] {
    const differences: string[] = [];
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // キーの数が異なる場合は差分あり
    if (keys1.length !== keys2.length) {
        differences.push(`キーの数が異なります: ${keys1.length} vs ${keys2.length}`);
    }

    // 各キーの値を比較
    for (const key of keys1) {
        if (!keys2.includes(key)) {
            differences.push(`キー '${key}' は最初のオブジェクトに存在しますが、二つ目のオブジェクトには存在しません。`);
        } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            // オブジェクトまたは配列の場合は再帰的に比較
            const nestedDifferences = compareJsonObjects(obj1[key], obj2[key]);
            if (nestedDifferences.length > 0) {
                differences.push(`キー '${key}' のネストされたオブジェクトに差分があります:`);
                differences.push(...nestedDifferences.map(diff => `  - ${diff}`));
            }
        } else if (obj1[key] !== obj2[key]) {
            differences.push(`キー '${key}' の値が異なります: '${obj1[key]}' vs '${obj2[key]}'`);
        }
    }

    // 二つ目のオブジェクトに存在するが、最初のオブジェクトには存在しないキーをチェック
    for (const key of keys2) {
        if (!keys1.includes(key)) {
            differences.push(`キー '${key}' は二つ目のオブジェクトに存在しますが、最初のオブジェクトには存在しません。`);
        }
    }

    return differences;
}

// 配列の比較を行う関数
function compareJsonArrays(arr1: any[], arr2: any[]): string[] {
    const differences: string[] = [];
    if (arr1.length !== arr2.length) {
        differences.push(`配列の長さが異なります: ${arr1.length} vs ${arr2.length}`);
    }

    // 各要素を比較
    for (const item1 of arr1) {
        const found = arr2.some(item2 => compareJsonObjects(item1, item2).length === 0);
        if (!found) {
            // item1に対応するitem2が見つからない場合、item1とitem2の差分を表示
            const item2 = arr2.find(item2 => compareJsonObjects(item1, item2).length > 0);
            if (item2) {
                differences.push(`要素が一致しません: before: ${JSON.stringify(item1)}, after: ${JSON.stringify(item2)}`);
                console.log(`差分: 要素が一致しません: before: ${JSON.stringify(item1)}, after: ${JSON.stringify(item2)}`);
            } else {
                differences.push(`要素が一致しません: before: ${JSON.stringify(item1)}, after: なし`);
                console.log(`差分: 要素が一致しません: before: ${JSON.stringify(item1)}, after: なし`);
            }
        }
    }

    return differences;
}

// メイン処理
const jsonFilePath1 = './resouces/compare/before.json'; // 比較する最初のJSONファイルのパス
const jsonFilePath2 = './resouces/compare/after.json'; // 比較する二つ目のJSONファイルのパス

const jsonData1 = readJsonFile(jsonFilePath1); // 最初のJSONデータを読み込む
const jsonData2 = readJsonFile(jsonFilePath2); // 二つ目のJSONデータを読み込む

let differences: string[] = [];

if (Array.isArray(jsonData1) && Array.isArray(jsonData2)) {
    differences = compareJsonArrays(jsonData1, jsonData2);
} else {
    differences = compareJsonObjects(jsonData1, jsonData2);
}

if (differences.length === 0) {
    console.log('二つのJSONデータは同じです。');
} else {
    console.log('二つのJSONデータには差分があります:');
    differences.forEach(diff => console.log(diff));
}