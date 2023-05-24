import { randomUUID as uuid } from "node:crypto";

import { buildRoutePath } from "../utils/buildRoutePath.js";
import { Database } from "../../database/db.js";

const database = new Database();

export const userRoutes = [
  {
    method: "GET",
    url: buildRoutePath("/users"),
    handler: async (req, res) => {
      const { search } = req.query;

      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search
            }
          : null
      );

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: "POST",
    url: buildRoutePath("/users"),
    handler: async (req, res) => {
      const { name, email } = req.body;

      if (!name && !email) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Name and email required!" }));
      }

      const id = uuid();

      const newUser = {
        id,
        name,
        email
      };

      const user = database.insert("users", newUser);

      return res.writeHead(201).end(JSON.stringify(newUser));
    }
  },
  {
    method: "PUT",
    url: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      const users = database.select("users");

      const userToUpdate = users.find((user) => {
        return user.id === id;
      });

      if (!userToUpdate) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No user find!" }));
      }

      const updatedUser = {
        name: name ? name : userToUpdate.name,
        email: email ? email : userToUpdate.email
      };
      database.update("users", id, updatedUser);

      return res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    url: buildRoutePath("/users/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      const users = database.select("users");

      const userToDelete = users.find((user) => {
        return user.id === id;
      });

      if (!userToDelete) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "No user find!" }));
      }

      database.delete("users", id);

      return res.writeHead(204).end();
    }
  }
];
