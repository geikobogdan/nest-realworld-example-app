import { ArticleType } from './article.type';

export interface ArticlesResponseInterface {
  articles: Array<ArticleType>;
  articlesCount: number;
}
