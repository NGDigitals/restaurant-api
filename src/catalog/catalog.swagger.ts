import { DocumentBuilder } from "@nestjs/swagger";
import config from "../config/config";
import { setupSwaggerDocument } from "../common/swagger";

export default setupSwaggerDocument(
  "catalog",
  new DocumentBuilder().addBearerAuth().addServer(`${config.host}`)
    .setTitle("Restaurant API Definition")
    .setDescription("API definition for Restaurant services")
    .setVersion("1.0")
    .build(),
);