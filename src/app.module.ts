import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { VideoModule } from './modules/video/video.module';
import { ProjectModule } from './modules/project/project.module';
import { ContactModule } from './modules/contact/contact.module';
import { ServiceModule } from './modules/service/service.module';


@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgre',
        password: '1111',
        database: 'secser',
        autoLoadEntities: true,
        synchronize: true
      }),

      AdminModule,
      GalleryModule,
      VideoModule,
      ProjectModule,
      ContactModule,
      ServiceModule
  ],
  
})
export class AppModule {}
