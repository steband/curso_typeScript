import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModule } from './author/authorModule';
import { CategoryModule } from './category/categoryModule';
import { AddressModule } from './address/addressModule';
import { UserModule } from './user/userModule';
import { PostgresConfigService } from './config/postgres.config.service';

@Module({  
  imports: [  AuthorModule, 
              CategoryModule,
              AddressModule, 
              UserModule,
              ConfigModule.forRoot({
                isGlobal:true
              }),
              TypeOrmModule.forRootAsync({
                useClass: PostgresConfigService,
                inject: [ PostgresConfigService],
              })
            ]
})
export class AppModule {}
