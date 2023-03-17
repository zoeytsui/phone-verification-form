import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const body = JSON.parse(req.body);

  await client.lookups.v1
    .phoneNumbers(body.number)
    .fetch()
    .then((response) => res.status(200).json(response))
    .catch(() => res.status(201).json({ message: "Phone number not found" }));
};
