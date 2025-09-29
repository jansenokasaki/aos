import { Task } from "../models/Task.js";
import { v4 as uuidv4 } from "uuid";

const taskList = [];

const getAllTasks = (req, res) => {
    return res.send(taskList);
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const foundTask = taskList.find(t => t.id === id);
    if (!foundTask) {
        return res.status(404).send({ message: "Task not found" });
    }
    return res.send(foundTask);
}

const createTask = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({ message: "Description is required" });
    }
    
    const newTaskItem = new Task(uuidv4(), req.body.description, req.body.completed || false);
    taskList.push(newTaskItem);
    return res.status(201).send(newTaskItem);
}

const updateTask = (req, res) => {
    const { id } = req.params;
    const taskPosition = taskList.findIndex(t => t.id === id);
    if (taskPosition === -1) {
        return res.status(404).send({ message: "Task not found" });
    }
    const modifiedTask = { ...taskList[taskPosition], ...req.body };
    taskList[taskPosition] = modifiedTask;
    return res.send(modifiedTask);
}

const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskPosition = taskList.findIndex(t => t.id === id);
    if (taskPosition === -1) {
        return res.status(404).send({ message: "Task not found" });
    }
    taskList.splice(taskPosition, 1);
    return res.status(204).send();
}

export { getAllTasks, createTask, getTaskById, updateTask, deleteTask };