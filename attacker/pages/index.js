import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input, Collapse} from "antd";
const {Panel} = Collapse;
const {Text, Paragraph} = Typography;
import React from 'react';

export default function Home() {
    const [publicKey, setPublicKey] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');
    const [serverPublicKey, setServerPublicKey] = React.useState('');

    const handleGenerateKeys = async () => {
        const response = await fetch('http://localhost:5500/api/generateKeys', {mode: 'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        console.log(data);
        setPublicKey(data?.publicKey ?? '');
        setPrivateKey(data?.privateKey ?? '');
        localStorage.setItem('publicKey', data?.publicKey ?? '');
        localStorage.setItem('privateKey', data?.privateKey ?? '');
    };

    const handleGetServerPublicKey = async () => {
        const response = await fetch('http://localhost:5500/api/getServerKey', {mode: 'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        setServerPublicKey(data.publicKey)
        localStorage.setItem('serverPublicKey', data?.publicKey ?? '')

    };
    React.useEffect(() => {
        setPublicKey(localStorage.getItem('publicKey') ?? '');
        setPrivateKey(localStorage.getItem('privateKey') ?? '');
        setServerPublicKey(localStorage.getItem('serverPublicKey') ?? '');

    }, []);

    React.useEffect(() => {
        const handler = async () => {
            const response = await fetch('http://localhost:5500/api/getMessages', {mode: 'cors'}).catch(console.log)
            const data = await response.json().catch(console.log);

        };
      const interval = setInterval(() => {

      },1000);

      return () => clearInterval(interval);
    },[])
    return (
        <>
            <div style={{
                height: "100vh",
                padding: "0 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: 'flex-start',
                justifyContent: "space-around"
            }}>
                <Card title={'Public/private key pair'}>
                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Button type={'primary'} onClick={handleGenerateKeys}>Generate</Button>
                    </div>

                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text>Public Key</Text>
                        <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{publicKey}</Paragraph>
                    </div>
                    <div style={{
                        minWidth: "40rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text>Private Key</Text>
                        <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{privateKey}</Paragraph>

                    </div>
                </Card>
                <Card title={'Server\'s public key'}>
                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Button type={'primary'} onClick={handleGetServerPublicKey}>Get</Button>
                    </div>
                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text>Public Key</Text>
                        {serverPublicKey ?
                            <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{serverPublicKey}</Paragraph>
                            : null}
                    </div>
                </Card>
                <Card title={'Messages'}>
                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text>Encrypted messages</Text>
                        {<Text></Text>}
                    </div>
                    <div style={{
                        minWidth: "40rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Text>Decrypted message</Text>
                        <Text></Text>
                    </div>
                </Card>
            </div>
        </>
    )
}
