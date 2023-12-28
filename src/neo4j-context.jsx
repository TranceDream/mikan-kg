import { createContext } from 'react'
import neo4j from 'neo4j-driver'

export const createDriver = () => {
  const protocol = localStorage.getItem('protocol') ?? 'bolt'
  const host = localStorage.getItem('host') ?? 'localhost'
  const port = localStorage.getItem('port') ?? '7687'
  const user = localStorage.getItem('user') ?? 'neo4j'
  const password = localStorage.getItem('password') ?? ''

  console.log(user, password)

  return neo4j.driver(
    `${protocol}://${host}:${port}`,
    neo4j.auth.basic(user, password)
  )
}


const Neo4jContext = createContext({
  driver: createDriver(), setDriver: (d) => {}
})

Neo4jContext.displayName = 'Neo4jContext'

export default Neo4jContext
