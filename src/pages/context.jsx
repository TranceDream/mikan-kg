import React, { useState } from 'react'
import { Flex, Heading, IconButton, Input, Skeleton, useToast } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import ContextItem from '../components/context-item.jsx'
import EmptyItem from '../components/empty-item.jsx'

const Context = props => {
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState({
    item: '',
    context: []
  })

  const getContextByItem = async query => {
    setLoading(true)
    const json = await fetch('context.json')
    const ctx = await json.json()
    const { item, context } = ctx.find(element => element.item === query)
    setResult({ item, context })
    setLoading(false)
  }

  return (
    <React.Fragment>
      <Flex
        flexDir={'column'}
        w={'100%'}
        overflowY={'auto'}
        px={[8, 8, 8, 16, 16]}
        py={8}
        gap={4}>
        <Heading as={'h2'}>内容查询</Heading>
        <Flex flexDir={'row'} gap={2}>
          <Input
            value={inputValue}
            onChange={e => {
              let value = e.target.value
              setInputValue(value)
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                getContextByItem(inputValue).catch(error => {
                  console.error(error)
                  toast({
                    title: '请检查服务端连接',
                    status: 'error',
                    isClosable: true
                  })
                })
              }
            }}
          />
          <IconButton
            aria-label={'Search'}
            icon={<BiSearch />}
            onClick={() => {
              getContextByItem(inputValue).catch(error => {
                console.error(error)
                toast({
                  title: '请检查服务端连接',
                  status: 'error',
                  isClosable: true
                })
              })
            }}
          />
        </Flex>
        {loading ? (
          <Skeleton w={'100%'} h={'320px'} />
        ) : result.context.length ? (
          <ContextItem item={result.item} context={result.context} />
        ) : (
          <EmptyItem />
        )}
      </Flex>
    </React.Fragment>
  )
}

export default Context
