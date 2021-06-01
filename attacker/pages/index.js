import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input} from "antd";
const {Text} = Typography;

export default function Home() {
  return (
    <>
        <div style={{height:"100vh", padding:"0 2rem", display: "flex", flexDirection:"column", alignItems:'flex-start', justifyContent:"space-around" }}>
            <Card title={'Public/private key pair'}>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Public Key</Text>
                    <Text></Text>
                </div>
                <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Private Key</Text>
                    <Text></Text>
                </div>
            </Card>
            <Card title={'Server\'s public key'}>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Public Key</Text>
                    <Text></Text>
                </div>
            </Card>
            <Card title={'Messages'}>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Encrypted message</Text>
                    <Text></Text>
                </div>
                <div style={{minWidth:"40rem", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Text>Decrypted message</Text>
                    <Text></Text>
                </div>
            </Card>
        </div>
        </>
  )
}
