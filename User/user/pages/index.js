import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input, List} from "antd";
import DefaultCard from "../components/DefaultCard";
const {Text, Paragraph} = Typography;
import React from 'react';

export default function Home() {
    const [serverAddress, setServerAddress] = React.useState('');
    const [publicKey, setPublicKey] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');
    const [serverPublicKey, setServerPublicKey] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [sentMessages, setSentMessages] = React.useState([]);

    React.useEffect(() => {
        setServerAddress(localStorage.getItem('address') ?? '');
        setPublicKey(localStorage.getItem('publicKey')??'');
        setPrivateKey(localStorage.getItem('privateKey')??'');
        setServerPublicKey(localStorage.getItem('serverPublicKey')??'');
        fetch('http://localhost:3000/api/init')
    }, []);
    const handleGetAddress = async () => {
        const response = await fetch('http://localhost:5000/B', {mode: "cors"}).catch(console.log)
        const data = await response.json().catch(console.log)
        setServerAddress(data?.address ??'');
        localStorage.setItem('address', data.address)
    };
    const handleGenerateKeys =  async () => {
        const response = await fetch('http://localhost:3000/api/generateKeys', {mode:'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        setPublicKey(data?.publicKey ?? '');
        setPrivateKey(data?.privateKey ?? '');
        localStorage.setItem('publicKey', data?.publicKey ?? '');
        localStorage.setItem('privateKey', data?.privateKey ?? '');
    };

    const handleSendFetchRequest = async () => {
        const response = await fetch(`http://localhost:3000/api/getServerKey`, {mode:'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        setServerPublicKey(data.publicKey);
        localStorage.setItem('serverPublicKey', data?.publicKey ?? '');

    }
const handleSendMessage = async () => {
    const response = await fetch('http://localhost:3000/api/encrypt?'+ new URLSearchParams({
        message
    }));
    const data = await response.json().catch(console.log);
    const {encrypted} = data;
    const response1 = await fetch(`${serverAddress}/api/message?` + new URLSearchParams({
        message: encrypted
    }))
    const data1 = await response1.json().catch(console.log);
    setSentMessages([message, ...sentMessages])

};

  return (
      <>

      <div style={{minHeight:"200vh", padding:"0 2rem" }} className={'container'}>
          <Card title={'Get server\'s address'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"} onClick={handleGetAddress}>Get</Button>
                  <Text>{serverAddress}</Text>
              </div>

          </Card>
          <Card title={'Generate Public/Private key pair'}>
              <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"} onClick={handleGenerateKeys}>Generate</Button>

              </div>
              <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{padding:"0 2rem 0 0"}}>
                      <Text>Public Key</Text>
                  </div>
                  {
                      publicKey ? <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{publicKey}</Paragraph>
                  : null}
              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{padding:"0 2rem 0 0"}}>
                      <Text>Private Key</Text>
                  </div>
                  {privateKey ?
                      <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{privateKey}</Paragraph>
                  : null}
              </div>
          </Card>
          <Card title={'Send public key fetch request to server'}>
              <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"} onClick={handleSendFetchRequest}>Send</Button>

              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{padding:"0 2rem 0 0"}}>
                      <Text>Server Public Key</Text>
                  </div>
                  {
                     serverPublicKey ? <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>{serverPublicKey}</Paragraph>
                  : null
                  }
              </div>

          </Card>
          <Card title={'Encrypt and send message'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>

                  <Input placeholder={'message'} value={message} onChange={(e)=> setMessage(e.target.value)}/>
                  <Button type={"primary"} onClick={handleSendMessage}>Send</Button>
              </div>
              <div style={{minWidth:"40rem", margin:"2rem 0", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Text>Sent Messages</Text>
              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  {sentMessages.length ? <div>
                      {sentMessages.map((m,i) =><div key={i} style={{marginBottom: '1rem'}}>
                          <Text >{m}</Text>
                      </div>)}
                  </div>: null}
              </div>
          </Card>

      </div>
</>
  )
}
