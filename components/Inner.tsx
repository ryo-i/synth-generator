import React, { useState, useEffect, useRef }  from 'react';
import styled, { keyframes } from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { inner } from '../data/data.json';
import * as Tone from 'tone';

const keyWidth = 40;
const keyLlength = 52;

// CSS in JS
const flashing = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
`;

const ScalePlayer = styled.div`
  color: #fff;
  position: relative;
  #key {
    max-width: 700px;
    margin: 0 auto 4px;
    overflow-x: scroll;
    position: sticky;
    top: 0;
    z-index: 100;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
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
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
        box-shadow: inset 2px 2px 2px rgba(0,0,0,0.3),
          inset -2px -2px 2px rgba(0,0,0,0.3);
        &:hover {
          cursor: pointer;
        }
      }
      .w_key {
        background: #FFF;
        border: 1px solid #333;
        color: #000;
        padding: 90px 0 10px;
        height: 115px;
        &:active {
          background: #ddd;
        }
      }
      .b_key {
        position: absolute;
        z-index: 10;
        top: 0;
        margin: 0 -20px;
        padding: 0 5px;
        background: #444;
        border: 1px solid #000;
        border-top-width: 0;
        color: #fff;
        height: 75px;
        &:active {
          background: #333;
        }
      }
      .c_key {
        background: #ffe6b3;
        &:active {
          background: #f2d394;
        }
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
  }

  #synth_menu {
    margin: 0 auto;
    padding: 5px;
    max-width: 700px;
    background: #222;
    position: sticky;
    z-index: 200;
    top: 146px;
    .react-tabs__tab-list {
      margin: 0 0 5px;
      border: none;
      font-size: 10px;
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

  .startButton {
    position: absolute;
    z-index: 300;
    top: -150px;
    left: 0;
    width: 100%;
    height: 146px;
    background: rgba(0,0,0,0.7);
    display: grid;
    place-items: center;
    button {
      background: #A63744;
      padding: 10px 20px;
      color: #fff;
      font-size: 20px;
      border: none;
      border-radius: 10px;
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));
      animation: ${flashing} 1.5s linear infinite;
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
    &--hide {
      display: none;
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
        width: 100%;
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
function Eg (props) {
  return (
    <section id="vca" className="synth_section">
      <h3>EG-{props.number}</h3>
      <dl>
        <dt>Attack: {props.attack}</dt>
        <dd>
          <input type="range" data-type={props.type} name="attack" value={props.attack} onChange={props.changeEg}  min="0.01" max="10" step="0.01" />
        </dd>
        <dt>Decay: {props.decay}</dt>
        <dd>
          <input type="range" data-type={props.type} name="decay" value={props.decay} onChange={props.changeEg}  min="0.01" max="10" step="0.01" />
        </dd>
        <dt>Sustain: {props.sustain}</dt>
        <dd>
          <input type="range" data-type={props.type} name="sustain" value={props.sustain} onChange={props.changeEg}  min="0" max="1" step="0.01" />
        </dd>
        <dt>Release: {props.release}</dt>
        <dd>
          <input type="range" data-type={props.type} name="release" value={props.release} onChange={props.changeEg}  min="0.01" max="10" step="0.01" />
        </dd>
      </dl>
    </section>
  );
}


function Lfo (props) {
  return (
    <section id="lfo" className="synth_section">
      <h3>LFO-{props.number}</h3>
      <dl>
        <dt>Wave: {props.waveTypeLfo}</dt>
        <dd>
          {inner.lfoWaveTypes.map((waveType, index) =>
            <label key={index}>
              <input type="radio" data-type={props.type}  data-osc="lfo"  name="waveTypeLfo" value={waveType} onChange={props.changeWaveType} defaultChecked={waveType === (props.waveTypeLfo) ? true : false} />{waveType}
            </label>
          )}
        </dd>
        <hr />
        <dt>Frequency: {props.frequencyLfo}</dt>
        <dd>
          <input type="range" data-type={props.type} name="frequencyLfo" value={props.frequencyLfo} onChange={props.changeLfo}  min="0.01" max="30" step="0.01" />
        </dd>
        <dt>Delay: {props.delayLfo}</dt>
        <dd>
          <input type="range" data-type={props.type} name="delayLfo" value={props.delayLfo} onChange={props.changeLfo}  min="0" max="10" step="0.01" />
        </dd>
        <hr />
        <dt>Min: {props.minLfo}</dt>
        <dd>
          <input type="range" data-type={props.type} name="minLfo" value={props.minLfo} onChange={props.changeLfo}  min="0" max="10" step="0.01" />
        </dd>
        <dt>Max: {props.maxLfo}</dt>
        <dd>
          <input type="range" data-type={props.type} name="maxLfo" value={props.maxLfo} onChange={props.changeLfo}  min="0" max="10" step="0.01" />
        </dd>
      </dl>
    </section>
  );
}


function Inner() {
  // Hooks
  // (Key)
  const keyElement = useRef<HTMLInputElement>(null);
  const [keyButtons, setKeyButtons] = useState([]);
  const [isStart, setIsStart] = useState('false');
  // (VCO)
  const [osc1, setOsc1] = useState(null);
  const [osc2, setOsc2] = useState(null);
  const [osc3, setOsc3] = useState(null);
  const [pulseOsc1, setPulseOsc1] = useState(null);
  const [pulseOsc2, setPulseOsc2] = useState(null);
  const [pulseOsc3, setPulseOsc3] = useState(null);
  const [noiseOsc, setNoiseOsc] = useState(null);
  const [waveType1, setWaveType1] = useState('sawtooth');
  const [waveType2, setWaveType2] = useState('sawtooth');
  const [waveType3, setWaveType3] = useState('sawtooth');
  const [waveTypeNoise, setWaveTypeNoise] = useState('white');
  const [pulseWidth1, setPulseWidth1] = useState(0);
  const [pulseWidth2, setPulseWidth2] = useState(0);
  const [pulseWidth3, setPulseWidth3] = useState(0);
  // (MIXER)
  const [octave1, setOctave1] = useState(0);
  const [octave2, setOctave2] = useState(0);
  const [octave3, setOctave3] = useState(0);
  const [coarse1, setCoarse1] = useState(0);
  const [coarse2, setCoarse2] = useState(0);
  const [coarse3, setCoarse3] = useState(0);
  const [fine1, setFine1] = useState(0);
  const [fine2, setFine2] = useState(0);
  const [fine3, setFine3] = useState(0);
  const [mixer1, setMixer1] = useState(0.5);
  const [mixer2, setMixer2] = useState(0);
  const [mixer3, setMixer3] = useState(0);
  const [mixerNoise, setMixerNoise] = useState(0);
  const [gain1, setGain1] = useState(null);
  const [gain2, setGain2] = useState(null);
  const [gain3, setGain3] = useState(null);
  const [gainNoise, setGainNoise] = useState(null);
  const [gainMaster, setGainMaster] = useState(null);
  // (VCF)
  const [filter, setFilter] = useState(null);
  const [filterType, setFilterType] = useState('lowpass');
  const [cutOff, setCutOff] = useState(10000);
  const [resonance, setResonance] = useState(0);
  const [rollOff, setRollOff] = useState(-12);
  // (VCA)
  const [amplifier, setAmplifier] = useState(null);
  // (EG)
  const [egOsc1, setEgOsc1] = useState(null);
  const [egOsc2, setEgOsc2] = useState(null);
  const [egOsc3, setEgOsc3] = useState(null);
  const [attack1, setAttack1] = useState(0.01);
  const [decay1, setDecay1] = useState(0.01);
  const [sustain1, setSustain1] = useState(0);
  const [release1, setRelease1] = useState(0.01);
  const [amountEgOsc1, setAmountEgOsc1] = useState(0);
  const [amountEgOsc2, setAmountEgOsc2] = useState(0);
  const [amountEgOsc3, setAmountEgOsc3] = useState(0);
  const [eg2, setEg2] = useState(null);
  const [attack2, setAttack2] = useState(0.01);
  const [decay2, setDecay2] = useState(0.01);
  const [sustain2, setSustain2] = useState(0);
  const [release2, setRelease2] = useState(0.01);
  const [amountEg2, setAmountEg2] = useState(1);
  const [eg3, setEg3] = useState(null);
  const [attack3, setAttack3] = useState(0.01);
  const [decay3, setDecay3] = useState(0.01);
  const [sustain3, setSustain3] = useState(1);
  const [release3, setRelease3] = useState(0.01);
  const [amountEg3, setAmountEg3] = useState(1);
  // (LFO)
  const [lfoOsc1, setLfoOsc1] = useState(null);
  const [lfoOsc2, setLfoOsc2] = useState(null);
  const [lfoOsc3, setLfoOsc3] = useState(null);
  const [waveTypeLfo1, setWaveTypeLfo1] = useState('sine');
  const [frequencyLfo1, setFrequencyLfo1] = useState(0.01);
  const [delayLfo1, setDelayLfo1] = useState(0);
  const [minLfo1, setMinLfo1] = useState(0);
  const [maxLfo1, setMaxLfo1] = useState(0);
  const [amountLfoOsc1, setAmountLfoOsc1] = useState(0);
  const [amountLfoOsc2, setAmountLfoOsc2] = useState(0);
  const [amountLfoOsc3, setAmountLfoOsc3] = useState(0);
  const [lfo2, setLfo2] = useState(null);
  const [waveTypeLfo2, setWaveTypeLfo2] = useState('sine');
  const [frequencyLfo2, setFrequencyLfo2] = useState(0.01);
  const [delayLfo2, setDelayLfo2] = useState(0);
  const [minLfo2, setMinLfo2] = useState(0);
  const [maxLfo2, setMaxLfo2] = useState(0);
  const [amountLfo2, setAmountLfo2] = useState(1);
  const [lfo3, setLfo3] = useState(null);
  const [waveTypeLfo3, setWaveTypeLfo3] = useState('sine');
  const [frequencyLfo3, setFrequencyLfo3] = useState(0.01);
  const [delayLfo3, setDelayLfo3] = useState(0);
  const [minLfo3, setMinLfo3] = useState(0);
  const [maxLfo3, setMaxLfo3] = useState(0);
  const [amountLfo3, setAmountLfo3] = useState(0);
  // (EFFECTOR)
  const [distortion, setDistortion] = useState(null);
  const [distortionValue, setDistortionValue] = useState(0);
  const [distortionWet, setDistortionWet] = useState(0);
  const [chorus, setChorus] = useState(null);
  const [chorusFrequency, setChorusFrequency] = useState(0);
  const [chorusDelayTime, setChorusDelayTime] = useState(0);
  const [chorusDepth, setChorusDepth] = useState(0);
  const [chorusWet, setChorusWet] = useState(0);
  const [delay, setDelay] = useState(null);
  const [delayTime, setDelayTime] = useState(0);
  const [delayFeedback, setDelayFeedback] = useState(0);
  const [delayWet, setDelayWet] = useState(0);
  const [reverb, setReverb] = useState(null);
  const [reverbDecay, setReverbDecay] = useState(0.01);
  const [reverbWet, setReverbWet] = useState(0);


  const vcoData = {
    vcoName: ['VCO-1', 'VCO-2', 'VCO-3'],
    vcoId: ['1', '2', '3'],
    waveTypeName: ['waveType1', 'waveType2', 'waveType3'],
    waveTypeValue: [waveType1, waveType2, waveType3],
    pulseWidthName: ['pulseWidth1', 'pulseWidth2', 'pulseWidth3'],
    pulseWidthValue: [pulseWidth1, pulseWidth2, pulseWidth3],
    octaveName: ['octave1', 'octave2', 'octave3'],
    octaveValue: [octave1, octave2, octave3],
    coarseName: ['coarse1', 'coarse2', 'coarse3'],
    coarseValue: [coarse1, coarse2, coarse3],
    fineName: ['fine1', 'fine2', 'fine3'],
    fineValue: [fine1, fine2, fine3],
    mixerName: ['mixer1', 'mixer2', 'mixer3'],
    mixerValue: [mixer1, mixer2, mixer3],
    amountEgOscName: ['amountEgOsc1', 'amountEgOsc2', 'amountEgOsc3'],
    amountEgOscValue: [amountEgOsc1, amountEgOsc2, amountEgOsc3],
    amountLfoOscName: ['amountLfoOsc1', 'amountLfoOsc2', 'amountLfoOsc3'],
    amountLfoOscValue: [amountLfoOsc1, amountLfoOsc2, amountLfoOsc3]
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
      const middle = keyButtonsData.middle;
      for (let j = 0; j < middle.length; j++) {
        resultArray.push({
          value: middle[j].value + i,
          className: middle[j].className,
          // keyName: middle[j].value + i
          keyName: middle[j].keyName ? middle[j].keyName + i : ''
        });
      }
    }

    // Push High Kyes
    for (let i = 0; i < keyButtonsData.high.length; i++) {
      resultArray.push(keyButtonsData.high[i]);
    }

    setKeyButtons(resultArray);
  };


  // 鍵盤 & シンセ初期設定
  useEffect(() => {
    pushKeyButtons();
    document.querySelector('#key').scrollLeft = (keyWidth * 23);
    setOsc1(new Tone.Oscillator());
    setOsc2(new Tone.Oscillator());
    setOsc3(new Tone.Oscillator());
    setPulseOsc1(new Tone.PulseOscillator());
    setPulseOsc2(new Tone.PulseOscillator());
    setPulseOsc3(new Tone.PulseOscillator());
    setNoiseOsc(new Tone.Noise());

    setGain1(new Tone.Gain(mixer1));
    setGain2(new Tone.Gain(mixer2));
    setGain3(new Tone.Gain(mixer3));
    setGainNoise(new Tone.Gain(mixerNoise));
    setGainMaster(new Tone.Gain(1));

    setFilter(new Tone.Filter());
    setAmplifier(new Tone.Gain(1));

    // const frequencyEgParam = {
    //   attack: 0.01,
    //   decay: 0.01,
    //   sustain: 0,
    //   release: 0.01,
    // };

    // const amplitudeEgParam = {
    //   attack: 0.01,
    //   decay: 0.01,
    //   sustain: 0,
    //   release: 0.01,
    // };

    setEgOsc1(new Tone.FrequencyEnvelope());
    setEgOsc2(new Tone.FrequencyEnvelope());
    setEgOsc3(new Tone.FrequencyEnvelope());
    setEg2(new Tone.FrequencyEnvelope());
    setEg3(new Tone.AmplitudeEnvelope());

    setLfoOsc1(new Tone.LFO());
    setLfoOsc2(new Tone.LFO());
    setLfoOsc3(new Tone.LFO());
    setLfo2(new Tone.LFO());
    setLfo3(new Tone.LFO());

    setDistortion(new Tone.Distortion())
    setChorus(new Tone.Chorus());
    setDelay(new Tone.FeedbackDelay());
    setReverb(new Tone.Reverb());
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
    osc1.stop();
    pulseOsc1.stop();
    osc2.stop();
    pulseOsc2.stop();
    osc3.stop();
    pulseOsc3.stop();
    noiseOsc.stop();
    lfoOsc1.stop();
    lfoOsc2.stop();
    lfo2.stop();
    lfo3.stop();

    const eventTarget: HTMLButtonElement = e.target as HTMLButtonElement;
    const keyValue: string = eventTarget.value;

    // VCO
    const changeOctaveKey1 = getOctaveKey(keyValue, octave1);
    const changeCoarseKey1 = getCoarseKey(changeOctaveKey1, coarse1);
    const changeFineValue1 = getFineValue(changeCoarseKey1, fine1);
    const changeOctaveKey2 = getOctaveKey(keyValue, octave2);
    const changeCoarseKey2 = getCoarseKey(changeOctaveKey2, coarse2);
    const changeFineValue2 = getFineValue(changeCoarseKey2, fine2);
    const changeOctaveKey3 = getOctaveKey(keyValue, octave3);
    const changeCoarseKey3 = getCoarseKey(changeOctaveKey3, coarse3);
    const changeFineValue3 = getFineValue(changeCoarseKey3, fine3);
    const isValue1 = changeOctaveKey1 && changeCoarseKey1;
    const isValue2 = changeOctaveKey2 && changeCoarseKey2;
    const isValue3 = changeOctaveKey3 && changeCoarseKey3;
    const isPulse1 = waveType1 === 'pulse';
    const isPulse2 = waveType2 === 'pulse';
    const isPulse3 = waveType3 === 'pulse';

    egOsc1.attack = attack1;
    egOsc2.attack = attack1;
    egOsc3.attack = attack1;
    egOsc1.decay = decay1;
    egOsc2.decay = decay1;
    egOsc3.decay = decay1;
    egOsc1.sustain = sustain1;
    egOsc2.sustain = sustain1;
    egOsc3.sustain = sustain1;
    egOsc1.release = release1;
    egOsc2.release = release1;
    egOsc3.release = release1;

    egOsc1.baseFrequency = changeFineValue1;
    egOsc2.baseFrequency = changeFineValue2;
    egOsc3.baseFrequency = changeFineValue3;
    egOsc1.octaves = amountEgOsc1;
    egOsc2.octaves = amountEgOsc2;
    egOsc3.octaves = amountEgOsc3;

    egOsc1.connect(osc1.frequency);
    egOsc1.connect(pulseOsc1.frequency);
    egOsc2.connect(osc2.frequency);
    egOsc2.connect(pulseOsc2.frequency);
    egOsc3.connect(osc3.frequency);
    egOsc3.connect(pulseOsc3.frequency);
    egOsc1.triggerAttack();
    egOsc2.triggerAttack();
    egOsc3.triggerAttack();

    lfoOsc1.type = waveTypeLfo1;
    lfoOsc2.type = waveTypeLfo1;
    lfoOsc3.type = waveTypeLfo1;
    lfoOsc1.frequency.value = 0.01;
    lfoOsc2.frequency.value = 0.01;
    lfoOsc3.frequency.value = 0.01;
    lfoOsc1.frequency.linearRampTo(frequencyLfo1, delayLfo1);
    lfoOsc2.frequency.linearRampTo(frequencyLfo1, delayLfo1);
    lfoOsc3.frequency.linearRampTo(frequencyLfo1, delayLfo1);

    lfoOsc1.amplitude.value = amountLfoOsc1;
    lfoOsc2.amplitude.value = amountLfoOsc2;
    lfoOsc3.amplitude.value = amountLfoOsc3;
    lfoOsc1.min = minLfo1 * amountLfoOsc1 * -10;
    lfoOsc1.max = maxLfo1 * amountLfoOsc1 * 10;
    lfoOsc2.min = minLfo1 * amountLfoOsc2 * -10;
    lfoOsc2.max = maxLfo1 * amountLfoOsc2 * 10;
    lfoOsc3.min = minLfo1 * amountLfoOsc3 * -10;
    lfoOsc3.max = maxLfo1 * amountLfoOsc3 * 10;

    lfoOsc1.connect(osc1.frequency);
    lfoOsc1.connect(pulseOsc1.frequency);
    lfoOsc2.connect(osc2.frequency);
    lfoOsc2.connect(pulseOsc2.frequency);
    lfoOsc3.connect(osc3.frequency);
    lfoOsc3.connect(pulseOsc3.frequency);
    lfoOsc1.start();
    lfoOsc2.start();
    lfoOsc3.start();

    gain1.gain.value = mixer1;
    gain2.gain.value = mixer2;
    gain3.gain.value = mixer3;
    gainNoise.gain.value = mixerNoise;
    osc1.connect(gain1);
    pulseOsc1.connect(gain1);
    osc2.connect(gain2);
    pulseOsc2.connect(gain2);
    osc3.connect(gain3);
    pulseOsc3.connect(gain3);
    noiseOsc.connect(gainNoise);
    gain1.connect(gainMaster);
    gain2.connect(gainMaster);
    gain3.connect(gainMaster);
    gainNoise.connect(gainMaster);
    gainMaster.connect(filter);

    if (isValue1 && isPulse1) {
      pulseOsc1.width.value = pulseWidth1;
      pulseOsc1.frequency.value = changeFineValue1;
      pulseOsc1.start();
    } else if (isValue1) {
      osc1.type = waveType1;
      osc1.frequency.value = changeFineValue1;
      osc1.start();
    }

    if (isValue2 && isPulse2) {
      pulseOsc2.width.value = pulseWidth2;
      pulseOsc2.frequency.value = changeFineValue2;
      pulseOsc2.start();
    } else if (isValue2) {
      osc2.type = waveType2;
      osc2.frequency.value = changeFineValue2;
      osc2.start();
    }

    if (isValue3 && isPulse3) {
      pulseOsc3.width.value = pulseWidth3;
      pulseOsc3.frequency.value = changeFineValue3;
      pulseOsc3.start();
    } else if (isValue3) {
      osc3.type = waveType3;
      osc3.frequency.value = changeFineValue3;
      osc3.start();
    }

    noiseOsc.type = waveTypeNoise;
    noiseOsc.start();

    // VCF
    filter.type = filterType;
    filter.frequency.value = cutOff;
    filter.Q.value = resonance;
    filter.rolloff = rollOff;

    eg2.attack = attack2;
    eg2.decay = decay2;
    eg2.sustain = sustain2;
    eg2.release = release2;
    eg2.baseFrequency = cutOff;
    eg2.octaves = amountEg2 * 5;
    eg2.triggerAttack();
    eg2.connect(filter.frequency);

    lfo2.type = waveTypeLfo2;
    lfo2.frequency.value = 0.01;
    lfo2.frequency.linearRampTo(frequencyLfo2, delayLfo2);
    lfo2.amplitude.value = amountLfo2;
    lfo2.min = minLfo2 * cutOff / 10;
    lfo2.max = maxLfo2 * cutOff / 10;

    lfo2.connect(filter.frequency);
    lfo2.start();
    filter.connect(eg3);

    // VCA
    eg3.attack = attack3;
    eg3.decay = decay3;
    eg3.sustain = sustain3;
    eg3.release = release3;
    eg3.triggerAttack();
    eg3.connect(amplifier);

    lfo3.type = waveTypeLfo3;
    lfo3.frequency.value = 0.01;
    lfo3.frequency.linearRampTo(frequencyLfo3, delayLfo3);
    lfo3.amplitude.value = amountLfo3;
    lfo3.min = minLfo3 * amountEg3;
    lfo3.max = maxLfo3 * amountEg3;
    lfo3.start();
    lfo3.connect(amplifier.gain);

    amplifier.gain.value = amountEg3;
    amplifier.connect(distortion);

    // Effector
    distortion.distortion = distortionValue;
    distortion.wet.value = distortionWet;
    distortion.connect(chorus);

    chorus.frequency.value = chorusFrequency;
    chorus.delayTime = chorusDelayTime;
    chorus.depth = chorusDepth;
    chorus.wet.value = chorusWet;
    chorus.connect(delay);

    delay.delayTime.value = delayTime;
    delay.feedback.value = delayFeedback;
    delay.wet.value = delayWet;
    delay.connect(reverb);

    reverb.decay = reverbDecay;
    reverb.wet.value = reverbWet;
    reverb.toDestination();
  };


  // 鍵盤を押したら音を止める
  const keyRelease = () => {
    egOsc1.triggerRelease();
    egOsc2.triggerRelease();
    eg2.triggerRelease();
    eg3.triggerRelease();
  };


  // VCO設定
  // On/Off変更
  const changeStart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const isStart: string = (e.target as HTMLButtonElement).value;
    console.log('isStart', isStart)

    switch (isStart) {
      case 'true':
        setIsStart('false');
        break;
      case 'false':
        setIsStart('true');
        break;
    }
  };


  // 波形変更
  const changeWaveType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: string = e.target.value;
    const oscType: string = e.target.dataset.osc;
    const keyType: string = e.target.dataset.type;
    const isVco = keyType === 'vco';
    const isVcf = keyType === 'vcf';
    const isVca = keyType === 'vca';

    switch (oscType) {
      case '1':
        setWaveType1(keyValue);
        break;
      case '2':
        setWaveType2(keyValue);
        break;
      case '3':
        setWaveType3(keyValue);
        break;
      case 'noise':
        setWaveTypeNoise(keyValue);
        break;
      case 'lfo':
        if (isVco) setWaveTypeLfo1(keyValue);
        else if (isVcf) setWaveTypeLfo2(keyValue);
        else if (isVca) setWaveTypeLfo3(keyValue);
        break;
      }
  };


  // パルス幅変更
  const changePulseWidth= (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const oscType: string = e.target.dataset.osc;
    switch (oscType) {
      case '1':
        setPulseWidth1(keyValue);
        break;
      case '2':
        setPulseWidth2(keyValue);
        break;
      case '3':
        setPulseWidth3(keyValue);
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
      case '3':
        setOctave3(keyValue);
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
      case '3':
        setCoarse3(keyValue);
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
      case '3':
        setFine3(keyValue);
        break;
    }
  };


  // MIXER設定
  const changeMixer = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const oscType: string = e.target.dataset.osc;

    switch (oscType) {
      case '1':
        setMixer1(keyValue);
        break;
      case '2':
        setMixer2(keyValue);
        break;
      case '3':
        setMixer3(keyValue);
        break;
      case 'noise':
        setMixerNoise(keyValue);
        break;
    }
  };


  // VCF設定
  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: string = String(e.target.value);
    const keyName: string = e.target.name;

    switch (keyName) {
      case 'filterType':
        setFilterType(keyValue);
        break;
      case 'cutOff':
        setCutOff(Number(keyValue));
        break;
      case 'resonance':
        setResonance(Number(keyValue));
        break;
      case 'rollOff':
        setRollOff(Number(keyValue));
        break;
    }
  };


  // EG設定
  const changeEg = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const keyName: string = e.target.name;
    const keyType: string = e.target.dataset.type;
    const isVco = keyType === 'vco';
    const isVco1 = keyType === 'vco1';
    const isVco2 = keyType === 'vco2';
    const isVco3 = keyType === 'vco3';
    const isVcf = keyType === 'vcf';
    const isVca = keyType === 'vca';

    switch (keyName) {
      case 'attack':
        if (isVco) setAttack1(keyValue);
        else if (isVcf) setAttack2(keyValue);
        else if (isVca) setAttack3(keyValue);
        break;
      case 'decay':
        if (isVco) setDecay1(keyValue);
        else if (isVcf) setDecay2(keyValue);
        else if (isVca) setDecay3(keyValue);
        break;
      case 'sustain':
        if (isVco) setSustain1(keyValue);
        else if (isVcf) setSustain2(keyValue);
        else if (isVca) setSustain3(keyValue);
        break;
      case 'release':
        if (isVco) setRelease1(keyValue);
        else if (isVcf) setRelease2(keyValue);
        else if (isVca) setRelease3(keyValue);
        break;
      case 'amountEg':
        if (isVco1) setAmountEgOsc1(keyValue);
        else if (isVco2) setAmountEgOsc2(keyValue);
        else if (isVco3) setAmountEgOsc3(keyValue);
        else if (isVcf) setAmountEg2(keyValue);
        else if (isVca) setAmountEg3(keyValue);
        break;
    }
  };


  // LFO設定
  const changeLfo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const keyName: string = e.target.name;
    const keyType: string = e.target.dataset.type;
    const isVco = keyType === 'vco';
    const isVco1 = keyType === 'vco1';
    const isVco2 = keyType === 'vco2';
    const isVco3 = keyType === 'vco3';
    const isVcf = keyType === 'vcf';
    const isVca = keyType === 'vca';

    switch (keyName) {
      case 'frequencyLfo':
        if (isVco) setFrequencyLfo1(keyValue);
        else if (isVcf) setFrequencyLfo2(keyValue);
        else if (isVca) setFrequencyLfo3(keyValue);
        break;
      case 'delayLfo':
        if (isVco) setDelayLfo1(keyValue);
        else if (isVcf) setDelayLfo2(keyValue);
        else if (isVca) setDelayLfo3(keyValue);
        break;
      case 'minLfo':
        if (isVco) setMinLfo1(keyValue);
        else if (isVcf) setMinLfo2(keyValue);
        else if (isVca) setMinLfo3(keyValue);
        break;
      case 'maxLfo':
        if (isVco) setMaxLfo1(keyValue);
        else if (isVcf) setMaxLfo2(keyValue);
        else if (isVca) setMaxLfo3(keyValue);
        break;
      case 'amountLfo':
        if (isVco1) setAmountLfoOsc1(keyValue);
        else if (isVco2) setAmountLfoOsc2(keyValue);
        else if (isVco3) setAmountLfoOsc3(keyValue);
        else if (isVcf) setAmountLfo2(keyValue);
        else if (isVca) setAmountLfo3(keyValue);
        break;
    }
  };


  // Effector設定
  const changeEffector = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const keyValue: number = Number(e.target.value);
    const keyName: string = e.target.name;

    switch (keyName) {
      case 'distortionValue':
        setDistortionValue(keyValue);
        break;
      case 'distortionWet':
        setDistortionWet(keyValue);
        break;
      case 'chorusFrequency':
        setChorusFrequency(keyValue);
        break;
      case 'chorusDelayTime':
        setChorusDelayTime(keyValue);
        break;
      case 'chorusDepth':
        setChorusDepth(keyValue);
        break;
      case 'chorusWet':
        setChorusWet(keyValue);
        break;
      case 'delayTime':
        setDelayTime(keyValue);
        break;
      case 'delayFeedback':
        setDelayFeedback(keyValue);
        break;
      case 'delayWet':
        setDelayWet(keyValue);
        break;
      case 'reverbDecay':
        setReverbDecay(keyValue);
        break;
      case 'reverbWet':
        setReverbWet(keyValue);
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
                onPointerDown={keyAttack}
                onPointerUp={keyRelease}
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
                  <Tab>MIXER</Tab>
                  <Tab>VCF</Tab>
                  <Tab>VCA</Tab>
                  <Tab>EFX</Tab>
              </TabList>
              <div className={(isStart === 'true') ? 'startButton startButton--hide' : 'startButton'}>
                <button type="button" name="start" value={isStart} onClick={changeStart}>Start</button>
              </div>
            </nav>
            <div id="synth_pannels">
              <TabPanel>
                {inner.vcoName.map((vcoName, index) =>
                  <section id={vcoName} className="synth_section" key={index}>
                    <h3>{vcoData.vcoName[index]}</h3>
                    <dl>
                      <dt>Wave: {vcoData.waveTypeValue[index]}</dt>
                      <dd>
                        {inner.waveTypes.map((waveType, waveIndex) =>
                          <label key={waveIndex}>
                            <input type="radio" name={vcoData.waveTypeName[index]} data-osc={vcoData.vcoId[index]} value={waveType} onChange={changeWaveType} defaultChecked={waveType === (vcoData.waveTypeValue[index]) ? true : false} />{waveType}
                          </label>
                        )}
                      </dd>
                      <dt>Pulse Width: {vcoData.pulseWidthValue[index]}（{vcoData.pulseWidthValue[index] * 50 + 50}％）</dt>
                      <dd>
                        <input type="range" name={vcoData.pulseWidthName[index]} data-osc={vcoData.vcoId[index]} value={vcoData.pulseWidthValue[index]} onChange={changePulseWidth}  min="0" max="1" step="0.02" />
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
                <section id="noise" className="synth_section">
                  <h3>Noise</h3>
                  <dl>
                    <dt>Wave: {waveTypeNoise}</dt>
                    <dd>
                      {inner.noiseWaveTypes.map((type, index) =>
                        <label key={index}>
                          <input type="radio" name='waveTypeNoise' data-osc='noise' value={type} onChange={changeWaveType} defaultChecked={type === (waveTypeNoise) ? true : false} />{type}
                        </label>
                      )}
                    </dd>
                  </dl>
                </section>
              </TabPanel>
              <TabPanel>
                <section id="mixer" className="synth_section">
                  <h3>MIXER</h3>
                  <dl>
                    <h4>Gain</h4>
                    {inner.vcoName.map((vcoName, index) =>
                      <>
                        <dt>{vcoData.vcoName[index]}: {vcoData.mixerValue[index]}</dt>
                        <dd>
                          <input type="range" name={vcoData.mixerName[index]} data-osc={vcoData.vcoId[index]} value={vcoData.mixerValue[index]} onChange={changeMixer}  min="0" max="1" step="0.01" />
                        </dd>
                      </>
                    )}
                    <dt>Noise: {mixerNoise}</dt>
                    <dd>
                      <input type="range" name="mixerNoise" data-osc="noise" value={mixerNoise} onChange={changeMixer}  min="0" max="1" step="0.01" />
                    </dd>
                    <hr />
                    <h4>EG-1 Amount</h4>
                    {inner.vcoName.map((vcoName, index) =>
                      <>
                        <dt>{vcoData.vcoName[index]}Amt (octaves): {vcoData.amountEgOscValue[index]}</dt>
                        <dd>
                          <input type="range" data-type={vcoName} name="amountEg" value={vcoData.amountEgOscValue[index]} onChange={changeEg}  min="0" max="1" step="0.01" />
                        </dd>
                      </>
                    )}
                    <hr />
                    <h4>LFO-1 Amount</h4>
                    {inner.vcoName.map((vcoName, index) =>
                      <>
                        <dt>{vcoData.vcoName[index]}Amt (amplitude): {vcoData.amountLfoOscValue[index]}</dt>
                        <dd>
                          <input type="range" data-type={vcoName} name="amountLfo" value={vcoData.amountLfoOscValue[index]} onChange={changeLfo}  min="0" max="1" step="0.01" />
                        </dd>
                      </>
                    )}
                  </dl>
                </section>
                <Eg type="vco" number={1} attack={attack1} decay={decay1} sustain={sustain1} release={release1} changeEg={changeEg} />
                <Lfo type="vco" number={1} waveTypeLfo={waveTypeLfo1} frequencyLfo={frequencyLfo1} delayLfo={delayLfo1} minLfo={minLfo1} maxLfo={maxLfo1} changeLfo={changeLfo} changeWaveType={changeWaveType} />
              </TabPanel>
              <TabPanel>
                <section id="vcf" className="synth_section">
                  <h3>VCF</h3>
                  <dl>
                    <dt>Filter: {filterType}</dt>
                    <dd>
                      {inner.filterTypes.map((type, index) =>
                        <label key={index}>
                          <input type="radio" name='filterType' value={type} onChange={changeFilter} defaultChecked={type === (filterType) ? true : false} />{type}
                        </label>
                      )}
                    </dd>
                    <hr />
                    <dt>Frequency (cut off): {cutOff}Hz</dt>
                    <dd>
                      <input type="range" name="cutOff" value={cutOff} onChange={changeFilter}  min="20" max="10000" step="1" />
                    </dd>
                    <hr />
                    <dt>Q (Resonance): {resonance}</dt>
                    <dd>
                      <input type="range" name="resonance" value={resonance} onChange={changeFilter}  min="0" max="10" step="0.1" />
                    </dd>
                    <hr />
                    <dt>Roll off: {rollOff}dB/oct</dt>
                    <dd>
                      {inner.rollOff.map((type, index) =>
                          <label key={index}>
                            <input type="radio" name='rollOff' value={type} onChange={changeFilter} defaultChecked={type === (rollOff) ? true : false} />{type}
                          </label>
                        )}
                    </dd>
                    <hr />
                    <dt>EG-2 Amt (octaves): {amountEg2}</dt>
                    <dd>
                      <input type="range" data-type="vcf" name="amountEg" value={amountEg2} onChange={changeEg}  min="0" max="1" step="0.01" />
                    </dd>
                    <dt>LFO-2 Amt (amplitude): {amountLfo2}</dt>
                    <dd>
                      <input type="range" data-type="vcf" name="amountLfo" value={amountLfo2} onChange={changeLfo}  min="0" max="1" step="0.01" />
                    </dd>
                  </dl>
                </section>
                <Eg type="vcf" number={2} attack={attack2} decay={decay2} sustain={sustain2} release={release2} changeEg={changeEg} />
                <Lfo type="vcf" number={2} waveTypeLfo={waveTypeLfo2} frequencyLfo={frequencyLfo2} delayLfo={delayLfo2} minLfo={minLfo2} maxLfo={maxLfo2} changeLfo={changeLfo} changeWaveType={changeWaveType} />
              </TabPanel>
              <TabPanel>
                <section id="vca" className="synth_section">
                  <h3>VCA</h3>
                  <dl>
                    <dt>EG-3 Amt (gain): {amountEg3}</dt>
                    <dd>
                      <input type="range" data-type="vca" name="amountEg" value={amountEg3} onChange={changeEg}  min="0" max="1" step="0.01" />
                    </dd>
                    <dt>LFO-3 Amt (amplitude): {amountLfo3}</dt>
                    <dd>
                      <input type="range" data-type="vca" name="amountLfo" value={amountLfo3} onChange={changeLfo}  min="0" max="1" step="0.01" />
                    </dd>
                  </dl>
                </section>
                <Eg type="vca" number={3} attack={attack3} decay={decay3} sustain={sustain3} release={release3} changeEg={changeEg} />
                <Lfo type="vca" number={3} waveTypeLfo={waveTypeLfo3} frequencyLfo={frequencyLfo3} delayLfo={delayLfo3} minLfo={minLfo3} maxLfo={maxLfo3} changeLfo={changeLfo} changeWaveType={changeWaveType} />
              </TabPanel>
              <TabPanel>
                <section id="effector" className="synth_section">
                  <h3>EFFECTOR</h3>
                  <dl>
                    <h4>Distortion</h4>
                    <dt>
                      Distortion: {distortionValue}
                    </dt>
                    <dd>
                      <input type="range" data-type="distortion" name="distortionValue" value={distortionValue} onChange={changeEffector}  min="0" max="10" step="0.01" />
                    </dd>
                    <dt>
                      Wet: {distortionWet}
                    </dt>
                    <dd>
                      <input type="range" data-type="distortion" name="distortionWet" value={distortionWet} onChange={changeEffector}  min="0" max="1" step="0.01" />
                    </dd>
                    <hr />
                    <h4>Chorus</h4>
                    <dt>
                      Frequency: {chorusFrequency}Hz
                    </dt>
                    <dd>
                      <input type="range" data-type="chorus" name="chorusFrequency" value={chorusFrequency} onChange={changeEffector}  min="0" max="10000" step="1" />
                    </dd>
                    <dt>
                      Delay Time: {chorusDelayTime}ms
                    </dt>
                    <dd>
                      <input type="range" data-type="chorus" name="chorusDelayTime" value={chorusDelayTime} onChange={changeEffector}  min="0" max="1000" step="1" />
                    </dd>
                    <dt>
                      Depth: {chorusDepth}
                    </dt>
                    <dd>
                      <input type="range" data-type="chorus" name="chorusDepth" value={chorusDepth} onChange={changeEffector}  min="0" max="1" step="0.01" />
                    </dd>
                    <dt>
                      Wet: {chorusWet}
                    </dt>
                    <dd>
                      <input type="range" data-type="chorus" name="chorusWet" value={chorusWet} onChange={changeEffector}  min="0" max="1" step="0.01" />
                    </dd>
                    <hr />
                    <h4>Delay</h4>
                    <dt>
                      Delay Time: {delayTime}
                    </dt>
                    <dd>
                      <input type="range" data-type="delay" name="delayTime" value={delayTime} onChange={changeEffector}  min="0" max="1" step="0.01" />
                    </dd>
                    <dt>Delay Feedback: {delayFeedback}</dt>
                    <dd>
                      <input type="range" data-type="delay" name="delayFeedback" value={delayFeedback} onChange={changeEffector}  min="0" max="0.9" step="0.01" />
                    </dd>
                    <dt>
                      Wet: {delayWet}
                    </dt>
                    <dd>
                      <input type="range" data-type="delay" name="delayWet" value={delayWet} onChange={changeEffector}  min="0" max="1" step="0.01" />
                    </dd>
                    <hr />
                    <h4>Reverb</h4>
                    <dt>
                      Reverb Delay: {reverbDecay}
                    </dt>
                    <dd>
                      <input type="range" data-type="reverb" name="reverbDecay" value={reverbDecay} onChange={changeEffector}  min="0.01" max="10" step="0.01" />
                    </dd>
                    <dt>
                      Wet: {reverbWet}
                    </dt>
                    <dd>
                      <input type="range" data-type="reverb" name="reverbWet" value={reverbWet} onChange={changeEffector}  min="0" max="1" step="0.01" />
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
