import type { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export const POST_SEARCH_INDEX = 'posts';

/** Body for `indices.create` / ensure-index — без поля `index` (имя передаётся отдельно). */
export const PostsIndexMapping: Pick<IndicesCreateRequest, 'settings' | 'mappings'> = {
  settings: {
    analysis: {
      analyzer: {
        code_analyzer: {
          type: 'custom',
          tokenizer: 'code_tokenizer',
          filter: ['lowercase'],
        },
      },
      tokenizer: {
        code_tokenizer: {
          type: 'pattern',
          // Разделяем текст только по пробелам и переносам строк.
          // Символы _, $, ::, ->, . остаются частью токена.
          pattern: '[\\s\\n]+',
        },
      },
    },
  },
  mappings: {
    properties: {
      postId: { type: 'keyword' },
      authorId: { type: 'keyword' },
      title: {
        type: 'text',
        analyzer: 'code_analyzer',
        fields: { keyword: { type: 'keyword' } },
      },
      codeSnippet: {
        type: 'text',
        analyzer: 'code_analyzer',
        term_vector: 'with_positions_offsets',
      },
      language: { type: 'keyword' },
      tags: { type: 'keyword' },
      createdAt: { type: 'date' },
      reputation: { type: 'integer' },
    },
  },
};
