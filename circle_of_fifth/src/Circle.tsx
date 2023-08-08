import { useState, useEffect } from 'react';

function Circle() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    async function json() {
      const res = await fetch('note.json');
      const json = await res.json();
      setData1(json.one);
      setData2(json.two);
      setData3(json.three);
    }
    json();
  }, []);
  return (
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
      {Object.values(data1).map((item, index) => (
        <div className="circle_note" data-position={index + 1} key={index}>
          {item}
        </div>
      ))}
      {Object.values(data2).map((item, index) => (
        <div className="circle_note" data-position={index + 13} key={index}>
          {item}
        </div>
      ))}
      {Object.values(data3).map((item, index) => (
        <div className="circle_note is-active" data-position={index + 25} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
export default Circle;
