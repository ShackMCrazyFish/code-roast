import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { POST_SEARCH_INDEX } from '../consts/post-search.index';
import { SearchHit, SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

class SearchQueryDto {
  q: string;
  language: string;
  tags: string[];
  sort: string;
}

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(query: SearchQueryDto) {
    const { q, language, tags, sort } = query;

    const must: any[] = [];
    const filter: any[] = [];

    if (q) {
      must.push({
        multi_match: {
          query: q,
          fields: ['title^2', 'code'],
          type: 'best_fields',
        },
      });
    }

    if (language) {
      filter.push({
        term: {
          language: language,
        },
      });
    }

    if (tags.length > 0) {
      filter.push({
        terms: {
          tags: tags,
        },
      });
    }

    const response = await this.elasticsearchService.search({
      index: POST_SEARCH_INDEX,
      query: { bool: { must, filter } },
      sort: sort ? [{ [sort]: { order: 'desc' } }] : [],
      highlight: {
        fields: {
          codeSnippet: {
            fragment_size: 150,
            number_of_fragments: 3,
            pre_tags: ['<mark>'],
            post_tags: ['</mark>'],
          },
        },
      },
      size: 20,
    });

    return {
      hits: response.hits.hits.map((hit: SearchHit) => ({
        ...(hit._source || {}),
        highlight: hit.highlight,
      })),
      total: (response.hits.total as SearchTotalHits).value,
    };
  }
}
