import { randomUUID as uuid } from "node:crypto";

import { Database } from "../../database/db.js";
import { buildRoutePath } from "../utils/buildRoutePath.js";

const database = new Database();

export const taskRoutes = [
  {
    method: "GET",
    url: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: "POST",
    url: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No body sent!" }));
      }

      const id = uuid();
      const created_at = new Date();
      const updated_at = new Date();
      const completed_at = null;

      const newTask = {
        id,
        title,
        description,
        completed_at,
        created_at,
        updated_at
      };

      database.insert("tasks", newTask);

      return res.writeHead(201).end();
    }
  },
  {
    method: "PUT",
    url: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { title, description } = req.body;
      const { id } = req.params;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No body sent!" }));
      }

      const tasks = await database.select("tasks");

      const taskToUpdate = tasks.find((task) => {
        return task.id === id;
      });

      if (!taskToUpdate) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No task found!" }));
      }

      const data = {
        title: title ? title : taskToUpdate.title,
        description: description ? description : taskToUpdate.description,
        completed_at: taskToUpdate.completed_at,
        created_at: taskToUpdate.created_at,
        updated_at: new Date()
      };

      database.update("tasks", id, data);

      return res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    url: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      const tasks = database.select("tasks");

      const tasksToDelete = tasks.find((task) => {
        return task.id === id;
      });

      if (!tasksToDelete) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No task found!" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    }
  },
  {
    method: "PATCH",
    url: buildRoutePath("/tasks/:id/complete"),
    handler: async (req, res) => {
      const { id } = req.params;

      console.log(id);
      const tasks = await database.select("tasks");

      const taskToUpdate = tasks.find((task) => {
        return task.id === id;
      });

      if (!taskToUpdate) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No task found!" }));
      }

      const data = {
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        completed_at: !taskToUpdate.completed_at ? new Date() : null,
        created_at: taskToUpdate.created_at,
        updated_at: new Date()
      };

      database.update("tasks", id, data);

      return res.writeHead(204).end();
    }
  }
];
