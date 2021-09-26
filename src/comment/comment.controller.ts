import { CommentsResponseInterface } from './types/commentsResponse.interface';
import { CreateCommentDto } from './dto/createComment.dto';
import { UserEntity } from '@app/user/user.entity';
import { AuthGuard } from './../user/guards/auth.guard';
import { CommentService } from './comment.service';
import {
  Body,
  Get,
  Controller,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';
import { CommentResponseInterface } from './types/commentResponse.interface';
import { User } from '@app/user/decorators/user.decorator';

@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async createComment(
    @User() currentUser: UserEntity,
    @Param('slug') articleSlug: string,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseInterface> {
    const comment = await this.commentService.createComment(
      currentUser,
      createCommentDto,
      articleSlug,
    );
    return this.commentService.buildCommentResponse(comment);
  }

  @Get()
  async findAll(
    @Param('slug') articleSlug: string,
  ): Promise<CommentsResponseInterface> {
    return await this.commentService.findAll(articleSlug);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteComment(
    @User('id') currentUserId: number,
    @Param('id') id: string,
  ) {
    return await this.commentService.deleteComment(currentUserId, id);
  }
}
