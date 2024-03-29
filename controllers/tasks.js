const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ AllTasks: tasks }); // same as {tasks : tasks}
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(400).json({ error }); // create a key value pair with key name as error
//   }
// };

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskID}` });
  }
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskID}` });
  }
  res
    .status(200)
    .json({ msg: `Successfully deleted the task with id: ${taskID}` });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, deleteTask, updateTask };
