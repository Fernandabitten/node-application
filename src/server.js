require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/appError");
const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = 3333;
app.use(express.json());
app.use(routes);
migrationsRun();

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
