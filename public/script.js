

const textToSend=()=>{
    return document.getElementById('targetText').textContent;//htmlから読み取りたい英文を読む
}
//console.log(document.getElementById('targetText').textContent);

//HTTP postリクエストを行い、テキストデータをサーバに送る
const submitText = async () => {
    const response = await fetch('http://localhost:4000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textToSend() })
    });

    const serverResponse = await response.text();
    console.log(serverResponse);

};

//クリックされたら、英単語帳データを受け取り、htmlに書き込む
document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('chatText').textContent="単語帳作成中..."
    fetch('http://localhost:4000/user')
      .then(response => response.text())
      .then(data => {
        const obj=JSON.parse(data);
        console.log(obj.content);
        document.getElementById('chatText').textContent=obj.content;
        //alert(data);
      })
      .catch((error) => console.error('Error:', error));
  });
  

submitText();