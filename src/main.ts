 import { NestFactory } from '@nestjs/core';
 import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import * as config from 'config'


async function bootstrap() {
  const serverConfig: { port: any }= config.get('server')
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);


  if(process.env.NODE_ENV === 'develoment') {
    app.enableCors()
  }else {
     app.enableCors({
      origin: '*'
     })
  }


  const port = process.env.PORT ||  serverConfig.port;
  await app.listen(port);
logger.log(`Application listerniing on port ${port}`)
}
bootstrap();
