import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error retrieving posts" });
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error retrieving post" });
  }
};
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  console.log(body);
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
        adress: body.adress,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Error retrieving posts: ${err.message}` });
  }
};
export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error updating posts" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete this post" });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting posts" });
  }
};
