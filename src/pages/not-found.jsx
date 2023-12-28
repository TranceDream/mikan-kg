import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

const NotFound = props => (
  <Flex
    w={'100%'}
    h={'100vh'}
    flexDir={'column'}
    alignItems={'center'}
    justifyContent={'center'}>
    <Heading as={'h2'}>404 | Not Found</Heading>
  </Flex>
)

export default NotFound
