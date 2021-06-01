import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Typography, Input} from "antd";
import DefaultCard from "../components/DefaultCard";
const {Text} = Typography;

export default function Home() {
  return (
      <div style={{height:"100vh", padding:"0 2rem", display: "flex", flexDirection:"column", alignItems:'flex-start', justifyContent:"space-around" }}>
          <Card title={'Get server\'s address'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"}>Get</Button>
                  <Text></Text>
              </div>

          </Card>
          <Card title={'Generate Public/Private key pair'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"}>Generate</Button>
                  <Text></Text>
              </div>

          </Card>
          <Card title={'Send public key fetch request to server'}>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"}>Send</Button>
                  <Text></Text>
              </div>

          </Card>
          <Card title={'Encrypt and send message'}>
              <div>
                  <Input placeholder={'message'} onChange={e => {}}/>
              </div>
              <div style={{minWidth:"40rem", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                  <Button type={"primary"}>Send</Button>
                  <Text></Text>
              </div>

          </Card>

      </div>

  )
}
