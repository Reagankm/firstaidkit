import type { NextApiRequest, NextApiResponse } from 'next'
import { getDB } from './lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { body } = req;

    try {
        if (
            "name" in body &&
            typeof body.name === "string" &&
            "phone" in body &&
            typeof body.phone === "string" &&
            (!("screener" in body) || ("screener" in body && typeof body.screener === "string"))
        ) {
            const db = await getDB();
            let response;
            if (body.screener) {
                response = await db.run('insert into applicant (name, phone, screener) values (?, ?, ?)',
                    body.name,
                    body.phone,
                    body.screener);
            } else {
                response = await db.run('insert into applicant (name, phone) values (?, ?)',
                    body.name,
                    body.phone);
            }

            res.status(200).json(response);
            await db.close();
        } throw new Error("name, phone, or screener missing or incorrect type");
    } catch (e) {
        return res.status(403).json({ err: "Error!" + e });
    }
}
