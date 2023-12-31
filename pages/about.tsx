import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Data from '../data/data.json';


const headerTitle = Data.header.title;
const pageTitle = 'このアプリについて';
const pageText = 'Tone.js内蔵のシンセサイザーを鍵盤で音を鳴らしながら設定値を変更しながら音作りができるアプリです。';
const headTitle = pageTitle + ' | ' + headerTitle;


// CSS in JS
const Main = styled.main`
    h2 {
        background: #eee;
        margin: 60px 0 20px;
        padding: 10px;
        border-radius: 3px;
    }
    h3 {
        margin: 40px 0 10px;
        padding: 0 0 10px;
        border-bottom: 1px solid #ddd;
    }
    h4 {
        margin: 5px 0 5px;
        padding: 0 0 5px;
        border-bottom: 1px dotted #ddd;
    }
    figure {
        margin: 0 0 30px;
        img {
            width: 100%;
            box-shadow: 0 0 15px 2px rgb(0 0 0 / 10%);
        }
    }
    dl {
        dt, dd {
            margin: 0;
        }
        dd {
            font-size: 0.9em;
        }
    }
`;


// Component
function About() {
    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageText } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageText } />
        </Head>

        <Header />
        <Main>
            <h1>{ pageTitle }</h1>
            <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
            <section>
                <h2>進捗</h2>
                <ul>
                    <li>Aboutの説明文を追加 <a href="https://github.com/ryo-i/synth-generator/issues/7">#7</a></li>
                </ul>
            </section>
            <section>
                <h2>使い方</h2>
                <section>
                    <h3>用途</h3>
                    <p>下記のような用途に活用できます。</p>
                    <ul>
                        <li>VCO（3OSC + Noise）、VCF、VCA、3EG、3LFO、Effectorのシンセサイザー</li>
                        <li>Tone.jsのシンセ機能でブラウザのみでシンセ音を出すことができる</li>
                        <li>パラメーターをどのように変えたらどういう音が出るかを調べることができる</li>
                    </ul>
                </section>
                <section>
                    <h3>VCO</h3>
                    <p>3オシレーターとノイズの波形や音程などを設定できる。</p>
                    <section>
                        <h4>VCO-1/VCO-2/VCO-3</h4>
                        <p>基本となる3つのオシレーター。波形を変えると音色が変わる。sineは倍音がなく、triangleは次に倍音が少なく、sawtoothは一番倍音が多い。pulseは倍音周期のバランスを変更できる。</p>
                        <dl>
                            <dt>Wave:</dt>
                            <dd>波形。初期値はsawtooth。sine、triangle、sawtooth、pulseがある</dd>
                            <dt>Pulse Width:</dt>
                            <dd>パルス波の周期のバランス。初期値は0（50％）。範囲は0（50％）〜1（100％）。</dd>
                            <dt>Octave:</dt>
                            <dd>オクターブ単位の音程変更。初期値は0。範囲は-3〜3</dd>
                            <dt>Coarse:</dt>
                            <dd>半音単位の音程変更。初期値は0。範囲は-12〜12</dd>
                            <dt>Fine:</dt>
                            <dd>半音以内の音程微調整。初期値は0。範囲は-10〜10</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>Noise</h4>
                        <p>ノイズ音のオシレーター。音程は変更できない。</p>
                        <dl>
                            <dt>Wave:</dt>
                            <dd>波形。初期値はwhite。white、brown、pinkがある</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>MIXER</h3>
                    <p>VAOの4つのオシレーターの音量をミックス。EGやLFOで音程変化（ビブラート効果）</p>
                    <section>
                        <h4>Gain</h4>
                        <p>4つのオシレーターの音量バランスを変更できる。</p>
                        <dl>
                            <dt>VCO-1: </dt>
                            <dd>VCO-1の音量。初期値は0.5。範囲は0〜1。</dd>
                            <dt>VCO-2: </dt>
                            <dd>VCO-2の音量。初期値は0。範囲は0〜1。</dd>
                            <dt>VCO-3: </dt>
                            <dd>VCO-3の音量。初期値は0。範囲は0〜1。</dd>
                            <dt>Noise: </dt>
                            <dd>Noiseの音量。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-1 Amount</h4>
                        <p>EG-1のアマウント量をオシレーターごとに個別に設定できる。</p>
                        <dl>
                            <dt>VCO-1Amt (octaves): </dt>
                            <dd>EG-1のVCO-1へのアマウント量。初期値は0。範囲は0〜1。</dd>
                            <dt>VCO-2Amt (octaves): </dt>
                            <dd>EG-1のVCO-2へのアマウント量。初期値は0。範囲は0〜1。</dd>
                            <dt>VCO-3Amt (octaves): </dt>
                            <dd>EG-1のVCO-3へのアマウント量。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-1 Amount</h4>
                        <p>LFO-1のアマウント量をオシレーターごとに個別に設定できる。</p>
                        <dl>
                            <dt>VCO-1Amt (amplitude): </dt>
                            <dd>LFO-1のVCO-1へのアマウント量。初期値は0。範囲は0〜1。</dd>
                            <dt>VCO-2Amt (amplitude): </dt>
                            <dd>LFO-1のVCO-2へのアマウント量。初期値は0。範囲は0〜1。</dd>
                            <dt>VCO-3Amt (amplitude): </dt>
                            <dd>LFO-1のVCO-3へのアマウント量。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-1</h4>
                        <p>音量の時間的変化（ビブラート効果）</p>
                        <dl>
                            <dt>Attack: </dt>
                            <dd>立ち上がりからピーク音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Decay: </dt>
                            <dd>ピーク音から持続音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Sustain: </dt>
                            <dd>持続音の音程の割合。初期値は0。範囲は0〜10。</dd>
                            <dt>Release: </dt>
                            <dd>鍵盤を離したあと音が消えるまでの減衰音の時間。初期値は0.01。範囲は0.01〜10。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-1</h4>
                        <p>音量の周期的変化（ビブラート効果）</p>
                        <dl>
                            <dt>Wave: </dt>
                            <dd>波形。初期値はsine。sine、triangle、sawtooth、squareがある。</dd>
                            <dt>Frequency: </dt>
                            <dd>周波数。周期のスピードが変わる。初期値は0.01。範囲は0〜10。</dd>
                            <dt>Delay: </dt>
                            <dd>Frequencyに至るまでの時間。だんだん早くなる。初期値は0。範囲は0〜10。</dd>
                            <dt>Min: </dt>
                            <dd>周期の最小値。初期値は0。範囲は範囲は0〜10。</dd>
                            <dt>Max: </dt>
                            <dd>周期の最大値。初期値は0。範囲は範囲は0〜10。</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>VCF</h3>
                    <p>VCOの音にフィルターをかけて倍音をカットする。EGやLFOで倍音変化（ワウ効果）</p>
                    <section>
                        <h4>VCF</h4>
                        <p>倍音のカット設定。Filterを変更するとカットの仕方が変わる。lowpassは高音域、highpassは低音域、bandpassは前後の音域をカットする。</p>
                        <dl>
                            <dt>Filter: </dt>
                            <dd>カット方法の種類。初期値はlowpass。lowpass、highpass、bandpassがある。</dd>
                            <dt>Frequency (cut off): </dt>
                            <dd>カットする周波数。初期値は10000Hz。範囲は20Hz〜10000Hz。</dd>
                            <dt>Q (Resonance): </dt>
                            <dd>カット周辺の音を強調する効果。初期値は0。範囲は0〜10。</dd>
                            <dt>Roll off: </dt>
                            <dd>カットするカーブの角度のキツさ。初期値は-12dB/oct。-12、-24、-48、-96がある。</dd>
                            <dt>EG-2 Amt (octaves): </dt>
                            <dd>EG-2のVCFへのアマウント量。初期値は1。範囲は0〜1。</dd>
                            <dt>LFO-2 Amt (amplitude): </dt>
                            <dd>LFO-2のVCFへのアマウント量。初期値は1。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-2</h4>
                        <p>倍音の時間的変化（ワウ効果）</p>
                        <dl>
                            <dt>Attack: </dt>
                            <dd>立ち上がりからピーク音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Decay: </dt>
                            <dd>ピーク音から持続音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Sustain: </dt>
                            <dd>持続音の周波数の割合。初期値は0。範囲は0〜10。</dd>
                            <dt>Release: </dt>
                            <dd>鍵盤を離したあと音が消えるまでの減衰音の時間。初期値は0.01。範囲は0.01〜10。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-2</h4>
                        <p>倍音の周期的変化（ワウ効果）</p>
                        <dl>
                            <dt>Wave: </dt>
                            <dd>波形。初期値はsine。sine、triangle、sawtooth、squareがある。</dd>
                            <dt>Frequency: </dt>
                            <dd>周波数。周期のスピードが変わる。初期値は0.01。範囲は0〜10。</dd>
                            <dt>Delay: </dt>
                            <dd>Frequencyに至るまでの時間。だんだん早くなる。初期値は0。範囲は0〜10。</dd>
                            <dt>Min: </dt>
                            <dd>周期の最小値。初期値は0。範囲は範囲は0〜10。</dd>
                            <dt>Max: </dt>
                            <dd>周期の最大値。初期値は0。範囲は範囲は0〜10。</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>VCA</h3>
                    <p>VCFの音の音量を変更するアンプ。EGやLFOで音量変化（トレモロ効果）</p>
                    <section>
                        <h4>VCA</h4>
                        <p>最終的な音量のd設定。EG-3 Amtがマスターゲインになる。</p>
                        <dl>
                            <dt>EG-3 Amt (gain): </dt>
                            <dd>EG-3のVCAへのアマウント量。初期値は1。範囲は0〜1。</dd>
                        </dl>
                        <dl>
                            <dt>LFO-3 Amt (amplitude): </dt>
                            <dd>EG-3のVCAへのアマウント量。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-3</h4>
                        <p>音量の時間的変化（トレモロ効果）</p>
                        <dl>
                            <dt>Attack: </dt>
                            <dd>立ち上がりからピーク音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Decay: </dt>
                            <dd>ピーク音から持続音までにかかる時間。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Sustain: </dt>
                            <dd>持続音の音量の割合。初期値は1。範囲は0〜10。</dd>
                            <dt>Release: </dt>
                            <dd>鍵盤を離したあと音が消えるまでの減衰音の時間。初期値は0.01。範囲は0.01〜10。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-3</h4>
                        <p>音量の周期的変化（トレモロ効果）</p>
                        <dl>
                            <dt>Wave: </dt>
                            <dd>波形。初期値はsine。sine、triangle、sawtooth、squareがある。</dd>
                            <dt>Frequency: </dt>
                            <dd>周波数。周期のスピードが変わる。初期値は0.01。範囲は0〜10。</dd>
                            <dt>Delay: </dt>
                            <dd>Frequencyに至るまでの時間。だんだん早くなる。初期値は0。範囲は0〜10。</dd>
                            <dt>Min: </dt>
                            <dd>周期の最小値。初期値は0。範囲は範囲は0〜10。</dd>
                            <dt>Max: </dt>
                            <dd>周期の最大値。初期値は0。範囲は範囲は0〜10。</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>EFFECTOR</h3>
                    <p>VCAの音を加工。Distortion（歪み系）、Chorus（モジュレーション系）、Delay・Reverb（空関系）がある。</p>
                    <section>
                        <h4>Distortion</h4>
                        <p>歪み系エフェクト。歪んだ音になる。</p>
                        <dl>
                            <dt>Distortion: </dt>
                            <dd>音を歪める。初期値は0。範囲は0〜10。</dd>
                            <dt>Wet: </dt>
                            <dd>原音と加工音のバランス。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>Chorus</h4>
                        <p>モジュレーション系エフェクト。音を揺らす。分厚い音になる</p>
                        <dl>
                            <dt>Frequency: </dt>
                            <dd>音を揺らす音の周波数のズレ。初期値は0。範囲は0Hz〜10000Hz。</dd>
                            <dt>Delay Time: </dt>
                            <dd>揺れた音がどのくらい遅れて鳴るか。初期値は0。範囲は0ms〜1000ms。</dd>
                            <dt>Depth: </dt>
                            <dd>音を揺らす深さ。初期値は0。範囲は0〜1。</dd>
                            <dt>Wet: </dt>
                            <dd>原音と加工音のバランス。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>Delay</h4>
                        <p>空関系エフェクト。やまびこのように音を繰り返す。</p>
                        <dl>
                            <dt>Delay Time: </dt>
                            <dd>やまびこ音がどのくらい遅れて鳴るか。初期値は0。範囲は0〜1。</dd>
                            <dt>Delay Feedback: </dt>
                            <dd>やまびこ音の回数。初期値は0。範囲は0〜1。</dd>
                            <dt>Wet: </dt>
                            <dd>原音と加工音のバランス。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>Reverb</h4>
                        <p>空関系エフェクト。残響音。広い部屋のような響き。</p>
                        <dl>
                            <dt>Reverb Delay: </dt>
                            <dd>残響音がどのくらい遅れて鳴るか。初期値は0.01。範囲は0.01〜10。</dd>
                            <dt>Wet: </dt>
                            <dd>原音と加工音のバランス。初期値は0。範囲は0〜1。</dd>
                        </dl>
                    </section>
                </section>
            </section>
            <section>
                <h2>詳細</h2>
                <section>
                    <h3>ブログ</h3>
                    <p>作成中</p>
                </section>
                <section>
                    <h3>ソースコード（GitHub）</h3>
                    <p><a href="https://github.com/ryo-i/synth-generator" target="_blank">リポジトリ</a></p>
                </section>
            </section>
            <Profile />
        </Main>
        <Footer />
        </>
    );
}

export default About;