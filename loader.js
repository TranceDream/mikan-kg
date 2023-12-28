import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import neo4j from 'neo4j-driver'
import {
  errorHandler,
  infoHandler,
  logHandler,
  successHandler
} from './console-handler.js'

dotenv.config()

const driver = neo4j.driver(
  process.env.NEO4J,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const clear = async () => {
  const session = driver.session()
  await session.run('match (n) detach delete n')
}

const addNode = async ({
  entity1,
  entity1_id,
  entity1_kind,
  entity2,
  entity2_id,
  entity2_kind,
  relation
}) => {
  const session = driver.session()
  await session.run(`
    MERGE (a:Node${entity1_kind} {name: '${entity1}', id: '${entity1_id}', kind: '${entity1_kind}'})
    MERGE (b:Node${entity2_kind} {name: '${entity2}', id: '${entity2_id}', kind: '${entity2_kind}'})
    MERGE (a)-[:${relation}]->(b)
  `)
  await session.close()
}

const removeNull = async () => {
  const session = driver.session()
  await session.run(`
    match (n {kind: 'null'}) detach delete n
  `)
}

const main = async () => {
  // 导入Neo4j
  logHandler('导入entity_relation···')
  let count = 0
  let relationFile = path.join(process.cwd(), 'entity_relation.json')
  const relations = JSON.parse(fs.readFileSync(relationFile).toString())
  for (let item of relations) {
    await addNode(item)
    count++
  }
  await removeNull()
  await driver.close()
  successHandler(`成功添加${count}条数据`)
  process.exit(0)
}

await main().catch(errorHandler)
