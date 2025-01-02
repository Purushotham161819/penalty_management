const { server, port, host } = require("./dependencies");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("./apis/fineApi");
require("./apis/violatorApi");
require("./apis/bulkViolatorOperationsApi");
require("./apis/bulkFineOperationsApi");
require("./apis/supportingDocumentApi");

// Start the server
server.listen(port, () => {
  console.log(`Server has started and listening at http://${host}:${port}`);
});
