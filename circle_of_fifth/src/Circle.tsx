import { useState, useEffect } from 'react';

function Circle() {
  let keyname: string = '五度圏表よりKeyを選択してください。';
  let keytitle: string = 'Keyが選択されていません。';
  const chordTableUrl = 'chordTable.json';
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    async function json() {
      const res = await fetch('chordTable.json');
      const json = await res.json();
      setData1(json.one);
      setData2(json.two);
      setData3(json.three);
      return json;
    }
    console.log(json());
  }, []);

  const keyOnClick = () => {};
  return (
    <main className="main">
      <div className="circle">
        <div className="circle_area">
          <div className="circle_1"></div>
          <div className="circle_2"></div>
          <div className="circle_3"></div>
          <div className="circle_divide_1"></div>
          <div className="circle_divide_2"></div>
          <div className="circle_divide_3"></div>
          <div className="circle_divide_4"></div>
          <div className="circle_divide_5"></div>
          <div className="circle_divide_6"></div>
        </div>
        <div className="circle_cadence_area">
          <div className="circle_cadence note1"></div>
          <div className="circle_cadence note2"></div>
          <div className="circle_cadence note3"></div>
          <div className="circle_cadence note4"></div>
          <div className="circle_cadence note5"></div>
          <div className="circle_cadence note6"></div>
          <div className="circle_cadence note7"></div>
        </div>

        {Object.values(data1).map((item, index) => (
          <div className="circle_note" onClick={keyOnClick} data-position={index + 1} key={index}>
            {item}
          </div>
        ))}
        {Object.values(data2).map((item, index) => (
          <div className="circle_note" onClick={keyOnClick} data-position={index + 13} key={index}>
            {item}
          </div>
        ))}
        {Object.values(data3).map((item, index) => (
          <div className="circle_note" onClick={keyOnClick} data-position={index + 25} key={index}>
            {item}
          </div>
        ))}
      </div>

      <div className="key container">
        <div className="key_name">{keyname}</div>

        <div className="key_majar">
          <div className="key_title majar">{keytitle}</div>
          <div className="key_cadence_area">
            <div className="key_cadence tonic">T</div>
            <div className="key_cadence sdominant">SD</div>
            <div className="key_cadence tonic">T</div>
            <div className="key_cadence sdominant">SD</div>
            <div className="key_cadence dominant">D</div>
            <div className="key_cadence tonic">T</div>
            <div className="key_cadence dominant">D</div>
          </div>
          <div className="key_diatonic">
            {/* 
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
            <div className="key_diatonic_code" onClick={composition}></div>
 */}
            <div className="key_diatonic_composition"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Circle;
