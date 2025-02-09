import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      const timeStamp = new Date();
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          updatedAt: timeStamp,
          seenBy: { ...(conversation.seenBy as {}), [senderId]: timeStamp },
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
      await prisma.profile.update({
        where: { userId: receiverId },
        data: {
          unSeenConversationsIds: {
            push: senderId,
          },
        },
      });
    }
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      io.emit("newMessageNotification");
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markConversationSeen = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const { conversationId } = req.body;
    const user = await prisma.profile.findUnique({
      where: { userId },
    });
    console.log({ user });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user?.unSeenConversationsIds, conversationId);
    console.log(
      user.unSeenConversationsIds.filter((id: string) => id !== conversationId)
    );
    await prisma.profile.update({
      where: { userId },
      data: {
        unSeenConversationsIds: user.unSeenConversationsIds.filter(
          (id: string) => id !== conversationId
        ),
      },
    });
    res.status(200).json({ message: "Conversation marked as seen" });
  } catch (error: any) {
    console.error("Error in markConversationSeen: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
