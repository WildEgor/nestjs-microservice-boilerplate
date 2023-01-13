import * as path from 'path';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusFederationDriver, MercuriusFederationDriverConfig } from '@nestjs/mercurius';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '@wildegor/common.nodepack.boilerplate/modules/src/adapters';
import { AppLoggerModule } from '@adapters/app-loggers/app-logger.module';
import { GqlPubSubModule } from '@adapters/gql-pubsub/gql-pubsub.module';
import { NotifiersModule } from '@adapters/notifiers/notifiers.module';
import { UnitOfWorkModule } from '@adapters/unit-of-work/unit-of-work.module';
import { ConfigModule } from '@config/config.module';
import { LoggerConfig } from '@config/logger.config';
import { MongoConfig } from '@config/mongo.config';
import { HealthCheckModule } from '@modules/health-check/health-check.module';
import { StatisticModule } from '@modules/statistic/statistic.module';
import { DatabaseModule } from '@src/infrastructure/database/database.module';

@Module({
  imports: [
    // External Modules
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: LoggerConfig,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoConfig,
    }),
    GraphQLModule.forRootAsync<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver, // we use this because fastify dont support apollo v4 yet
      useFactory: () => ({
        federationMetadata: true,
        fieldResolverEnhancers: ['interceptors'],
        // HINT: for schema-first approach
        // typePaths: ['./**/*.graphql'],
        // HINT: for code-first approach
        autoSchemaFile: {
          federation: 1,
          path: path.join(process.cwd(), 'graphql', 'schema.graphql'),
        },
        // HINT: if using schema-first we can autogenerate classes from schema
        // definitions: {
        //   path: join(process.cwd(), 'src/graphql.classes.ts'),
        //   outputAs: 'class',
        // },
        graphiql: true,
        context: ((ctx: object) => ({ ctx: { ...ctx, dataloaders: new WeakMap() } })),
        cors: {
          origin: '*',
          credentials: true,
        },
        subscription: {
          onConnect: (connectionParams) => connectionParams?.payload,
        },
      }),
    }),
    // Infrastructure Modules
    ConfigModule,
    HealthCheckModule,
    AppLoggerModule,
    UnitOfWorkModule,
    DatabaseModule,
    NotifiersModule,
    CqrsModule,
    GqlPubSubModule,
    // Application Modules
    StatisticModule,
  ],
})
export class AppModule {}
