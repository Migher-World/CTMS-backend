import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  static _OPENAPI_METADATA_FACTORY() {
    return {
      content: { required: true, type: () => String },
      authorId: { required: true, type: () => String },
      issueId: { required: true, type: () => String },
    };
  }

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  issueId: string;
}
