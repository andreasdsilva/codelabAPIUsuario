import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { UsuarioModule } from './core/usuario/usuario.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '' }`,
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
