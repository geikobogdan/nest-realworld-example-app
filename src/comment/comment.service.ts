import { CommentsResponseInterface } from './types/commentsResponse.interface';
import { CommentResponseInterface } from './types/commentResponse.interface';
import { CommentEntity } from '@app/comment/comment.entity';
import { ArticleEntity } from '@app/article/article.entity';
import { UserEntity } from '@app/user/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createComment(
    currentUser: UserEntity,
    createCommentDto: CreateCommentDto,
    articleSlug: string,
  ): Promise<CommentEntity> {
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);
    const article = await this.findArticleBySlug(articleSlug);
    comment.author = currentUser;
    comment.article = article;
    return await this.commentRepository.save(comment);
  }

  async findArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ slug });
  }

  async findAll(articleSlug: string): Promise<CommentsResponseInterface> {
    const article = await this.findArticleBySlug(articleSlug);
    if (!article) {
      return { comments: [] };
    }
    const queryBuilder = getRepository(CommentEntity)
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.author', 'author')
      .where('comments.articleId = :id', { id: article.id });

    const comments = await queryBuilder.getMany();

    return { comments };
  }

  async deleteComment(
    currentUserId: number,
    commentId: string,
  ): Promise<DeleteResult> {
    const comment = await this.commentRepository.findOne({ id: +commentId });
    if (!comment) {
      throw new HttpException('Comment does not exist', HttpStatus.NOT_FOUND);
    }
    if (comment.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.commentRepository.delete({ id: +commentId });
  }

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    delete comment.article; //?
    return { comment };
  }
}
