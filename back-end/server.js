const { server, port, host } = require("./dependencies");
const routes = require("./routes/routes"); // Import the routes
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use the routes for the /api path
server.use("/api", routes);

// Start the server
server.listen(port, () => {
  console.log(`Server has started and listening at http://${host}:${port}`);
});
