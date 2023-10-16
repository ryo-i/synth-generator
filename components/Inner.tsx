import React, { useState, useEffect, useRef }  from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { inner } from '../data/data.json';
import * as Tone from 'tone';

const keyWidth = 40;
const keyLlength = 52;


// CSS in JS
const ScalePlayer = styled.div`
  color: #fff;
  #key {
    max-width: calc(${keyWidth + 'px'} * ${keyLlength});
    margin: 0 auto;
    overflow-x: scroll;
    .key_inner {
      background: #333;
      width: calc(${keyWidth + 'px'} * ${keyLlength});
      display: block;
      padding: 0 0 10px;
      position: relative;
      button {
        width: ${keyWidth + 'px'};
        text-align: center;
        display: inline-block;
        &:hover {
          cursor: pointer;
        }
      }
      .w_key {
        background: #FFF;
        border: 1px solid #333;
        color: #000;
        padding:  90px 0 10px;
      }
      .b_key {
        position: absolute;
        z-index: 10;
        top: 0;
        margin: 0 -20px;
        padding: 0;
        background: #000;
        border: 1px solid #fff;
        border-top-width: 0;
        color: #fff;
        height: 75px;
      }
      .c_key {
        background: #ffe6b3;
      }
      .w_key.exclusion {
        background: #ccc;
      }
      .b_key.exclusion {
        background: #444;
      }
      .w_key.current {
        background: #edced2;
      }
      .b_key.current {
        background: #A63744;
      }
    }
  }

  #scale_text {
    margin: 15px 0;
    text-align: center;
    h2 {
      margin: 0 0 5px;
      font-size: 20px;
      color: #fff;
      line-height: 1.25;
    }
    p {
      margin: 0;
    }
    .start_button {
      margin: 0 5px 0 0;
      padding: 0;
      width: 25px;
      height: 20px;
      font-size: 10px;
      font-family: inherit;
      border-radius: 5px;
      border: 1px solid #fff;
      background: #000;
      color : #fff;
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }

  #scale_menu {
    margin: 0 auto;
    max-width: 700px;
    .react-tabs__tab-list {
      margin: 0 0 5px;
      border: none;
      font-size: 12px;
      .react-tabs__tab {
        margin: 0 5px 5px 0;
        border: 1px solid #333;
        background: #666;
        border-radius: 5px;
        &--selected {
          background: #fff;
        }
      }
    }
  }

  #key_types,
  .scale_type {
    margin: 0 auto 10px;
    max-width: 700px;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px 10px 0;
    text-align: left;
    dl {
      padding: 7px 0 7px;
      margin: 0;
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
      dt {
        font-weight: bold;
        margin: 0 0 5px;
      }
      dd {
        margin: 0;
        display: inline-block;
        font-size: 12px;
        label {
          margin: 0 10px 7px 0;
          display: inline-block;
          &:hover {
            opacity: 0.8;
            cursor: pointer;
          }
        }
        .w_key {
          font-weight: bold;
        }
        .b_key {
          font-weight: lighter;
          color: #999;
        }
      }
    }
  }

  .scale_type {
    dl {
      dd {
        @media (max-width: 400px) {
          display: block;
        }
      }
    }
  }
`;


