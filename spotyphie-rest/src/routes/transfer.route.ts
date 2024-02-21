import { Router, Request, Response } from "express";
import { prisma } from "../configs/config";
import { tokenAuthenticator } from "../middleware";

const router = Router();

router.patch('/transfer', tokenAuthenticator, async (req: Request, res: Response) => {
  /*
  req body params:
  from_user_id: int
  to_user_id: int
  amount: int
  */
  const { from_user_id, to_user_id, amount } = req.body;

  try {
    // Find the user who initiates the transfer
    const fromUser = await prisma.userApp.findUnique({
      where: {
        user_id: from_user_id
      }
    });

    if (fromUser === null) {
      return res.status(404).send("User initiating the transfer not found");
    }

    // Check if the user has sufficient credits for the transfer
    if (fromUser.credits < amount) {
      return res.status(400).send("Insufficient credits for the transfer");
    }

    // Find the user who receives the transfer
    const toUser = await prisma.userApp.findUnique({
      where: {
        user_id: to_user_id
      }
    });

    if (toUser === null) {
      return res.status(404).send("User receiving the transfer not found");
    }

    // Perform the credit transfer
    await prisma.userApp.update({
      where: {
        user_id: from_user_id
      },
      data: {
        credits: fromUser.credits - amount
      }
    });

    await prisma.userApp.update({
      where: {
        user_id: to_user_id
      },
      data: {
        credits: toUser.credits + amount
      }
    });

    return res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

export { router as transfer };
