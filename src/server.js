import http from "node:http";

import { userRoutes } from "./routes/userRoutes.js";
import { taskRoutes } from "./routes/tasksRoutes.js";

import { json } from "./middleware/json.js";
import { extractQueryParams } from "./utils/extractQueryparams.js";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const userRoute = userRoutes.find((route) => {
    return route.method === method && route.url.test(url);
  });

  const taskRoute = taskRoutes.find((route) => {
    return route.method === method && route.url.test(url);
  });

  if (userRoute) {
    const routeParams = req.url.match(userRoute.url);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return userRoute.handler(req, res);
  }

  if (taskRoute) {
    const routeParams = req.url.match(taskRoute.url);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return taskRoute.handler(req, res);
  }

  return res.end(JSON.stringify({ message: "No resource found!" }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
