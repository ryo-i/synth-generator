import React, { useState, useEffect, useRef }  from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { inner } from '../data/data.json';
import * as Tone from 'tone';
import { on } from 'process';
import { finished } from 'stream/promises';

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
  .synth_section {
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

  .synth_section {
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
  const keyElement = useRef<HTMLInputElement>(null);
  const [keyButtons, setKeyButtons] = useState([]);
  const [osc1, setOsc1] = useState(null);
  const [osc2, setOsc2] = useState(null);
  const [onOff1, setonOff1] = useState(false);
  const [onOff2, setonOff2] = useState(false);
  const [waveType1, setWaveType1] = useState('square');
  const [waveType2, setWaveType2] = useState('square');
  const [octave1, setOctave1] = useState(0);
  const [octave2, setOctave2] = useState(0);
  const [coarse1, setCoarse1] = useState(0);
  const [coarse2, setCoarse2] = useState(0);
  const [fine1, setFine1] = useState(0);
  const [fine2, setFine2] = useState(0);

  const vcoData = {
    vcoName: ['VCO 1', 'VCO 2'],
    vcoId: ['1', '2'],
    onOffName: ['onOff1', 'onOff2'],
    waveTypeName: ['waveType1', 'waveType2'],
    waveTypeValue: [waveType1, waveType2],
    octaveName: ['octave1', 'octave2'],
    octaveValue: [octave1, octave2],
    coarseName: ['coarse1', 'coarse2'],
    coarseValue: [coarse1, coarse2],
    fineName: ['fine1', 'fine2'],
    fineValue: [fine1, fine2],
  };

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
    setOsc1(new Tone.Oscillator().toDestination());
    setOsc2(new Tone.Oscillator().toDestination());
  },[]);


  // 音階が何番目にあるかを取得
  const getCurrentNumber = (keyValue) => {
    let currentNumber = 0;
    for (let i = 0; i < keyButtons.length; i++) {
      if (keyButtons[i].value == keyValue) {
        currentNumber = i;
      }
    }
    return currentNumber;
  };


  // オクターブ変更後の音程を取得
  const getOctaveKey = (keyValue, octave) => {
    let currentNumber = getCurrentNumber(keyValue);
    let changeOctaveNumber = currentNumber + (octave * 12);
    const changeOctaveKey = keyButtons[changeOctaveNumber] ? keyButtons[changeOctaveNumber].value : '';
    return changeOctaveKey;
  }


  // 音階変更後の音程を取得
  const getCoarseKey = (keyValue, coarse) => {
    let currentNumber = getCurrentNumber(keyValue);
    let changeCoarseNumber = currentNumber + coarse;
    const changeCoarseKey = keyButtons[changeCoarseNumber] ? keyButtons[changeCoarseNumber].value : '';
    return changeCoarseKey;
  }


  // 半音階以下のチューニング
  const getFineValue = (keyValue, fine) => {
    const frequencyValue = Tone.Frequency(keyValue).toFrequency();
    const ratio = 0.0595 * (fine / 10);
    const getFrequencyValue = frequencyValue + (frequencyValue * ratio);
    return getFrequencyValue;
  }


  // 鍵盤を押したら音を鳴らす
  const keyAttack = (e) => {
    const eventTarget: HTMLButtonElement = e.target as HTMLButtonElement;
    const keyValue: string = eventTarget.value;
    const changeOctaveKey1 = getOctaveKey(keyValue, octave1);
    const changeCoarseKey1 = getCoarseKey(changeOctaveKey1, coarse1);
    const changeFineValue1 = getFineValue(changeCoarseKey1, fine1);
    const changeOctaveKey2 = getOctaveKey(keyValue, octave2);
    const changeCoarseKey2 = getCoarseKey(changeOctaveKey2, coarse2);
    const changeFineValue2 = getFineValue(changeCoarseKey2, fine2);

    if (onOff1 && changeOctaveKey1 && changeCoarseKey1) {
      osc1.type = waveType1;
      osc1.frequency.value = changeFineValue1;
      osc1.start();
    }

    if (onOff2 && changeOctaveKey2 && changeCoarseKey2) {
      osc2.type = waveType2;
      osc2.frequency.value = changeFineValue2;
      osc2.start();
    }

  };


  // 鍵盤を押したら音を止める
  const keyRelease = (e) => {
    osc1.stop();
    osc2.stop();
  };


  // On/Off変更
  const changeSound = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: string = e.target.value;
    const oscType: string = e.target.dataset.osc;
    const isSound: boolean = keyValue === 'on' ? true : false;
    console.log('isSound', isSound)

    switch (oscType) {
      case '1':
        setonOff1(isSound);
        break;
      case '2':
        setonOff2(isSound);
        break;
    }
  };


  // 波形変更
  const changeWaveType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: string = e.target.value;
    const oscType: string = e.target.dataset.osc;
    switch (oscType) {
      case '1':
        setWaveType1(keyValue);
        break;
      case '2':
        setWaveType2(keyValue);
        break;
      }
  };


  // オクターブ変更
  const changeOctave = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const oscType: string = e.target.dataset.osc;
    switch (oscType) {
      case '1':
        setOctave1(keyValue);
        break;
      case '2':
        setOctave2(keyValue);
        break;
    }
  };


  // 音階変更
  const changeCoarse = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const oscType: string = e.target.dataset.osc;
    switch (oscType) {
      case '1':
        setCoarse1(keyValue);
        break;
      case '2':
        setCoarse2(keyValue);
        break;
    }
  };


  // 半音階以下の変更
  const changeFine = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const oscType: string = e.target.dataset.osc;
    switch (oscType) {
      case '1':
        setFine1(keyValue);
        break;
      case '2':
        setFine2(keyValue);
        break;
    }
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
                {inner.vcoName.map((vcoName, index) =>
                  <section id={vcoName} className="synth_section">
                    <h3>{vcoData.vcoName[index]}</h3>
                    <div className="onOffButton">
                      <label>
                        <input type="radio" name={vcoData.onOffName[index]} data-osc={vcoData.vcoId[index]} value="on" onChange={changeSound} />On
                      </label>
                      <label>
                        <input type="radio" name={vcoData.onOffName[index]} data-osc={vcoData.vcoId[index]} value="off" onChange={changeSound} defaultChecked />Off
                      </label>
                    </div>
                    <hr />
                    <dl>
                      <dt>Wave</dt>
                      <dd>
                        {inner.waveTypes.map((waveType, waveIndex) =>
                          <label key={waveIndex}>
                            <input type="radio" name={vcoData.waveTypeName[index]} data-osc={vcoData.vcoId[index]} value={waveType} onChange={changeWaveType} defaultChecked={waveType === (vcoData.waveTypeValue[index]) ? true : false} />{waveType}
                          </label>
                        )}
                      </dd>
                      <hr />
                      <dt>Octave: {vcoData.octaveValue[index]}</dt>
                      <dd>
                        <input type="range" name={vcoData.octaveName[index]} data-osc={vcoData.vcoId[index]} value={vcoData.octaveValue[index]} onChange={changeOctave}  min="-3" max="3" />
                      </dd>
                      <dt>Coarse: {vcoData.coarseValue[index]}</dt>
                      <dd>
                        <input type="range" name={vcoData.coarseName[index]} data-osc={vcoData.vcoId[index]} value={vcoData.coarseValue[index]} onChange={changeCoarse}  min="-12" max="12" />
                      </dd>
                      <dt>Fine: {vcoData.fineValue[index]}</dt>
                      <dd>
                        <input type="range" name={vcoData.fineName[index]} data-osc={vcoData.vcoId[index]} value={vcoData.fineValue[index]} onChange={changeFine}  min="-10" max="10" step="0.1" />
                      </dd>
                    </dl>
                  </section>
                )}
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </ScalePlayer>
    </>
  );
}

export default Inner;
