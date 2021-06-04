import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input} from "antd";
const {Text, Paragraph} = Typography;
import React from 'react';

export default function Home() {
    const [publicKey, setPublicKey] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');
    const [encryptedMessages, setEncryptedMessages] = React.useState([])
    const [decryptedMessages, setDecryptedMessages] = React.useState([])

    React.useEffect(() => {
        setPublicKey(localStorage.getItem('publicKey')??'');
        setPrivateKey(localStorage.getItem('privateKey')??'');
        fetch('http://localhost:4000/api/init')
    }, []);

    const handleGenerateKeys =  async () => {
        const response = await fetch('http://localhost:4000/api/generateKeys', {mode:'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        setPublicKey(data?.publicKey ?? '');
        setPrivateKey(data?.privateKey ?? '');
        localStorage.setItem('publicKey', data?.publicKey ?? '');
        localStorage.setItem('privateKey', data?.privateKey ?? '');
    };
    React.useEffect(() => {
        const handler = async () => {
            const response = await fetch('http://localhost:4000/api/getMessages', {mode: 'cors'}).catch(console.log)
            const data = await response.json().catch(console.log);
            setEncryptedMessages(data.encrypted);
            setDecryptedMessages(data.decrypted);
        };
        const interval = setInterval(handler,4000);

        return () => clearInterval(interval);
    },[])
    return (
    <>
        <div style={{height:"100vh", padding:"0 2rem", display: "flex", flexDirection:"column", alignItems:'flex-start', justifyContent:"space-around" }}>
            <Card title={'Public/private key pair'}>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Button type={'primary'} onClick={handleGenerateKeys}>Generate</Button>
                </div>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Public Key</Text>
                    {publicKey ? <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{publicKey}</Paragraph>
                    : null}
                </div>
                <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Private Key</Text>
                    {privateKey ? <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{privateKey}</Paragraph>
                        : null}
                </div>
            </Card>
            <Card title={'Messages'}>
                <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Received Messages</Text>

                </div>
                <div style={{
                    minWidth: "40rem",
                    marginBottom: "2rem",
                    maxWidth:"100%"
                }}>
                    {decryptedMessages.map((m,i) =>
                        <div style={{marginBottom:'2rem 0'}}>
                            <Text>{m}</Text>
                        </div>
                    )}
                </div>
            </Card>
        </div>
      </>
  )
}
