import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Flex, Icon, Text, useMediaQuery } from '@chakra-ui/react'

const SidebarItem = ({ icon, path, children }) => {
  const [hideText] = useMediaQuery('(min-width: 62em)')

  return (
    <ReactLink to={path}>
      <Flex
        w={'100%'}
        color={'whitesmoke'}
        borderRadius={1}
        _hover={{
          textDecoration: 'none',
          color: 'pink',
          bg: 'blackAlpha.400'
        }}
        as={'li'}
        flexDir={['column', 'column', 'column', 'row', 'row']}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        px={[0, 0, 0, 16, 16]}
        py={[6, 6, 6, 2, 2]}
        fontSize={'x-large'}>
        <Icon as={icon} />
        {hideText ? (
          <Text>
            {children}
          </Text>
        ) : null}
      </Flex>
    </ReactLink>
  )
}

export default SidebarItem
