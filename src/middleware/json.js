export const json = async (req, res) => {
  const buffer = [];

  for await (let chunk of req) {
    buffer.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", "application/json");
};
