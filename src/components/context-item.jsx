import React from 'react'
import {
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'

const ContextItem = ({ item, context }) => (
  <Card>
    <CardBody>
      <Heading size={'md'} as={'h3'}>
        {item}
      </Heading>
      <Stack divider={<StackDivider />} spacing='4'>
        {context.map(ctx => (
          <Text pt={2} key={nanoid(10)}>
            {ctx}
          </Text>
        ))}
      </Stack>
    </CardBody>
  </Card>
)

export default ContextItem;