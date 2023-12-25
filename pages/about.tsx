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
    figure {
        margin: 0 0 30px;
        img {
            width: 100%;
            box-shadow: 0 0 15px 2px rgb(0 0 0 / 10%);
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
                    <p>（作成中）</p>
                </section>
                <section>
                    <h3>MIXER</h3>
                    <p>（作成中）</p>
                </section>
                <section>
                    <h3>VCF</h3>
                    <p>（作成中）</p>
                </section>
                <section>
                    <h3>VCA</h3>
                    <p>（作成中）</p>
                </section>
                <section>
                    <h3>EFFECTOR</h3>
                    <p>（作成中）</p>
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