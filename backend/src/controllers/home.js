const db = require("../../lib/prismadb");

const findHomesByUser = async (req, res) => {
  try {
    const user_id = parseInt(req.params.userId);
    const page = parseInt(req.query.page) || 1;
    const limit = 50;

    const data = await db.user_home.findMany({
      where: {
        user_id,
      },
      include: {
        home: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!data || !data.length) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const homes = data.map((d) => d.home);

    const totalHomes = await db.user_home.count({
      where: {
        user_id,
      },
    });

    const nextPage = totalHomes > page * limit ? page + 1 : null;

    return res.status(200).json({ homes, nextPage });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal error",
    });
  }
};

const updateHomeUsers = async (req, res) => {
  try {
    const home_id = req.body.homeId;
    const user_ids = req.body.userIds;

    if (!home_id || !user_ids) {
      return res.status(400).send({
        message: "Missing required information",
      });
    }

    if (user_ids.length === 0) {
      return res.status(400).send({
        message: "At least one user is required",
      });
    }
    const home = await db.home.findUnique({
      where: {
        home_id,
      },
    });

    if (!home) {
      return res.status(404).send({
        message: "Home not found",
      });
    }

    const currentData = await db.user_home.findMany({
      where: {
        home_id,
      },
    });

    const currentUserIds = currentData.map((d) => d.user_id);

    const usersToAdd = user_ids.filter((id) => !currentUserIds.includes(id));

    const dataToRemove = currentData
      .filter((d) => !user_ids.includes(d.user_id))
      .map((d) => d.id);

    const createData = usersToAdd.map((user_id) => ({
      home_id,
      user_id,
    }));

    const deleteData = dataToRemove.map((id) => ({
      id,
    }));

    await db.user_home.createMany({
      data: createData,
    });

    await db.user_home.deleteMany({
      where: {
        OR: deleteData,
      },
    });

    return res.status(200).json({ message: "Users updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal error",
    });
  }
};

module.exports = { findHomesByUser, updateHomeUsers };
