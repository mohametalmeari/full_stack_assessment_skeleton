const db = require("../../lib/prismadb");

const findAllUsers = async (_req, res) => {
  try {
    const users = await db.user.findMany();

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal error",
    });
  }
};

const findUsersByHome = async (req, res) => {
  try {
    const home_id = parseInt(req.params.homeId);

    const data = await prisma.user_home.findMany({
      where: {
        home_id,
      },
      include: {
        user: true,
      },
    });

    if (!data || !data.length) {
      return res.status(404).send({
        message: "Home not found",
      });
    }

    const users = data.map((d) => d.user);

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal error",
    });
  }
};

module.exports = { findAllUsers, findUsersByHome };
