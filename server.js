
//モジュール追加
const express =require("express");
const bodyParser = require('body-parser');

const app = express();
const PORT=4000;//ポート番号

app.use(bodyParser.json());
app.use(express.static("public"));//publicフォルダの静的ファイルを表示

//プロンプトの読み取り
const fs = require('fs');
const prompt=JSON.parse(fs.readFileSync('prompt.json', 'utf8')).prompt;


//chatGPT
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "api-key",//apiKeyを入力
});
const openai = new OpenAIApi(configuration);

//chatGPTのapiを使って引数textの英単語帳を作って返す
async function getCompletion(text) {
    const pronptText=`${prompt}${text}`;
    console.log(pronptText);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: pronptText}],
  });
  const DicText=completion.data.choices[0].message
  //console.log(text);
  return DicText;
}
let receivedText;
let GPTtext="aaa";
app.post('/submit', function (req, res) {
    receivedText = req.body.text;
    console.log('Received text: ' + receivedText);
    res.send("テキストデータを受け取りました");
    //res.send('Text received on server: ' + receivedText);
  });



//GPTの内容をhtmlに表示
app.get("/user",async function(req,res){//chatGPTによる英単語帳をフロントに送る
    console.log("get!");
    res.send(GPTtext=await getCompletion(receivedText));
})

app.listen(PORT,()=>console.log("サーバーが起動しました"));
