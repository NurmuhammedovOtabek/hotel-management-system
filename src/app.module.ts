import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CountryModule } from './country/country.module';
import { StaffsModule } from './staffs/staffs.module';
import { RolesModule } from './roles/roles.module';
import { RoomsModule } from './rooms/rooms.module';
import { InventoryModule } from './inventory/inventory.module';
import { ServiceModule } from './service/service.module';
import { RoomcleanModule } from './roomclean/roomclean.module';
import { RoomInventoryModule } from './room-inventory/room-inventory.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingsGuestsModule } from './bookings-guests/bookings-guests.module';
import { ServiceOrdersModule } from './service-orders/service-orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    CountryModule,
    StaffsModule,
    RolesModule,
    RoomsModule,
    InventoryModule,
    ServiceModule,
    RoomcleanModule,
    RoomInventoryModule,
    BookingsModule,
    BookingsGuestsModule,
    ServiceOrdersModule,
    PaymentsModule,
    ReviewsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
