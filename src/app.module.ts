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
import { PermissionGroupsModule } from './modules/permission-groups/permission-groups.module';
import { PatientsModule } from './modules/patients/patients.module';
import { IssuesModule } from './modules/issues/issues.module';
import { ContractModule } from './modules/contract/contract.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { TrialsModule } from './modules/trials/trials.module';
import { BudgetsModule } from './modules/budgets/budgets.module';
import { FraudPreventionModule } from './modules/fraud-prevention/fraud-prevention.module';
import { EcrfModule } from './modules/ecrf/ecrf.module';
import { AdminModule } from './modules/admin/admin.module';
import IORedis from 'ioredis';

const mg = require('nodemailer-mailgun-transport');

@Module({
  imports: [
    GlobalModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: env.emailHost,
        secure: false,
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        auth: {
          user: env.emailUser,
          pass: env.emailPassword,
        },
      },
      // use mailhog for development
      // transport: 'smtp://localhost:1025',
      template: {
        dir: `${__dirname}/templates`,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    BullModule.forRoot({
      createClient: () =>
        new IORedis(env.redisUrl, {
          enableReadyCheck: false,
          maxRetriesPerRequest: null,
        }),
    }),
    // FirebaseAdminModule.forRootAsync({
    //   useFactory: () => ({
    //     credential: admin.credential.applicationDefault(),
    //   }),
    // }),
    PermissionGroupsModule,
    AuthModule,
    EmailsModule,
    NotificationsModule,
    WebsocketModule,
    CompaniesModule,
    PatientsModule,
    IssuesModule,
    ContractModule,
    InvoicesModule,
    TrialsModule,
    BudgetsModule,
    FraudPreventionModule,
    EcrfModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply to all routes except auth routes using regex
    consumer
      .apply(CompanyMiddleware)
      .exclude(
        { path: '/auth/(.*)', method: RequestMethod.ALL },
        { path: '/permission-groups', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
