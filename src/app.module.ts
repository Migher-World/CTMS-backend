import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AppDataSource, typeOrmConfig } from './config/db.config';
import { EmailsModule } from './shared/alerts/emails/emails.module';
import { NotificationsModule } from './shared/alerts/notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import env from './config/env.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { BullModule } from '@nestjs/bull';
import { WebsocketModule } from './websockets/websocket.module';
import { GlobalModule } from './global.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CompanyMiddleware } from './shared/middlewares/company.middleware';
import { CreateUserModule } from './create-user/create-user.module';
const mg = require('nodemailer-mailgun-transport');

@Module({
  imports: [
    GlobalModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: mg({
        auth: {
          api_key: env.mailgunApiKey,
          domain: env.mailgunDomain,
        },
      }),
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({}),
    // FirebaseAdminModule.forRootAsync({
    //   useFactory: () => ({
    //     credential: admin.credential.applicationDefault(),
    //   }),
    // }),

    AuthModule,
    EmailsModule,
    NotificationsModule,
    WebsocketModule,
    CompaniesModule,
    CreateUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply to all routes except auth routes
    consumer.apply(CompanyMiddleware).exclude({ path: 'auth/*', method: RequestMethod.ALL })/* .forRoutes('*') */;
  }
}
