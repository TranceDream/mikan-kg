import React, { useContext, useState } from 'react'
import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Text
} from '@chakra-ui/react'
import Neo4jContext, { createDriver } from '../neo4j-context.jsx'

const Settings = ({ onClose }) => {
  const { setDriver } = useContext(Neo4jContext)

  const [protocol, setProtocol] = useState(localStorage.getItem('protocol'))
  const [host, setHost] = useState(localStorage.getItem('host'))
  const [port, setPort] = useState(localStorage.getItem('port'))
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ModalContent>
      <ModalHeader>Neo4j连接设置</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>协议:</Text>
        <Select
          value={protocol}
          onChange={e => {
            let value = e.target.value
            setProtocol(value)
          }}>
          <option value={'bolt'}>bolt</option>
          <option value={'neo4j'}>neo4j</option>
        </Select>
        <Text>主机:</Text>
        <Input
          value={host}
          onChange={e => {
            let value = e.target.value
            setHost(value)
          }}
        />
        <Text>端口:</Text>
        <Input
          value={port}
          onChange={e => {
            let value = e.target.value
            setPort(value)
          }}
        />
        <Text>用户名:</Text>
        <Input
          value={user}
          onChange={e => {
            let value = e.target.value
            setUser(value)
          }}
        />
        <Text>密码:</Text>
        <Input
          type={'password'}
          value={password}
          onChange={e => {
            let value = e.target.value
            setPassword(value)
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme='blue'
          onClick={() => {
            localStorage.setItem('protocol', protocol)
            localStorage.setItem('host', host)
            localStorage.setItem('port', port)
            localStorage.setItem('user', user)
            localStorage.setItem('password', password)
            setDriver(createDriver())
            onClose()
          }}>
          保存
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default Settings
