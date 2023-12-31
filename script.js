'use strct';
async function home() {
  let domain = location.pathname;
  let url = '';
  if (domain.indexOf('/Circle_of_Fifth') > -1) {
    url = '/Circle_of_Fifth/masterData.json';
  } else {
    url = '/masterData.json';
  }
  const jsonData = await fetch(url);
  const res = await jsonData.json();
  //コード関連
  const symbol = res.symbol;
  const notes = res.notes;
  const chord = res.chord;
  const homeElement =
    '<div class="top"><div class="focus"><p class="focus_title"><span>Key</span></p><div class="focus_key" id="js-focus">-</div></div><div class="guide"><p class="guide_title"><span>コードの機能</span></p><p class="guide_tonic"><span class="tool" data-tool="1">トニック</span></p><p class="guide_dominant"><span class="tool" data-tool="2">ドミナント</span></p><p class="guide_sdominant"><span class="tool" data-tool="3">サブドミナント</span></p></div></div><div class="middle"><div class="circle_wrap"><p class="circle_title"><span>五度圏表</span></p><div class="circle" id="js-circle"><div class="circle_area" id="js-circleArea"></div><div class="circle_cadence_area" id="js-cadenceArea"></div></div></div></div><div class="bottom"><div class="diatonic"><p class="diatonic_title"><span>ダイアトニックコード</span></p><div class="diatonic_render"><div class="diatonic_default">五度圏表から選択したkeyのダイアトニックコードがこのエリアに表示されます。</div></div></div></div>';
  const target = document.querySelector('main');
  target.innerHTML = homeElement;

  //五度圏表の作成
  const circleOne = res.circle.majar;
  const circleTwo = res.circle.minor;
  circleCreate(circleOne, circleTwo);

  //五度圏表のボタンにイベント設定
  const eventTarget = document.querySelectorAll('.circle_note');
  circleEvent(eventTarget);
  //ツールチップの作成
  const tool = res.tool;
  createTool(tool);
}
const header = () => {
  let target = document.querySelector('.header');
  let header =
    '<h1><a href="/">初心者でも使える五度圏表アプリ</a></h1><div class="menu"><span></span><span></span><span></span></div><div class="navi_overlay"></div><ul class="navi"><li class="navi_list"><a href="#update">更新履歴</a></li><li class="navi_list"><a href="#about">このサイトについて</a></li><li class="navi_list"><a href="/">五度圏表アプリ</a></li><li class="navi_list"><a class="none" href="#dictionary">コード・スケール集</a></li><li class="navi_list"><a class="none" href="#contact">お問い合わせ</a></li></ul>';
  target.innerHTML = header;

  let menu = document.querySelector('.menu');
  let overlay = document.querySelector('.navi_overlay');
  let navi = document.querySelector('.navi');
  let list = document.querySelectorAll('.navi_list');

  menu.addEventListener('click', function (e) {
    if (menu.classList.contains('is-active')) {
      menu.classList.remove('is-active');
      overlay.classList.remove('is-active');
      navi.classList.remove('is-active');
    } else {
      menu.classList.add('is-active');
      overlay.classList.add('is-active');
      navi.classList.add('is-active');
    }
    e.stopPropagation();
  });

  overlay.addEventListener('click', function (e) {
    menu.classList.remove('is-active');
    overlay.classList.remove('is-active');
    navi.classList.remove('is-active');
    e.stopPropagation();
  });

  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (e) {
      menu.classList.remove('is-active');
      overlay.classList.remove('is-active');
      navi.classList.remove('is-active');
      e.stopPropagation();
    });
  }
};
const footer = () => {
  let target = document.querySelector('.footer');
  let footer = '<p>&copy;2023 <a style="text-decoration:underline" href="https://twitter.com/manishi53" target="_blank">Naoki Imanishi</a><br />Special thanks to <a style="text-decoration:underline" href="https://twitter.com/no1se_sh" target="_blank">Issei Katsunoi</a></p>';
  target.innerHTML = footer;
};
const circleCreate = (one, two) => {
  let target1 = document.querySelector('#js-circleArea');
  let target2 = document.querySelector('#js-circle');
  let target3 = document.querySelector('#js-cadenceArea');
  let code = '';

  //五度圏表の枠
  for (let i = 1; i < 4; i++) {
    code += `<div class="circle_${i}"></div>`;
  }
  //五度圏表の区切り線
  for (let i = 1; i < 7; i++) {
    code += `<div class="circle_divide_${i}"></div>`;
  }
  target1.innerHTML = code;
  code = '';

  //ダイアトニックコードの色分け
  for (let i = 1; i < 7; i++) {
    code += `<div class="circle_cadence note${i}"></div>`;
  }
  target3.innerHTML = code;
  code = '';

  //メジャー
  for (let i = 1; i <= Object.keys(one).length; i++) {
    code += `<div class="circle_note" data-round="1" data-position="${i}">${one[i]}</div>`;
  }
  //マイナー
  for (let i = 1; i <= Object.keys(two).length; i++) {
    code += `<div class="circle_note"  data-round="2" data-position="${i}">${two[i]}</div>`;
  }
  target2.insertAdjacentHTML('beforeend', code);
};
const circleEvent = (eventTarget) => {
  //クラスの表示制御するためにターゲットを定義
  let circle = document.querySelector('.circle');
  let cadence = document.querySelector('.circle_cadence_area');
  let cadenceNote = document.querySelectorAll('.circle_cadence');
  let focus = document.querySelector('#js-focus');
  for (let i = 0; i < eventTarget.length; i++) {
    //各ボタンにイベントを付与
    eventTarget[i].addEventListener('click', function (e) {
      //data属性の取得
      let position = e.target.dataset.position - 1;
      let data = e.target.dataset.round;
      let positionMaster = e.target.dataset.position;
      let text = e.target.innerText;

      for (let l = 0; l < eventTarget.length; l++) {
        //各ターゲット要素からplusクラスを根こそぎ削除
        for (let c = 0; c < eventTarget.length; c++) {
          eventTarget[l].classList.remove(`plus${c}`);
          circle.classList.remove(`plus${c}`);
          cadence.classList.remove(`plus${c}`);
        }
        //削除後に取得したpositionに合わせてクラスの設定
        eventTarget[l].classList.add(`plus${position}`);
        circle.classList.add(`plus${position}`);
        cadence.classList.add(`plus${position}`);
      }
      //アクティブ表示に設定
      for (let l = 0; l < cadenceNote.length; l++) {
        cadenceNote[l].classList.add('is-active');
      }
      //クリックしたキーにあわせてアクティブコード表示を変更する
      if (data != 1) {
        cadence.classList.remove('majar');
        cadence.classList.add('minor');
      } else {
        cadence.classList.remove('minor');
        cadence.classList.add('majar');
      }
      focus.innerHTML = text;
      createKey(text, positionMaster);
    });
  }
};
async function createKey(text, position) {
  let domain = location.pathname;
  let url = '';
  if (domain.indexOf('/Circle_of_Fifth') > -1) {
    url = '/Circle_of_Fifth/masterData.json';
  } else {
    url = '/masterData.json';
  }
  const jsonData = await fetch(url);
  const res = await jsonData.json();
  const notes = res.notes;
  const chord = res.chord;
  const feature = res.feature;
  let num = 0;
  let featureArray;
  let attr = '';
  let resultattr;
  let degree = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ'];
  let attrPattern = [
    [
      ['', 'm', 'm', '', '', 'm', 'dim'],
      ['△7', 'm7', 'm7', '△7', '7', 'm7', 'm7-5'],
    ],
    [
      ['m', 'dim', '', 'm', 'm', '', ''],
      ['m7', 'm7-5', '△7', 'm7', 'm7', '△7', '7'],
    ],
  ];
  let symbol = [
    [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '#'],
      ['', '', '#', '', '', '', '#'],
      ['', '', '#', '', '', '#', '#'],
      ['', '#', '#', '', '', '#', '#'],
      ['', '#', '#', '', '#', '#', '#'],
      ['♭', '♭', '♭', '♭', '♭', '♭', ''],
      ['♭', '♭', '', '♭', '♭', '♭', ''],
      ['♭', '♭', '', '♭', '♭', '', ''],
      ['♭', '', '', '♭', '♭', '', ''],
      ['♭', '', '', '♭', '', '', ''],
      ['', '', '', '♭', '', '', ''],
    ],
    [
      ['', '', '', '', '', '', ''],
      ['', '#', '', '', '', '', ''],
      ['', '#', '', '', '#', '', ''],
      ['#', '#', '', '', '#', '', ''],
      ['#', '#', '', '#', '#', '', ''],
      ['#', '#', '', '#', '#', '', '#'],
      ['♭', '', '♭', '♭', '♭', '♭', '♭'],
      ['♭', '', '♭', '♭', '', '♭', '♭'],
      ['', '', '♭', '♭', '', '♭', '♭'],
      ['', '', '♭', '', '', '♭', '♭'],
      ['', '', '♭', '', '', '♭', ''],
      ['', '', '', '', '', '♭', ''],
    ],
  ];
  let planeKey = text;
  let getkey = text.replace(/[m#♭ \n].*/g, '');
  const attrCheck = document.querySelector('.circle_cadence_area');
  let target = document.querySelector('.diatonic_render');
  let code = '';

  let result = attrCheck.classList.contains('majar');
  if (result) {
    //メジャー場合
    featureArray = ['0', '2', '0', '2', '1', '0', '1'];
  } else {
    //マイナーの場合
    featureArray = ['0', '2', '0', '2', '1', '2', '1'];
  }

  let key = Object.keys(notes);
  let chordName = Object.values(notes);

  for (let i = 0; i < key.length; i++) {
    if (key[i] == getkey) {
      num = i;
      break;
    }
  }
  if (result) {
    resultattr = 0;
  } else {
    resultattr = 1;
  }
  for (let c = 0; c < attrPattern[resultattr].length; c++) {
    code += '<div class="diatonic_area">';
    if (!resultattr) {
      if (c == 0) {
        code += `<div class="diatonic_sub">${planeKey} メジャーダイアトニックコード</div>`;
      }
    } else {
      if (c == 0) {
        code += `<div class="diatonic_sub">${planeKey} ダイアトニックコード</div>`;
      }
    }
    code += '<div class="diatonic_content">';

    for (let i = 0; i < chordName[num].length; i++) {
      code += '<div class="diatonic_chord_name">';
      //パターン
      if (featureArray[i] == 0) {
        attr = feature.tonic;
      }
      if (featureArray[i] == 1) {
        attr = feature.dominant;
      }
      if (featureArray[i] == 2) {
        attr = feature.sdominant;
      }
      code += `<div class="diatonic_attr ${attr}">${degree[i]}${attrPattern[resultattr][c][i]}</div>`;
      code += `<div class="diatonic_chord">${chordName[num][i]}${symbol[resultattr][position - 1][i]}${attrPattern[resultattr][c][i]}</div>`;
      code += '</div>';
    }
    code += '</div>';
    code += '</div>';
  }
  target.innerHTML = code;
  code = '';
}
const createTool = (data) => {
  const element = document.querySelectorAll('[data-tool]');
  for (let i = 0; i < element.length; i++) {
    //全ての要素にイベント設定
    element[i].addEventListener('click', function (e) {
      let code = '';
      const overlay = '<div class="tool_overlay"></div>';
      let tool = document.querySelectorAll('.tool_content');
      let overlayActive = document.querySelector('.tool_overlay');

      for (let l = 0; l < tool.length; l++) {
        tool[l].remove();
        overlayActive.remove();
      }
      if (e.target.dataset.tool != undefined) {
        let target = e.target.dataset.tool;
        let tooldata = Object.values(data)[target - 1];
        code += overlay;
        code += `<div class="tool_content">`;
        code += `<p class="tool_title">${tooldata.title}</p>`;
        code += `<p class="tool_text">${tooldata.text}</p>`;
        if (!tooldata.detail == '') {
          code += `<p class="tool_detail"><a href="${tooldata.detail.url}"target="_blank">${tooldata.detail.title}</a></p>`;
        }
        code += `</div>`;
        e.target.insertAdjacentHTML('beforeend', code);
        code = '';
      }
    });
  }
};
const about = () => {
  const target = document.querySelector('main');
  let code = '';

  code += '<div class="end">';
  code += '<h1>このサイトについて</h1>';
  code += '<p><span class="bold">初心者でも使える五度圏表アプリ</span>に興味を持っていただきありがとうございます。<br>本Webアプリケーション製作者の今西です。</p>';
  code += '<p>軽い自己紹介をさせていただきますと、兵庫県出身アラサーの現役フロントエンドエンジニアです。</p>';
  code += '<p>趣味は最近はあまりできていませんが、YouTubeに演奏動画を上げることで、細々と活動しております。</p>';
  code += '<br><p>さて、私のバックグラウンドを少し語らせていただいたところで本題の<span class="bold">このサイトについて</span>をお話しさせていただきます。</p>';
  code += '<p>このサイト、アプリケーションのターゲットは<span class="bold">作曲をしてみたいが理論をあまり知らない初心者の方</span>です。いざ作曲しようと思っても理論を覚えるのがめんどくさい、Keyに対してダイアトニックコードが何になるかわからない、何度か勉強したけど挫折してその度に忘れた、みたいな作曲する上での問題を少しでも解決できればいいな〜　をざっくりとした目標としています。</p>';

  code += '<br><p>先駆者様がいろんな音楽理論の解説をしていますが、初心者ではなかなか情報の取捨選択は難しいと感じております。<br>またwebページの都合上、解説は1Pに対して1つの解説になるのが基本で（たとえばメジャーキーのダイアトニックコードの機能についてとか）、<span class="bold" >初心者が曲を作ろうとするには何ページも跨いで見る必要があるため余計な画面遷移が発生してしまい結構めんどくさい</span>と私は感じました。</p>';
  code += '<p>そこで私は、<span class="bold">「じゃあ五度圏表からKeyを選択したらダイアトニックコードが表示されるWebページを作れば良くないか？忘れやすい用語とかもすぐ見れるようにクリックしたら表示するとか、コードをクリックしたら構成音が出てきたらかなり便利なんじゃあないか？」</span>と思い作成しました。</p>';
  code += '<p><br>全ては私みたいなめんどくさがりで忘れがちな初心者の方々に向けて、作曲活動を補助するお手伝いができることをこのWebアプリケーションに期待しております。</p>';
  code += '<br><br><br>';
  code += '<p style="text-align:right">Dev/Design：<a style="text-decoration:underline" href="https://twitter.com/manishi53" target="_blank">Naoki Imanishi</a></p>';
  code += '<p style="text-align:right">Special thanks：<a style="text-decoration:underline" href="https://twitter.com/no1se_sh" target="_blank">Issei Katsunoi</a></p>';
  code += '</div>';

  target.innerHTML = code;
};
const update = () => {
  async function getJson() {
    const target = document.querySelector('main');

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let now = `${year}/${month}/${day}`;

    let code = '';
    let domain = location.pathname;
    let url = '';
    if (domain.indexOf('/Circle_of_Fifth') > -1) {
      url = '/Circle_of_Fifth/upDate.json';
    } else {
      url = '/upDate.json';
    }
    const jsonData = await fetch(url);
    const res = await jsonData.json();
    code += '<div class="end">';
    code += '<h1>更新履歴</h1>';
    for (let i = Object.keys(res.update).length - 1; i >= 0; i--) {
      if (Object.values(res.update)[i].date == now) {
        code += '<div class="update_content is-active">';
      } else {
        code += '<div class="update_content">';
      }
      code += '<p class="update_content_title">';
      code += `<span class="date">${Object.values(res.update)[i].date}</span>`;
      code += `${Object.values(res.update)[i].title}</p>`;
      code += `<div class="update_detail">${Object.values(res.update)[i].detail}</div></div>`;
    }
    code += '</div>';
    target.innerHTML = code;

    let updateContent = document.querySelectorAll('.update_content');
    for (let i = 0; i < updateContent.length; i++) {
      updateContent[i].addEventListener('click', function (e) {
        this.classList.toggle('is-active');
        e.stopPropagation();
      });
    }
  }
  getJson();
};
const dictionary = () => {
  const target = document.querySelector('main');
  let code = '';

  code += '<div class="end">';
  code += '<h1>コード・スケール集</h1>';
  code += '</div>';

  target.innerHTML = code;
};
const contact = () => {
  const target = document.querySelector('main');
  let code = '';

  code += '<div class="end">';
  code += '<h1>お問い合わせ</h1>';
  code += '</div>';

  target.innerHTML = code;
};
const router = (url) => {
  if (url.indexOf('/#about') > -1) {
    about();
  } else if (url.indexOf('/#dictionary') > -1) {
    dictionary();
  } else if (url.indexOf('/#contact') > -1) {
    contact();
  } else if (url.indexOf('/#update') > -1) {
    update();
  } else {
    home();
  }
};
async function main() {
  let url = location.href;
  let domain = '';
  if (url.indexOf('/Circle_of_Fifth') > -1) {
    domain = '/Circle_of_Fifth';
  } else {
    domain = '';
  }
  header();
  footer();

  router(url);
  let link = document.querySelectorAll('a:not(.footer a)');
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener('click', (e) => {
      router(e.target.href);
    });
  }
}
main();
