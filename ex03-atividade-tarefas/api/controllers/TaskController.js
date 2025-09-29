import { Task } from "../models/Task.js";
import { v4 as uuidv4 } from "uuid";

const tasks = [];

const getAllTasks = (req, res) => {
    return res.send(tasks);
};

const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    return res.send(task);
}

const createTask = (req, res) => {
    if (!req.body.description) {
        return res.status(400).send({ message: "Description is required" });
    }
    
    const newTask = new Task(uuidv4(), req.body.description, req.body.completed || false);
    tasks.push(newTask);
    return res.status(201).send(newTask);
}

const updateTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).send({ message: "Task not found" });
    }
    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    return res.send(updatedTask);
}

const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).send({ message: "Task not found" });
    }
    tasks.splice(taskIndex, 1);
    return res.status(204).send();
}

export { getAllTasks, createTask, getTaskById , updateTask, deleteTask};