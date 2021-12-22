import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { allowMethods } from "../../../lib/api-utils";

const postApiHandler: NextApiHandler = async (req, res) => {
  if (allowMethods(req, res, ["POST"])) {
    const prisma = new PrismaClient();
    const post = await prisma.post.create({
      data: req.body,
    });
    res.send({
      post,
    });
  }
};

export default postApiHandler;
