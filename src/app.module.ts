import { AdminModule } from '@admin-bro/nestjs';
import { Module } from '@nestjs/common';
import { ObjectsModule } from './objects/objects.module';
import { AuthModule } from './auth/auth.module';
import { DefaultAdminModule } from 'nestjs-admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
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
import { Categories as Category } from './categories/entities/category.entity';
import { Items as Item } from './items/entities/item.entity';

AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdmin({
      adminBroOptions: {
        rootPath: '/admin',
        resources: [User, Category, Item],
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
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
