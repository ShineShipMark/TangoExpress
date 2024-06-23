/* expressモジュールをロードし、インスタンス化してappに代入。*/
import { error } from "console";
import express from "express";
var app = express();
//環境変数を弄るライブラリdotenvをロード
require("dotenv").config();
//MSSQLseverとやりとりするためのライブラリtediousをインポートして各APIを読み込み
import { Connection, TYPES, Request, ConnectionConfiguration } from "tedious";

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//最終的な値を受け取るための型を定義
interface array {
  [key: string]: string | number;
}

//列データを受け取るための型を定義
interface columnsProp {
  metadata: colname;
  value: string | number;
}

interface colname {
  colName: string;
}

//サーバー名などを定義
var config: ConnectionConfiguration = {
  server: "KUMOHIDE//SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "gatx105",
    },
  },
  options: {
    encrypt: true,
    database: "English_Training",
    trustServerCertificate: true,
    //最終的な結果を得るためには、下記1行が必要
    rowCollectionOnRequestCompletion: true,
  },
};

app.get("/api", function (req: express.Request, res: express.Response) {
  // 設定に従いデータベースへ接続
  function create_connection(config: ConnectionConfiguration) {
    //接続を開始する
    const connection = new Connection(config);

    // Promiseをnewした時点で引数のfunctionが実行される
    const promiseConnection: Promise<Connection> = new Promise(function (
      resolve,
      reject
    ) {
      //接続が確立できたかどうかを判断
      connection.on("connect", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
      connection.connect();
    });
    return promiseConnection;
  }

  async function run() {
    //データベースとの接続を行う
    const connection: Connection = await create_connection(config);
    //SQL文を指定して、処理を実行する関数から結果を返してもらう
    const rows: array[] = await execute(connection, "SELECT * FROM Eitango");

    //結果からランダムに3つ抽出する

    //➀配列の長さと同じ数列を作成
    const numArray: number[] = [...Array(rows.length)].map((_, i) => i + 1);
    //➁ランダムで1つ数字を抽出する
    var random1: number = Math.floor(Math.random() * (numArray.length + 1));
    const correctNumber: number = numArray[random1];

    //➂、➁で抽出した値を数列から除外する
    const filterArray: number[] = numArray.filter(
      (num) => num != correctNumber
    );

    //➄、➁➂と同様の作業を繰り返す
    var random2: number = Math.floor(Math.random() * (filterArray.length + 1));
    const correctNumber2: number = filterArray[random2];

    const filterArray2: number[] = filterArray.filter(
      (num) => num != correctNumber2
    );

    var random3: number = Math.floor(Math.random() * (filterArray2.length + 1));
    const correctNumber3: number = filterArray2[random3];

    const filterArray3: number[] = filterArray2.filter(
      (num) => num != correctNumber3
    );

    var random4: number = Math.floor(Math.random() * (filterArray3.length + 1));
    const correctNumber4: number = filterArray3[random4];

    const filterArray4: number[] = filterArray3.filter(
      (num) => num != correctNumber4
    );

    var random5: number = Math.floor(Math.random() * (filterArray4.length + 1));
    const correctNumber5: number = filterArray4[random5];

    const inCorrectArray: number[] = filterArray4.filter(
      (num) => num != correctNumber5
    );

    const correctJsonArray: array[] = [
      rows[correctNumber - 1],
      rows[correctNumber2 - 1],
      rows[correctNumber3 - 1],
      rows[correctNumber4 - 1],
      rows[correctNumber5 - 1],
    ];

    const inCorrectJsonArray: array[] = [];
    inCorrectArray.forEach((num) => inCorrectJsonArray.push(rows[num - 1]));

    const allArray: array[][] = [correctJsonArray, inCorrectJsonArray];

    res.send(allArray);
    connection.close();
  }

  function execute(connection: Connection, sql: string) {
    //非同期で処理を実行して、JSONを返す
    const promiseRun: Promise<array[]> = new Promise(function (
      resolve,
      reject
    ) {
      const request = new Request(
        sql,
        (err, rowCount, columns: columnsProp[][]) => {
          if (err) {
            reject(err);
            return;
          }
          //データを保存する配列
          let rows: array[] = [];
          //データ1行ごとに処理
          columns.forEach((column: columnsProp[]) => {
            //データを保存するためのオブジェクト(連想配列)
            let row: array = {};

            //列ごとに処理
            column.forEach((field: columnsProp) => {
              //データの値を連想配列として格納
              row[field.metadata.colName] = field.value;
            });
            //連想配列を配列に格納
            rows.push(row);
          });
          //結果を返す
          resolve(rows);
        }
      );
      //クエリを含めた処理を実行する
      connection.execSql(request);
    });
    //promiseRunの結果を返す
    return promiseRun;
  }

  run();
});

app.get("/looking", function (req: express.Request, res: express.Response) {
  const date = "'" + new Date().toLocaleDateString("sv-SE") + "'";
  function create_connection(config: ConnectionConfiguration) {
    //接続を開始する
    const connection = new Connection(config);

    // Promiseをnewした時点で引数のfunctionが実行される
    const promiseConnection: Promise<Connection> = new Promise(function (
      resolve,
      reject
    ) {
      //接続が確立できたかどうかを判断
      connection.on("connect", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
      connection.connect();
    });
    return promiseConnection;
  }

  function execute(connection: Connection, sql: string) {
    //非同期で処理を実行して、JSONを返す
    const promiseRun: Promise<array[]> = new Promise(function (
      resolve,
      reject
    ) {
      const request = new Request(
        sql,
        (err, rowCount, columns: columnsProp[][]) => {
          if (err) {
            reject(err);
            return;
          }
          //データを保存する配列
          let rows: array[] = [];
          //データ1行ごとに処理
          columns.forEach((column: columnsProp[]) => {
            //データを保存するためのオブジェクト(連想配列)
            let row: array = {};

            //列ごとに処理
            column.forEach((field: columnsProp) => {
              //データの値を連想配列として格納
              row[field.metadata.colName] = field.value;
            });
            //連想配列を配列に格納
            rows.push(row);
          });
          //結果を返す
          resolve(rows);
        }
      );
      //クエリを含めた処理を実行する
      connection.execSql(request);
    });
    //promiseRunの結果を返す
    return promiseRun;
  }
  //非同期関数を作成
  async function run() {
    //データベースとの接続を行う
    const connection: Connection = await create_connection(config);

    //SQL文を指定して、処理を実行する関数から結果を返してもらう
    let sql = "SELECT * FROM LookingBackList WHERE dates='2024-04-13'";
    try {
      const rows: array[] = await execute(connection, sql);

      //結果の文字列を配列として変換する、さらに要素を全て数値に変換する
      const stringArray = (rows[0].wrongProblem as string).split(",");
      const numArray = stringArray.map((e) => Number(e));

      //結果として返ってきた配列分(誤答した分)のデータをさらに取得する
      let sql2 = "SELECT * FROM Eitango WHERE id=" + numArray[0];
      for (let i = 1; i < numArray.length; i++) {
        sql2 = sql2 + " OR id=" + numArray[i];
      }
      const rows2: array[] = await execute(connection, sql2);

      //誤答分のデータを除いたデータを結果として取得する
      let notsql = "SELECT * FROM Eitango WHERE NOT(id=" + numArray[0] + ")";
      for (let j = 1; j < numArray.length; j++) {
        notsql = notsql.replace(")", " ") + "OR id=" + numArray[j] + ")";
      }
      const notRows: array[] = await execute(connection, notsql);

      //誤答分のデータとそれ以外のデータを配列で分けて結果として返す
      const resultRows = [rows2, notRows];
      res.send(resultRows);
    } catch {
      const resultRows = [[], []];
      res.send(resultRows);
    }
  }

  run();
});

app.get("/delete", function (req: express.Request, res: express.Response) {
  const date = "'" + new Date().toLocaleDateString("sv-SE") + "'";
  function create_connection(config: ConnectionConfiguration) {
    //接続を開始する
    const connection = new Connection(config);

    // Promiseをnewした時点で引数のfunctionが実行される
    const promiseConnection: Promise<Connection> = new Promise(function (
      resolve,
      reject
    ) {
      //接続が確立できたかどうかを判断
      connection.on("connect", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
      connection.connect();
    });
    return promiseConnection;
  }

  function execute(connection: Connection, sql: string) {
    //非同期で処理を実行して、JSONを返す
    const promiseRun: Promise<boolean> = new Promise(function (
      resolve,
      reject
    ) {
      const request = new Request(sql, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
      //クエリを含めた処理を実行する
      connection.execSql(request);
    });

    return promiseRun;
  }

  async function run() {
    //データベースとの接続を行う
    const connection: Connection = await create_connection(config);
    const sql: string = "DELETE FROM LookingBackList WHERE dates=" + date;

    try {
      const requestBool: boolean = await execute(connection, sql);
      res.send(requestBool);
    } catch {
      res.send(false);
    }
  }
  run();
});

app.post("/store", function (req: express.Request, res: express.Response) {
  const date = "'" + new Date().toLocaleDateString("sv-SE") + "'";

  const value = "'" + req.body.join(",") + "'";
  // 設定に従いデータベースへ接続
  function create_connection(config: ConnectionConfiguration) {
    //接続を開始する
    const connection = new Connection(config);

    // Promiseをnewした時点で引数のfunctionが実行される
    const promiseConnection: Promise<Connection> = new Promise(function (
      resolve,
      reject
    ) {
      //接続が確立できたかどうかを判断
      connection.on("connect", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
      connection.connect();
    });
    return promiseConnection;
  }

  // SQLの実行
  function execute(connection: Connection, sql: string) {
    //非同期で処理を実行して、JSONを返す
    const promiseRun: Promise<array[]> = new Promise(function (
      resolve,
      reject
    ) {
      const request = new Request(sql, (err) => {
        if (err) {
          reject(err);
          return;
        }
      });
      //クエリを含めた処理を実行する
      connection.execSql(request);
    });
    //promiseRunの結果を返す
    return promiseRun;
  }

  async function run() {
    //データベースとの接続を行う
    const connection: Connection = await create_connection(config);
    const rows: array[] = await execute(
      connection,
      "INSERT INTO LookingBackList (wrongProblem,dates) VALUES (" +
        value +
        "," +
        date +
        ")"
    );
  }
  run();
});

//ポート番号2022として起動する
app.listen(2022);
