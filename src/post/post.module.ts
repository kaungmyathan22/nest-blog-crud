import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from 'src/search/search.module';
import PostEntity from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import PostsSearchService from './postsSearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), SearchModule],
  controllers: [PostController],
  providers: [PostService, PostsSearchService],
})
export class PostModule {}
