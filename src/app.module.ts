import { Module } from '@nestjs/common';
import { AuthorModule } from './author/authorModule';
import { CategoryModule } from './category/categoryModule';
import { AddressModule } from './address/addressModule';
import { UserModule } from './user/userModule';

@Module({
  imports: [ AuthorModule, CategoryModule, AddressModule, UserModule]
})
export class AppModule {}