// Component
function Inner() {
  // Hooks
  const [synth, setSynth] = useState(null);
  // const [scales, setScales] = useState([]);
  // const [scale, setScale] = useState(['-']);
  // const [keyValue, setKeyValue] = useState(inner.keyTypeButtons[0].value);
  // const [keyType, setKeyType] = useState(inner.keyTypeButtons[0].keyTypeName);
  // const [scaleInterval, setScaleInterval] = useState('-');
  // const [scaleValue, setScaleValue] = useState(inner.scaleTypes[0].scaleValue);
  // const [scaleKeys, setScaleKeys] = useState(inner.scaleTypes[0].scaleKeys.join(', '));
  // const [scaleName, setScaleName] = useState(inner.scaleTypeButtons.basicScale[0].scaleName);
  const keyElement = useRef<HTMLInputElement>(null);
  // const scaleTypeElement = useRef<HTMLInputElement>(null);
  const [keyButtons, setKeyButtons] = useState([]);


  // オブジェクト設定
  // interface scaleTypes {
  //   scaleValue: string;
  //   scaleKeys: number[];
  // };

  interface keyButtons {
    value: string;
    className: string;
    onClick: boolean;
    keyName: string;
  };

  // interface keyTypeButtons {
  //   value: string;
  //   keyTypeName: string;
  //   className: string;
  //   defaultChecked: boolean;
  // };

  // interface scaleTypeButtons {
  //   scaleValue: string;
  //   scaleName: string;
  //   defaultChecked: boolean;
  // };


  // 鍵盤データ設定
  const pushKeyButtons = () => {
    const keyButtonsData = inner.keyButtons;
    const resultArray = [];

    // Push Low Kyes
    for (let i = 0; i < keyButtonsData.low.length; i++) {
      resultArray.push(keyButtonsData.low[i]);
    }

    // Push Middole Kyes
    for (let i = 1; i < keyButtonsData.octave; i++) {
      for (let j = 0; j < keyButtonsData.middle.length; j++) {
        resultArray.push({
          value: keyButtonsData.middle[j].value + i,
          className: keyButtonsData.middle[j].className,
          keyName: keyButtonsData.middle[j].value + i
        });
      }
    }

    // Push High Kyes
    for (let i = 0; i < keyButtonsData.high.length; i++) {
      resultArray.push(keyButtonsData.high[i]);
    }

    setKeyButtons(resultArray);
  };


  // 鍵盤 & シンセ設定
  useEffect(() => {
    pushKeyButtons();
    document.querySelector('#key').scrollLeft = (keyWidth * 23);
    setSynth(new Tone.Synth().toDestination());
  },[]);


  // 鍵盤リセット
  // const resetKey = (): void => {
  //   const keyElements: HTMLCollection = keyElement.current.children;
  //   for (let i = 0; i < keyElements.length; i++) {
  //     if (keyElements[i].classList.contains('current')) {
  //       keyElements[i].classList.remove('current');
  //     }
  //   }
  // };


  // 鍵盤カレント
  // const currentKey = (currentScale): void => {
  //   const keyElements: HTMLCollection = keyElement.current.children;
  //   for (let i = 0; i < keyElements.length; i++) {
  //     const getKeyElement: HTMLButtonElement = keyElements[i] as HTMLButtonElement;
  //     const keyText: string = getKeyElement.value;
  //     if (currentScale.includes(keyText)) {
  //       keyElements[i].classList.add('current');
  //     }
  //   }
  // };


  // 最新のスケール取得
  // const getScale = (key: string, scales: string[][]): string[] => {
  //   let getCurrentScale: string[];
  //   for (let i = 0 ; i < scales.length; i++) {
  //     if (scales[i].indexOf(key) === 0) {
  //       getCurrentScale = scales[i];
  //     }
  //   }
  //   return getCurrentScale;
  // };


  // 鍵盤の構成音のテキスト取得
  // const scaleKeysText = (scale: string[]): string[] => {
  //   let scaleKeysText: string[] = [];
  //   for (let i = 0; i < scale.length; i++) {
  //     const getScaleText: string = scale[i].slice(0, -1);
  //     scaleKeysText.push(getScaleText);
  //   }
  //   return scaleKeysText;
  // };


  // 鍵盤イベント
  const keyAttack = (e) => {
    synth.triggerRelease();
    const eventTarget: HTMLButtonElement = e.target as HTMLButtonElement;
    const KeyValue: string = eventTarget.value;
    synth.triggerAttack(KeyValue, 0.4);
  };

  const keyRelease = () => {
    synth.triggerRelease();
  };


  // 再生ボタン
  // let changeScalePlay = (): void => {
  //   Tone.Transport.stop();
  //   Tone.Transport.cancel();

  //   const currentScale = scale;
  //   const synth = new Tone.Synth().toDestination();
  //   const seq = new Tone.Sequence((time, note) => {
  //     synth.triggerAttackRelease(note, '8n', time);
  //   }, currentScale).start(0);
  //   seq.loop = false;
  //   Tone.Transport.bpm.value = 80;

  //   Tone.Transport.start();
  // };

  // スケールタイプ取得
  // const getScaleTypes = (getScaleValue: string): scaleTypes => {
  //   let getScaleTypes: scaleTypes;
  //   for (let i = 0; i < inner.scaleTypes.length; i++) {
  //     if (inner.scaleTypes[i].scaleValue === getScaleValue) {
  //       getScaleTypes = inner.scaleTypes[i];
  //     }
  //   }
  //   return getScaleTypes;
  // };


  // スケール取得
  // const getScales = (scaleTypes: scaleTypes): string[][] => {
  //   let getScales: string[][] = [];
  //   for (let i = 0 ; i < inner.keyButtons.length; i++) {
  //     getScales.push([]);
  //     for (var  j = 0; j < scaleTypes['scaleKeys'].length; j++){
  //       const key: string = inner.scale[i+scaleTypes['scaleKeys'][j]];
  //       getScales[i].push(key);
  //     }
  //   }
  //   return getScales;
  // };


  // スケール構成音変更
  // const changeScaleInterval = (currentScales: string[][]): void => {
  //   const getCurrentScale: string[] = getScale(keyValue, currentScales);
  //   setScale(getCurrentScale);
  //   resetKey();
  //   currentKey(getCurrentScale);

  //   const getScalesIntervalsArray: string[] = scaleKeysText(getCurrentScale);
  //   const getScalesIntervals: string = getScalesIntervalsArray.join(', ');
  //   setScaleInterval(getScalesIntervals);
  // };


  // スケール初期設定
  // useEffect(() => {
  //   const getCurrentScaleTypes: scaleTypes = getScaleTypes(scaleValue);
  //   const getCurrentScales: string[][] = getScales(getCurrentScaleTypes);
  //   setScales(getCurrentScales);
  //   setScale(getCurrentScales[0]);
  //   changeScaleInterval(getCurrentScales);
  // },[]);


  // キー変更イベント
  // const keyTypeSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const getKeyValue: string = e.target.value;
  //   setKeyValue(getKeyValue);

  //   const scaleArray: string[] = [];
  //   scaleArray.push(getKeyValue);
  //   const getKeyTypeName = scaleKeysText(scaleArray);
  //   const getkey = getKeyTypeName[0];
  //   setKeyType(getkey);

  //   const getCurrentScale: string[] = getScale(getKeyValue, scales);
  //   setScale(getCurrentScale);
  //   resetKey();
  //   currentKey(getCurrentScale);

  //   const getScalesIntervalsArray: string[] = scaleKeysText(getCurrentScale);
  //   const getKeyType: string = getScalesIntervalsArray[0];
  //   const getScalesIntervals: string = getScalesIntervalsArray.join(', ');
  //   setKeyType(getKeyType);
  //   setScaleInterval(getScalesIntervals);
  // }


  // スケール変更イベント
  // const scaleTypeSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const getScaleValue: string = e.target.value;
  //   const getCurrentScaleTypes: scaleTypes = getScaleTypes(getScaleValue);
  //   const getScaleName: string = e.target.dataset.scaleName;
  //   setScaleValue(getCurrentScaleTypes.scaleValue);
  //   setScaleKeys(getCurrentScaleTypes.scaleKeys.join(', '));
  //   setScaleName(getScaleName);

  //   const getCurrentScales: string[][] = getScales(getCurrentScaleTypes);
  //   setScales(getCurrentScales);
  //   changeScaleInterval(getCurrentScales);
  // }


  // JSX
  return (
    <>
      <ScalePlayer>
        <div id="key">
          <div className="key_inner" ref={keyElement}>
            {keyButtons.map((val: keyButtons) =>
              <button key={val.value} value={val.value} className={val.className}
              onMouseDown={keyAttack} onMouseUp={keyRelease} onTouchStart={keyAttack} onTouchEnd={keyRelease}>{val.keyName}</button>
            )}
          </div>
        </div>
        <div id="scale_type">
          {/* <div id="scale_type">
          <section id="scale_text">
            <h2 id="scale_name">{scaleName}（{keyType}）</h2>
            <p id="scale_keys">構成音：{scaleKeys}</p>
            <p id="scale_interval"><button value="start" className="start_button" onClick={changeScalePlay}>▶︎</button>音階：{scaleInterval}</p>
          </section>
          <div id="key_types">
            <dl id="root">
              <dt>キー</dt>
              {inner.keyTypeButtons.map((val: keyTypeButtons) =>
                <dd><label key={val.value} className={val.className}><input key={val.value} type="radio" name="key_type" value={val.value} onChange={keyTypeSelect}
                defaultChecked={val.defaultChecked || null} />{val.keyTypeName}</label></dd>
              )}
            </dl>
          </div> */}
          <Tabs>
            <nav  id="scale_menu">
              <TabList>
                  <Tab>ジェネレーター</Tab>
              </TabList>
            </nav>
            <div id="scale_types">
              <TabPanel>
                <section id="tonality" className="scale_type">
                  <h3>ジェネレーター</h3>
                  <dl id="basic_scale">
                    <dt>xxx</dt>
                    <dd><label><input type="range" name="scale_type" />xxx</label></dd>
                  </dl>
                  {/* <dl id="basic_scale">
                    <dt>基本スケール</dt>
                    {inner.scaleTypeButtons.basicScale.map((val: scaleTypeButtons) =>
                      <dd><label key={val.scaleValue}><input key={val.scaleValue} type="radio" name="scale_type" value={val.scaleValue} data-scale-name={val.scaleName} onChange={scaleTypeSelect}
                      defaultChecked={val.defaultChecked || null} />{val.scaleName}</label></dd>
                    )}
                    </dl> */}
                </section>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </ScalePlayer>
    </>
  );
}

export default Inner;
