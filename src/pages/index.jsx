import React, { useContext, useLayoutEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  Flex,
  Heading,
  IconButton,
  Input,
  Skeleton,
  Text,
  useToast
} from '@chakra-ui/react'
import Neo4jContext from '../neo4j-context.jsx'
import { BiSearch } from 'react-icons/bi'

function Index(props) {
  const { driver } = useContext(Neo4jContext)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [links, setLinks] = useState([])
  const [inputValue, setInputValue] = useState('弧')

  const toast = useToast()

  const runCypher = async () => {
    let querystring = `match (m {name: '${inputValue.trim()}'}) -[r]-> (n) return m, r, n limit 300`
    setLoading(true)
    const session = driver.session()
    const res = await session.run(querystring)
    const records = res.records
    let nodeIds = new Set()
    let nodes = []
    let relations = []
    records.forEach(rec => {
      const [rawM, r, rawN] = rec['_fields']
      const m = rawM['properties']
      const n = rawN['properties']
      if (nodes.length === 0) {
        nodes.push({
          id: parseInt(m['id']),
          category: parseInt(m['kind']) - 1,
          name: m['name']
        })
        nodeIds.add(m['id'])
      }
      if (!nodeIds.has(n['id'])) {
        nodes.push({
          id: parseInt(n['id']),
          category: parseInt(n['kind']) - 1,
          name: n['name']
        })
        nodeIds.add(n['id'])
      }
      relations.push({
        source: m['id'],
        target: n['id'],
        category: 0,
        value: r['type'],
        symbolSize: 5
      })
    })
    await session.close()
    setLoading(false)
    setData(nodes)
    setLinks(relations)
  }

  useLayoutEffect(() => {
    runCypher().catch(error => {
      console.error(error)
      toast({
        title: '请检查数据库连接',
        status: 'error',
        isClosable: true
      })
    })
  }, [])

  return (
    <React.Fragment>
      <Flex
        flexDir={'column'}
        w={'100%'}
        overflowY={'auto'}
        px={[8, 8, 8, 16, 16]}
        py={8}
        gap={4}>
        <Heading as={'h2'}>数据图</Heading>
        <Flex
          w={'100%'}
          flex={1}
          flexDir={'column'}
          border={'1px'}
          borderRadius={'0.375rem'}
          borderColor={'#E2E8F0'}>
          {loading ? (
            <Skeleton w={'100%'} h={'100%'} />
          ) : (
            <ReactECharts
              style={{
                width: '100%',
                height: '100%'
              }}
              onEvents={{
                dblclick: function (params) {
                  if (params.dataType === 'node') {
                    setInputValue(params.name)
                  }
                }
              }}
              option={{
                // 提示框的配置
                tooltip: {
                  formatter: x => {
                    return [x.data.name] //设置提示框的内容和格式 节点和边都显示name属性
                  }
                },
                animationDurationUpdate: 5000,
                // animationEasingUpdate: 'quarticlnOut', // quarticlnOut quinticInOut

                //图形上的文本标签，可用于说明图形的一些数据信息
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  }
                },
                legend: {
                  x: 'center',
                  show: true
                },
                series: [
                  {
                    type: 'graph', // 类型:关系图
                    layout: 'force', //图的布局，类型为力导图
                    symbolSize: 65, //节点大小
                    focusNodeAdjacency: true, //当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
                    draggable: true, //指示节点是否可以拖动
                    roam: true,
                    edgeSymbol: ['none', 'arrow'],
                    categories: [
                      {
                        name: '实体',
                        itemStyle: {
                          color: 'lightgreen'
                        }
                      },
                      {
                        name: '法则',
                        itemStyle: {
                          color: 'dodgerblue'
                        }
                      }
                    ],
                    label: {
                      show: true,
                      textStyle: {
                        fontSize: 12,
                        color: 'black'
                      }
                    },
                    force: {
                      repulsion: 4000, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                      edgeLength: 80, //边的两个节点之间的距离
                      gravity: 0.1 //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                    },
                    edgeSymbolSize: [4, 50], // 边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                    edgeLabel: {
                      show: true,
                      textStyle: {
                        fontSize: 10
                      },
                      formatter: '{c}'
                    },
                    data: data,
                    links: links,
                    lineStyle: {
                      opacity: 0.9,
                      width: 1.1,
                      color: '#262626'
                    }
                  }
                ]
              }}
            />
          )}
        </Flex>
        <Text mb={-2}>查询条目: </Text>
        <Flex flexDir={'row'} gap={2}>
          <Input
            value={inputValue}
            onChange={e => {
              let value = e.target.value
              setInputValue(value)
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                runCypher().catch(error => {
                  console.error(error)
                  toast({
                    title: '请检查数据库连接',
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
              runCypher().catch(error => {
                console.error(error)
                toast({
                  title: '请检查数据库连接',
                  status: 'error',
                  isClosable: true
                })
              })
            }}
          />
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

export default Index
