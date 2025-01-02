const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fine Management API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: [
    "./swaggerDocumentation/fineApisDocumentation.js",
    "./swaggerDocumentation/violatorApisDocumentation.js",
    "./swaggerDocumentation/bulkViolatorOperationApisDocumentation.js",
    "./swaggerDocumentation/bulkFineOperationApisDocumentation.js",
    "./swaggerDocumentation/supportingDocumentApisDocumentation.js",
  ], // Path to Swagger definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
