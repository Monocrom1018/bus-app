import { AdminModule } from '@admin-bro/nestjs';
import { Module } from '@nestjs/common';
import { ObjectsModule } from './objects/objects.module';
import { AuthModule } from './auth/auth.module';
import { DefaultAdminModule } from 'nestjs-admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { PhoneCertificationsModule } from './phone-certifications/phone-certifications.module';
import { NoticesModule } from './notices/notices.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { FollowsModule } from './follows/follows.module';
import { FaqsModule } from './faqs/faqs.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommentsModule } from './comments/comments.module';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
import { Users as User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

AdminBro.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule.createAdmin({
      adminBroOptions: {
        rootPath: '/admin',
        resources: [User],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
    }),
    ObjectsModule,
    AuthModule,
    // DefaultAdminModule,
    UsersModule,
    CategoriesModule,
    ItemsModule,
    PhoneCertificationsModule,
    NoticesModule,
    LikesModule,
    ImagesModule,
    FollowsModule,
    FaqsModule,
    ContactsModule,
    CommentsModule,
  ],
})
export class AppModule {}
