import { CommentEntity } from '@app/comment/comment.entity';

export interface CommentsResponseInterface {
  comments: Array<CommentEntity>;
}
