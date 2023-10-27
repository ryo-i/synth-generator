import React, { useState, useEffect, useRef }  from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { inner } from '../data/data.json';
import * as Tone from 'tone';
import { on } from 'process';

const keyWidth = 40;
const keyLlength = 52;


// CSS in JS
const ScalePlayer = styled.div`
  color: #fff;
  #key {
    max-width: calc(${keyWidth + 'px'} * ${keyLlength});
    margin: 0 auto 20px;
    overflow-x: scroll;
    .key_inner {
      background: #444;
      width: calc(${keyWidth + 'px'} * ${keyLlength});
      display: block;
      padding: 0 0 30px;
      position: relative;
      button {
        width: ${keyWidth + 'px'};
        text-align: center;
        display: inline-block;
        user-select: none;
        filter: drop-shadow(0 3px 5px rgba(0,0,0,0.5));
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
        background: #222;
        border: 1px solid #000;
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

  #synth_menu {
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

  #synth_pannel,
  .synth_type {
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

  .synth_type {
    dl {
      dd {
        @media (max-width: 400px) {
          display: block;
        }
        input[type="range"] {
          width: 100%;
        }
      }
    }
  }
`;


// Component
function Inner() {
  // Hooks
  const [synth, setSynth] = useState(null);
  const keyElement = useRef<HTMLInputElement>(null);
  const [keyButtons, setKeyButtons] = useState([]);
  const [sound, setSound] = useState(false);
  const [carrentWaveType, setCarrentWaveType] = useState('sine');
  const [octave, setOctave] = useState(0);
  const [coarse, setCoarse] = useState(0);

  interface keyButtons {
    value: string;
    className: string;
    onClick: boolean;
    keyName: string;
  };


  // 鍵盤データ設定
  const pushKeyButtons = () => {
    const keyButtonsData = inner.keyButtons;
    const resultArray = [];

    // Push Low Kyes
    for (let i = 0; i < keyButtonsData.low.length; i++) {
      resultArray.push(keyButtonsData.low[i]);
    }

    // Push Middole Kyes
    for (let i = 1; i < inner.octave; i++) {
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
    setSynth(new Tone.Oscillator().toDestination());
  },[]);


  // 音階が何番目にあるかを取得
  const getCurrentNumber = (KeyValue) => {
    let currentNumber = 0;
    for (let i = 0; i < keyButtons.length; i++) {
      if (keyButtons[i].value == KeyValue) {
        currentNumber = i;
      }
    }
    return currentNumber;
  };


  // オクターブ変更後の音程を取得
  const getOctaveKey = (KeyValue) => {
    let currentNumber = getCurrentNumber(KeyValue);
    let changeOctaveNumber = currentNumber + (octave * 12);
    const changeOctaveKey = keyButtons[changeOctaveNumber] ? keyButtons[changeOctaveNumber].value : '';
    return changeOctaveKey;
  }


  // 音階変更後の音程を取得
  const getCoarseKey = (KeyValue) => {
    let currentNumber = getCurrentNumber(KeyValue);
    let changeCoarseNumber = currentNumber + coarse;
    const changeCoarseKey = keyButtons[changeCoarseNumber] ? keyButtons[changeCoarseNumber].value : '';
    return changeCoarseKey;
  }


  // 鍵盤を押したら音を鳴らす
  const keyAttack = (e) => {
    const eventTarget: HTMLButtonElement = e.target as HTMLButtonElement;
    const KeyValue: string = eventTarget.value;
    const changeOctaveKey = getOctaveKey(KeyValue);
    const changeCoarseKey = getCoarseKey(changeOctaveKey);
    console.log('changeOctaveKey', changeOctaveKey);
    console.log('changeCoarseKey', changeCoarseKey);

    if (sound && changeOctaveKey && changeCoarseKey) {
      synth.type = carrentWaveType;
      synth.frequency.value = changeCoarseKey;
      synth.start();
    }
  };


  // 鍵盤を押したら音を止める
  const keyRelease = (e) => {
    synth.stop();
  };


  // On/Off
  const startSound = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const KeyValue: string = e.target.value;
    console.log('KeyValue', KeyValue)
    if (KeyValue === 'on') {
      setSound(true);
    } else {
      setSound(false);
    }
  };


  // 波形変更
  const changeWaveType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const KeyValue: string = e.target.value;
    setCarrentWaveType(KeyValue);
  };


  // オクターブ変更
  const changeOctave = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const KeyValue: number = Number(e.target.value);
    setOctave(KeyValue);
  };


  // 音階変更
  const changeCoarse = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const KeyValue: number = Number(e.target.value);
    setCoarse(KeyValue);
  };


  // JSX
  return (
    <>
      <ScalePlayer>
        <div id="key">
          <div className="key_inner" ref={keyElement}>
            {keyButtons.map((val: keyButtons) =>
              <button
                key={val.value}
                value={val.value}
                className={val.className}
                onMouseDown={keyAttack}
                onTouchStart={keyAttack}
                onMouseUp={keyRelease}
                onTouchEnd={keyRelease}
              >
                {val.keyName}
              </button>
            )}
          </div>
        </div>
        <div id="synth">
          <Tabs>
            <nav  id="synth_menu">
              <TabList>
                  <Tab>VCO</Tab>
              </TabList>
            </nav>
            <div id="synth_pannels">
              <TabPanel>
                <section id="tonality" className="synth_type">
                  <h3>VCO 1</h3>
                  <div className="onOffButton">
                    <label>
                      <input type="radio" name="sound" value="on" onChange={startSound} />On
                    </label>
                    <label>
                      <input type="radio" name="sound" value="off" onChange={startSound} defaultChecked />Off
                    </label>
                  </div>
                  <hr />
                  <dl id="basic_scale">
                    <dt>Wave</dt>
                    <dd>
                      {inner.waveTypes.map((waveType, index) =>
                        <label key={index}>
                          <input type="radio" name="waveType" value={waveType} onChange={changeWaveType} defaultChecked={index === 0 ? true : false} />{waveType}
                        </label>
                      )}
                    </dd>
                    <hr />
                    <dt>Octave: {octave}</dt>
                    <dd>
                      <input type="range" name="octave" value={octave} onChange={changeOctave}  min="-3" max="3" />
                    </dd>
                    <dt>Coarse: {coarse}</dt>
                    <dd>
                      <input type="range" name="coarse" value={coarse} onChange={changeCoarse}  min="-12" max="12" />
                    </dd>
                  </dl>
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
