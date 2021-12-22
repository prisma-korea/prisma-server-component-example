import { NextApiRequest, NextApiResponse } from "next";

export function allowMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: string[]
): boolean {
  const method = req.method;
  if (method !== undefined && methods.includes(method)) {
    return true;
  }
  res.status(405).send({
    message: "Method not allowed",
  });
  return false;
}
