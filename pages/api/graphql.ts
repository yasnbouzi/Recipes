import { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

const graphqlEndpoint = process.env.GRAPHCMS_PROJECT_API;
export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
    headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
    },
});

async function proxyGraphql(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { variables, query } = req.body;
        const data = await graphqlClient.rawRequest(query, variables);
        res.json(data);
    } catch (e) {
        res.json({ data: {}, errors: [{ message: e.message }] });
    }
}
export default proxyGraphql;
