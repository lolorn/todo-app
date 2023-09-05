import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    try {
        switch (req.method) {
            case "GET":
                res.json(666)
                break;
        
            default:
                break;
        }
    } catch (error) {
        
    }
}