import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PrivateFile from './entities/privateFile.entity';
import PublicFile from './entities/publicFile.entity';
import { FilesService } from './files.service';
import { PrivateFilesService } from './privateFile.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile, PrivateFile]), ConfigModule],
  providers: [FilesService, PrivateFilesService],
  exports: [FilesService, PrivateFilesService],
})
export class FilesModule {}
