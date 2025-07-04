import { API_BASE_URL } from '../constants';

class KnowledgeBaseManager {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/knowledge`;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.searchIndex = null;
    this.analytics = {
      searches: 0,
      articleViews: 0,
      helpfulVotes: 0,
      unhelpfulVotes: 0
    };
  }

  /**
   * Search knowledge base articles
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise<Array>} Search results
   */
  async searchArticles(query, options = {}) {
    try {
      const {
        category = null,
        tags = [],
        limit = 20,
        offset = 0,
        sortBy = 'relevance',
        filters = {}
      } = options;

      // Check cache first
      const cacheKey = `search:${query}:${JSON.stringify(options)}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy
      });

      if (category) params.append('category', category);
      if (tags.length > 0) params.append('tags', tags.join(','));
      
      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        params.append(`filter_${key}`, value);
      });

      const response = await fetch(`${this.baseUrl}/search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const results = await response.json();
      
      // Cache results
      this.cache.set(cacheKey, {
        data: results,
        timestamp: Date.now()
      });

      // Track analytics
      this.analytics.searches++;
      this.trackSearchAnalytics(query, results.length);

      return results;
    } catch (error) {
      console.error('Error searching knowledge base:', error);
      throw error;
    }
  }

  /**
   * Get article by ID
   * @param {string} articleId - Article ID
   * @returns {Promise<Object>} Article data
   */
  async getArticle(articleId) {
    try {
      // Check cache
      const cacheKey = `article:${articleId}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const response = await fetch(`${this.baseUrl}/articles/${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
      }

      const article = await response.json();
      
      // Cache article
      this.cache.set(cacheKey, {
        data: article,
        timestamp: Date.now()
      });

      // Track analytics
      this.analytics.articleViews++;
      this.trackArticleView(articleId);

      return article;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  }

  /**
   * Get articles by category
   * @param {string} category - Category name
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Articles in category
   */
  async getArticlesByCategory(category, options = {}) {
    try {
      const {
        limit = 50,
        offset = 0,
        sortBy = 'updated_at',
        sortOrder = 'desc'
      } = options;

      const params = new URLSearchParams({
        category,
        limit: limit.toString(),
        offset: offset.toString(),
        sortBy,
        sortOrder
      });

      const response = await fetch(`${this.baseUrl}/categories/${category}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category articles: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching category articles:', error);
      throw error;
    }
  }

  /**
   * Get popular articles
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Popular articles
   */
  async getPopularArticles(options = {}) {
    try {
      const {
        limit = 10,
        timeRange = '30d', // 7d, 30d, 90d, 1y
        category = null
      } = options;

      const params = new URLSearchParams({
        limit: limit.toString(),
        timeRange
      });

      if (category) params.append('category', category);

      const response = await fetch(`${this.baseUrl}/popular?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch popular articles: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching popular articles:', error);
      throw error;
    }
  }

  /**
   * Get related articles
   * @param {string} articleId - Source article ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Related articles
   */
  async getRelatedArticles(articleId, options = {}) {
    try {
      const {
        limit = 5,
        algorithm = 'content_similarity' // content_similarity, tag_similarity, user_behavior
      } = options;

      const params = new URLSearchParams({
        limit: limit.toString(),
        algorithm
      });

      const response = await fetch(`${this.baseUrl}/articles/${articleId}/related?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch related articles: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching related articles:', error);
      throw error;
    }
  }

  /**
   * Create new article (admin only)
   * @param {Object} articleData - Article data
   * @returns {Promise<Object>} Created article
   */
  async createArticle(articleData) {
    try {
      const response = await fetch(`${this.baseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(articleData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create article: ${response.statusText}`);
      }

      const article = await response.json();
      
      // Clear cache
      this.clearCache();
      
      return article;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  /**
   * Update article (admin only)
   * @param {string} articleId - Article ID
   * @param {Object} updates - Article updates
   * @returns {Promise<Object>} Updated article
   */
  async updateArticle(articleId, updates) {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error(`Failed to update article: ${response.statusText}`);
      }

      const article = await response.json();
      
      // Clear cache for this article
      this.cache.delete(`article:${articleId}`);
      
      return article;
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  /**
   * Delete article (admin only)
   * @param {string} articleId - Article ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteArticle(articleId) {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.statusText}`);
      }

      // Clear cache
      this.cache.delete(`article:${articleId}`);
      
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  }

  /**
   * Rate article helpfulness
   * @param {string} articleId - Article ID
   * @param {boolean} isHelpful - Whether article was helpful
   * @returns {Promise<Object>} Rating result
   */
  async rateArticle(articleId, isHelpful) {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${articleId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({ isHelpful })
      });

      if (!response.ok) {
        throw new Error(`Failed to rate article: ${response.statusText}`);
      }

      // Track analytics
      if (isHelpful) {
        this.analytics.helpfulVotes++;
      } else {
        this.analytics.unhelpfulVotes++;
      }

      return await response.json();
    } catch (error) {
      console.error('Error rating article:', error);
      throw error;
    }
  }

  /**
   * Get article analytics
   * @param {string} articleId - Article ID
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} Analytics data
   */
  async getArticleAnalytics(articleId, options = {}) {
    try {
      const {
        timeRange = '30d',
        metrics = ['views', 'helpful_votes', 'unhelpful_votes', 'search_clicks']
      } = options;

      const params = new URLSearchParams({
        timeRange,
        metrics: metrics.join(',')
      });

      const response = await fetch(`${this.baseUrl}/articles/${articleId}/analytics?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch article analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching article analytics:', error);
      throw error;
    }
  }

  /**
   * Get knowledge base categories
   * @returns {Promise<Array>} Categories
   */
  async getCategories() {
    try {
      const response = await fetch(`${this.baseUrl}/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Get knowledge base tags
   * @returns {Promise<Array>} Tags
   */
  async getTags() {
    try {
      const response = await fetch(`${this.baseUrl}/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  /**
   * Build search index for better performance
   * @returns {Promise<boolean>} Success status
   */
  async buildSearchIndex() {
    try {
      const response = await fetch(`${this.baseUrl}/search/index/build`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to build search index: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error building search index:', error);
      throw error;
    }
  }

  /**
   * Get search suggestions
   * @param {string} query - Partial query
   * @returns {Promise<Array>} Suggestions
   */
  async getSearchSuggestions(query) {
    try {
      if (!query || query.length < 2) {
        return [];
      }

      const response = await fetch(`${this.baseUrl}/search/suggestions?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      return [];
    }
  }

  /**
   * Export knowledge base
   * @param {Object} options - Export options
   * @returns {Promise<Blob>} Exported data
   */
  async exportKnowledgeBase(options = {}) {
    try {
      const {
        format = 'json', // json, csv, pdf
        includeAnalytics = false,
        categories = null
      } = options;

      const params = new URLSearchParams({
        format,
        includeAnalytics: includeAnalytics.toString()
      });

      if (categories) {
        params.append('categories', categories.join(','));
      }

      const response = await fetch(`${this.baseUrl}/export?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to export knowledge base: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting knowledge base:', error);
      throw error;
    }
  }

  /**
   * Import knowledge base
   * @param {File} file - Import file
   * @param {Object} options - Import options
   * @returns {Promise<Object>} Import result
   */
  async importKnowledgeBase(file, options = {}) {
    try {
      const {
        overwrite = false,
        validateOnly = false
      } = options;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('overwrite', overwrite.toString());
      formData.append('validateOnly', validateOnly.toString());

      const response = await fetch(`${this.baseUrl}/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Failed to import knowledge base: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Clear cache after import
      if (!validateOnly) {
        this.clearCache();
      }
      
      return result;
    } catch (error) {
      console.error('Error importing knowledge base:', error);
      throw error;
    }
  }

  /**
   * Track search analytics
   * @param {string} query - Search query
   * @param {number} resultCount - Number of results
   */
  async trackSearchAnalytics(query, resultCount) {
    try {
      await fetch(`${this.baseUrl}/analytics/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          query,
          resultCount,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Error tracking search analytics:', error);
    }
  }

  /**
   * Track article view
   * @param {string} articleId - Article ID
   */
  async trackArticleView(articleId) {
    try {
      await fetch(`${this.baseUrl}/analytics/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          articleId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Error tracking article view:', error);
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache stats
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }

  /**
   * Get analytics summary
   * @returns {Object} Analytics summary
   */
  getAnalyticsSummary() {
    return { ...this.analytics };
  }

  /**
   * Get authentication token
   * @returns {string} Auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Validate article data
   * @param {Object} articleData - Article data to validate
   * @returns {Object} Validation result
   */
  validateArticleData(articleData) {
    const errors = [];
    const warnings = [];

    // Required fields
    if (!articleData.title || articleData.title.trim().length === 0) {
      errors.push('Title is required');
    }

    if (!articleData.content || articleData.content.trim().length === 0) {
      errors.push('Content is required');
    }

    if (!articleData.category) {
      errors.push('Category is required');
    }

    // Content length validation
    if (articleData.title && articleData.title.length > 200) {
      warnings.push('Title is quite long (max 200 characters recommended)');
    }

    if (articleData.content && articleData.content.length < 50) {
      warnings.push('Content seems quite short (minimum 50 characters recommended)');
    }

    // SEO validation
    if (articleData.title && !articleData.title.includes('MedSpaSync')) {
      warnings.push('Consider including "MedSpaSync" in the title for better SEO');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generate article slug
   * @param {string} title - Article title
   * @returns {string} Generated slug
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  /**
   * Extract tags from content
   * @param {string} content - Article content
   * @returns {Array} Extracted tags
   */
  extractTagsFromContent(content) {
    const commonTags = [
      'reconciliation', 'analytics', 'billing', 'onboarding', 'support',
      'tutorial', 'guide', 'tips', 'troubleshooting', 'faq'
    ];

    const extractedTags = [];
    const contentLower = content.toLowerCase();

    commonTags.forEach(tag => {
      if (contentLower.includes(tag)) {
        extractedTags.push(tag);
      }
    });

    return extractedTags;
  }
}

// Create singleton instance
const knowledgeBaseManager = new KnowledgeBaseManager();

export default knowledgeBaseManager; 