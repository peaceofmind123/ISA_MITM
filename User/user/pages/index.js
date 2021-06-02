import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input} from "antd";
import DefaultCard from "../components/DefaultCard";
const {Text, Paragraph} = Typography;
import React from 'react';

export default function Home() {
    const [serverAddress, setServerAddress] = React.useState('');
    const [publicKey, setPublicKey] = React.useState('');
    const [privateKey, setPrivateKey] = React.useState('');
    React.useEffect(() => {
        setServerAddress(localStorage.getItem('address') ?? '');
        setPublicKey(localStorage.getItem('publicKey')??'');
        setPrivateKey(localStorage.getItem('privateKey')??'');

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
        const response = await fetch(`${serverAddress}/api/getKey`, {mode:'cors'}).catch(console.log)
        const data = await response.json().catch(console.log);
        setPublicKey(data?.publicKey ?? '');
        setPrivateKey(data?.privateKey ?? '');
        localStorage.setItem('publicKey', data?.publicKey ?? '')
        localStorage.setItem('privateKey', data?.privateKey ?? '');
    }
  return (
      <>

      <div style={{minHeight:"200vh", padding:"0 2rem", display: "flex", flexDirection:"column", alignItems:'flex-start', justifyContent:"space-around" }}>
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
                  <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{publicKey}</Paragraph>
              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <div style={{padding:"0 2rem 0 0"}}>
                      <Text>Private Key</Text>
                  </div><Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{privateKey}</Paragraph>
              </div>
          </Card>
          <Card title={'Send public key fetch request to server'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"}>Send</Button>
                  <Text></Text>
              </div>

          </Card>
          <Card title={'Encrypt and send message'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>

                  <Input placeholder={'message'} onChange={e => {}}/>
                  <Button type={"primary"}>Send</Button>
              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>

                  <Text></Text>
              </div>

          </Card>

      </div>
</>
  )
}
