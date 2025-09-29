import Router from "express";
import { getAllTasks, createTask, getTaskById, deleteTask, updateTask } from "../controllers/TaskController.js";

const router = Router();

router.get("/tarefas", getAllTasks);
router.post("/tarefas", createTask);
router.get("/tarefas/:id", getTaskById);
router.delete("/tarefas/:id", deleteTask);
router.put("/tarefas/:id", updateTask);

export default router;