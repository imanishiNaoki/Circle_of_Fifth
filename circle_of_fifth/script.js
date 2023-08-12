'use strct';

const circleCreate = (one, two, three) => {
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
  for (let i = 1; i < 8; i++) {
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
  //ディミニッシュ
  for (let i = 1; i <= Object.keys(three).length; i++) {
    code += `<div class="circle_note" data-round="3" data-position="${i}">${three[i]}</div>`;
  }
  target2.insertAdjacentHTML('beforeend', code);
};
const circleEvent = (eventTarget) => {
  //クラスの表示制御するためにターゲットを定義
  let circle = document.querySelector('.circle');
  let cadence = document.querySelector('.circle_cadence_area');
  let cadenceNote = document.querySelectorAll('.circle_cadence');
  for (let i = 0; i < eventTarget.length; i++) {
    //各ボタンにイベントを付与
    eventTarget[i].addEventListener('click', function (e) {
      //data属性の取得
      let position = e.target.dataset.position - 1;
      let data = e.target.dataset.round;
      let dimArray = document.querySelectorAll('[data-round="3"]');
      let dim = document.querySelector(`[data-round="3"][data-position="${position + 1}"]`);
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
      //dimのアクティブを削除
      for (let l = 0; l < dimArray.length; l++) {
        dimArray[l].classList.remove('is-active');
      }
      //選択要素だけにis-activeを付与してアクティブ表示
      dim.classList.add('is-active');
      //クリックしたキーにあわせてアクティブコード表示を変更する
      if (data != 1) {
        cadence.classList.remove('majar');
        cadence.classList.add('minor');
      } else {
        cadence.classList.remove('minor');
        cadence.classList.add('majar');
      }
      getKey(text);
    });
  }
};

const getKey = (text) => {
  let key = document.querySelector('#js-focus');
  let diatonicTitle = document.querySelector('#js-diatonicTitle');
  key.innerText = text;
  //diatonicTitle.innerText = `${text} ダイアトニックコード`;
};

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

async function main() {
  url = 'masterData.json';
  const jsonData = await fetch(url);
  const res = await jsonData.json();
  //コード関連
  const symbol = res.symbol;
  const notes = res.notes;
  const chord = res.chord;

  //五度圏表の作成
  const circleOne = res.circle.one;
  const circleTwo = res.circle.two;
  const circleThree = res.circle.three;
  circleCreate(circleOne, circleTwo, circleThree);

  //五度圏表のボタンにイベント設定
  const eventTarget = document.querySelectorAll('.circle_note');
  circleEvent(eventTarget);

  //ツールチップの作成
  const tool = res.tool;
  createTool(tool);
}
main();
