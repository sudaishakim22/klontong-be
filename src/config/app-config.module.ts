import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { JwtConfigService } from './jwt-config.service';

const providers = [AppConfigService, JwtConfigService];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers,
  exports: providers,
})
export class AppConfigModule {}
