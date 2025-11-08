import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn"],
    });

    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("hotel-management-system")
      .setDescription("The Hotel manegment Api dec")
      .setVersion("1.0")
      .addTag(
        "Nest, accsess and refresh tokrns, cookies, nodeEmailer, Bot and other..."
      )
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, documentFactory);
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost:${PORT}`);
      console.log(`Server start at: http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
