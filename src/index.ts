import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import {buildSchema, Query, Resolver} from "type-graphql";

const PORT = process.env.PORT || 4000

@Resolver()
class HelloResolver {

    @Query(() => String)
    async hello(){
        return "Hello World"
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver]
    })

    const apolloServer = new ApolloServer({schema})

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`⚡️Server is running at http://localhost:${PORT}/graphql`))
}

main().catch(console.error)