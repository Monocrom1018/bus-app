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
import { AdminUsers as AdminUser } from './adminUsers/entities/adminUser.entity';
import { Notices as Notice } from './notices/entities/notice.entity';
import { Faqs as Faq } from './faqs/entities/faq.entity';
import { Reservations as Reservation } from './reservations/entities/reservation.entity';
import { Reservations_users } from './reservations_users/entities/reservations_users.entity';
import { ReservationsModule } from './reservations/reservations.module';

AdminBro.registerAdapter({ Database, Resource });
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule.createAdmin({
      adminBroOptions: {
        rootPath: '/admin',
        resources: [
          User,
          AdminUser,
          Notice,
          Faq,
          Reservation,
          Reservations_users,
        ],
      },
      auth: {
        authenticate: async (email, password) => {
          const admin = await AdminUser.findOne({ email });
          if (admin) {
            if (password === admin.password) {
              return {
                email,
                password,
              };
            }
          }
          return null;
        },
        cookieName: 'adminBro',
        cookiePassword: 'testTest',
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
    ReservationsModule,
  ],
})
export class AppModule {}
