// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start')
const count = document.getElementById('count');
const typednumber = document.getElementById('typednumber');
const endtyped = document.getElementById('endtyped');

// 複数のテキストを格納する配列/*-----------------------------------------------------------------------*/
const textlists = [
   'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

// ランダムなテキストを表示/*-----------------------------------------------------------------------*/
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

// console.log(Math.floor(Math.random() *textlists.length));
let random = Math.floor(Math.random() *textlists.length);

 untyped = textlists[random];
 untypedfield.textContent = untyped;
};

// キー入力の判定/*-----------------------------------------------------------------------*/
const keyPress = e => {
  // console.log(e.key);

  // 間違いタイプの場合 
   if(e.key !== untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    // 100ms後に背景を元に戻す
    setTimeout( () => {
      wrap.classList.remove('mistyped');
    },100);
    return;
   }

  // 正タイプの場合
  typed +=untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  //スコアのインクレメント 
   score++;

  // タイプ文字数のカウント
   typednumber.textContent = score;

  // テキストGAなくなったら新しいテキストを表示
  if(untyped == ''){
    createText();
  }
};

// タイピングスキルのランクを表示
const rankCheck = score => {

  // スコアの値を返す
  // return `${score}文字打てました！`;

  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  }
  else if(score<200){
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  }
  else if(score<300){
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  }
  else if(score>=300){
    text = `あなたのランクはSです。おめでとうございます。`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ /【キャンセル】終了`;
};


// ゲーム終了
const gameOver = id => {

  clearInterval(id);
  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true){
    window.location.reload();
  }
};

// カウントダウンタイマー/*-----------------------------------------------------------------------*/
const timer = () => {
  // タイマー部分のHTML要素を取得する
  let time = count.textContent;
  const id = setInterval(()=>{
    
    // count down
    time--;
    count.textContent = time;
    // stop timer
    if(time <= 0) {

      // タイムアップの表示
      typed = '';
      typedfield.textContent = typed;
      untyped = '';
      untypedfield.textContent = untyped;
      endtyped.textContent = 'タイムアップ！';
      wrap.classList.add('finishtyped');
      
      
      // clearInterval(id);
      setTimeout( () => {
        gameOver(id);
      },500);
    
      
    }

  },1000);

    
};

// ゲームスタートの処理/*-----------------------------------------------------------------------*/
start.addEventListener('click',()=> {
  // start Timer
    timer();
  // ランダムなテキストを表示
    createText();
  // スタートボタンを非表示にする
    start.style.display = 'none'
  // キーボードイベントの処理
    document.addEventListener('keypress',keyPress);

});
untypedfield.textContent = 'スタートボタンで開始';
