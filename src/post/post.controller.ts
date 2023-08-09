import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import { FindOneParams } from 'src/utils/find-one-params';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationParams } from './dto/pagination-params.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(createPostDto, req.user);
  }
  @Get()
  async getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getAllPosts(offset, limit);
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
