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
        margin: 40px 0 5px;
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
                    <li>About着手 & PCの鍵盤幅を変更 <a href="https://github.com/ryo-i/synth-generator/issues/7">#7</a></li>
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
                    <p>3オシレーターとノイズの波形などを設定できるパート</p>
                    <section>
                        <h4>VCO-1/VCO-2/VCO-3</h4>
                        <dl>
                            <dt>Wave:</dt>
                            <dd>初期値はsawtooth。sine,triangle, sawtooth,pulseがある</dd>
                            <dt>Pulse Width:</dt>
                            <dd>初期値は0（50％）</dd>
                            <dt>Octave:</dt>
                            <dd>初期値は0</dd>
                            <dt>Coarse:</dt>
                            <dd>初期値は0</dd>
                            <dt>Fine:</dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>Noise</h4>
                        <p></p>
                        <dl>
                            <dt>Wave:</dt>
                            <dd>初期値はwhite。white, brown, pinkがある</dd>
                            <dt>Pulse Width:</dt>
                            <dd>初期値は0（50％）</dd>
                            <dt>Octave:</dt>
                            <dd>初期値は0</dd>
                            <dt>Coarse:</dt>
                            <dd>初期値は0</dd>
                            <dt>Fine:</dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>MIXER</h3>
                    <p>VAOの4つのオシレーターの音量をミックスし、EGやLFOで音程変化（ビブラート）</p>
                    <section>
                        <h4>Gain</h4>
                        <dl>
                            <dt>VCO-1: </dt>
                            <dd>初期値は0.5</dd>
                            <dt>VCO-2: </dt>
                            <dd>初期値は0</dd>
                            <dt>VCO-3: </dt>
                            <dd>初期値は0</dd>
                            <dt>Noise: </dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-1 Amount</h4>
                        <dl>
                            <dt>VCO-1Amt (octaves): </dt>
                            <dd>初期値は0</dd>
                            <dt>VCO-2Amt (octaves): </dt>
                            <dd>初期値は0</dd>
                            <dt>VCO-3Amt (octaves): </dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-1 Amount</h4>
                        <dl>
                            <dt>VCO-1Amt (amplitude): </dt>
                            <dd>初期値は0</dd>
                            <dt>VCO-2Amt (amplitude): </dt>
                            <dd>初期値は0</dd>
                            <dt>VCO-3Amt (amplitude): </dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-1</h4>
                        <dl>
                            <dt>Attack: </dt>
                            <dd>初期値は0.01</dd>
                            <dt>Decay: </dt>
                            <dd>初期値は0.01</dd>
                            <dt>Sustain: </dt>
                            <dd>初期値は0</dd>
                            <dt>Release: </dt>
                            <dd>初期値は0.01</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-1</h4>
                        <dl>
                            <dt>Wave: </dt>
                            <dd>初期値はsine。sine, triangle, sawtooth, squareがある</dd>
                            <dt>Frequency: </dt>
                            <dd>初期値は0.01</dd>
                            <dt>Delay: </dt>
                            <dd>初期値は0</dd>
                            <dt>Min: </dt>
                            <dd>初期値は0</dd>
                            <dt>Max: </dt>
                            <dd>初期値は0</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>VCF</h3>
                    <p>VCOの音にフィルターをかけて倍音をカット、EGやLFOで音程変化（ワウ）</p>
                    <section>
                        <h4>VCF</h4>
                        <dl>
                            <dt>Filter: </dt>
                            <dd>初期値はlowpass。lowpass, highpass, bandpassがある。</dd>
                            <dt>Frequency (cut off): </dt>
                            <dd>初期値は10000Hz</dd>
                            <dt>Q (Resonance): </dt>
                            <dd>初期値は0</dd>
                            <dt>Roll off: </dt>
                            <dd>初期値は-12dB/oct。-12, -24, -48, -96がある。</dd>
                            <dt>EG-2 Amt (octaves): </dt>
                            <dd>初期値は1</dd>
                            <dt>LFO-2 Amt (amplitude): </dt>
                            <dd>初期値は1</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>EG-2</h4>
                        <dl>
                            <dt></dt>
                            <dd>初期値は</dd>
                        </dl>
                    </section>
                    <section>
                        <h4>LFO-2</h4>
                        <dl>
                            <dt></dt>
                            <dd>初期値は</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>VCA</h3>
                    <p>（作成中）</p>
                    <section>
                        <h4></h4>
                        <dl>
                            <dt></dt>
                            <dd>初期値は</dd>
                        </dl>
                    </section>
                </section>
                <section>
                    <h3>EFFECTOR</h3>
                    <p>（作成中）</p>
                    <section>
                        <h4></h4>
                        <dl>
                            <dt></dt>
                            <dd>初期値は</dd>
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