import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { allowMethods } from "../../../lib/api-utils";

const postIdApiHandler: NextApiHandler = async (req, res) => {
  if (allowMethods(req, res, ["PATCH"])) {
    const prisma = new PrismaClient();

    const id = req.query.id;
    if (typeof id !== "string") {
      res.status(404).send("Not found");
      return;
    }

    const post = await prisma.post.update({
      where: { id },
      data: req.body,
    });

    res.send({
      post,
    });
  }
};

export default postIdApiHandler;
