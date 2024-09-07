import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userID;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [tokenUserId],
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    console.log(chats);

    for (const chat of chats) {
      console.log(tokenUserId);
      const receiverId = chat.userIds.find((id) => id != tokenUserId);

      console.log(receiverId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.receiver = receiver;
    }
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userID;
  try {
    const chatId = req.params.id;
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIds: {
          hasSome: [tokenUserId],
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

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserID = req.userID;
  try {
    const receiverId = req.body.receiverId;
    // Sort the IDs to ensure consistent order
    const userIds = [tokenUserID, receiverId].sort();

    const existingChats = await prisma.chat.findMany({
      where: {
        userIds: {
          equals: userIds,
        },
      },
    });

    if (existingChats.length > 0) {
      res.status(200).json(existingChats[0]);
    } else {
      const newChat = await prisma.chat.create({
        data: {
          userIds,
        },
      });
      res.status(200).json(newChat);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserID = req.userID;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIds: {
          hasSome: [tokenUserID],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserID],
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat" });
  }
};

export const deleteChat = async (req, res) => {
  const id = req.params.id;
  const tokenUserID = req.userID;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userIds: {
          hasSome: [tokenUserID],
        },
      },
    });

    await prisma.message.deleteMany({
      where: { chatId: id },
    });

    await prisma.chat.delete({
      where: { id },
    });
    res.status(200).json({ message: "Chat deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete chat" });
  }
};
