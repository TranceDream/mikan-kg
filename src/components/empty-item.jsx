import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const EmptyItem = props => (
  <Flex flexDir={'row'} justifyContent={'center'} p={8}>
    <Text>空空如也</Text>
  </Flex>
)

export default EmptyItem;