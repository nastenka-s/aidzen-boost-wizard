export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_daily_slots: {
        Row: {
          commit_sha: string | null
          content_kind: string
          error_message: string | null
          payload: Json | null
          publication_day: string
          published_at: string | null
          status: string
          topic_id: string | null
        }
        Insert: {
          commit_sha?: string | null
          content_kind: string
          error_message?: string | null
          payload?: Json | null
          publication_day: string
          published_at?: string | null
          status?: string
          topic_id?: string | null
        }
        Update: {
          commit_sha?: string | null
          content_kind?: string
          error_message?: string | null
          payload?: Json | null
          publication_day?: string
          published_at?: string | null
          status?: string
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_daily_slots_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "blog_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_generations: {
        Row: {
          commit_sha: string | null
          commit_url: string | null
          created_at: string
          error_message: string | null
          id: string
          slug: string | null
          status: string
          title: string | null
          topic_id: string | null
        }
        Insert: {
          commit_sha?: string | null
          commit_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          slug?: string | null
          status: string
          title?: string | null
          topic_id?: string | null
        }
        Update: {
          commit_sha?: string | null
          commit_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          slug?: string | null
          status?: string
          title?: string | null
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_generations_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "blog_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_job_state: {
        Row: {
          id: string
          lease_token: string | null
          lease_until: string | null
          paused_reason: string | null
          resume_after: string | null
          scheduler_secret: string
          updated_at: string
        }
        Insert: {
          id?: string
          lease_token?: string | null
          lease_until?: string | null
          paused_reason?: string | null
          resume_after?: string | null
          scheduler_secret?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lease_token?: string | null
          lease_until?: string | null
          paused_reason?: string | null
          resume_after?: string | null
          scheduler_secret?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_topics: {
        Row: {
          category: string
          content_kind: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          dzen_html: string | null
          editorial_brief: Json | null
          generated_at: string | null
          id: string
          keywords: string
          priority: number
          published_url: string | null
          slug_hint: string
          status: string
          target_date: string | null
          topic: string
        }
        Insert: {
          category: string
          content_kind?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          dzen_html?: string | null
          editorial_brief?: Json | null
          generated_at?: string | null
          id?: string
          keywords: string
          priority?: number
          published_url?: string | null
          slug_hint: string
          status?: string
          target_date?: string | null
          topic: string
        }
        Update: {
          category?: string
          content_kind?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          dzen_html?: string | null
          editorial_brief?: Json | null
          generated_at?: string | null
          id?: string
          keywords?: string
          priority?: number
          published_url?: string | null
          slug_hint?: string
          status?: string
          target_date?: string | null
          topic?: string
        }
        Relationships: []
      }
      pinterest_article_campaigns: {
        Row: {
          article_url: string
          content_kind: string
          created_at: string
          description: string
          publication_day: string
          title: string
        }
        Insert: {
          article_url: string
          content_kind?: string
          created_at?: string
          description?: string
          publication_day: string
          title: string
        }
        Update: {
          article_url?: string
          content_kind?: string
          created_at?: string
          description?: string
          publication_day?: string
          title?: string
        }
        Relationships: []
      }
      pinterest_article_jobs: {
        Row: {
          article_url: string
          due_day: string
          image_payload: Json | null
          last_error: string | null
          pin_id: string | null
          published_at: string | null
          status: string
          variant: number
        }
        Insert: {
          article_url: string
          due_day: string
          image_payload?: Json | null
          last_error?: string | null
          pin_id?: string | null
          published_at?: string | null
          status?: string
          variant: number
        }
        Update: {
          article_url?: string
          due_day?: string
          image_payload?: Json | null
          last_error?: string | null
          pin_id?: string | null
          published_at?: string | null
          status?: string
          variant?: number
        }
        Relationships: [
          {
            foreignKeyName: "pinterest_article_jobs_article_url_fkey"
            columns: ["article_url"]
            isOneToOne: false
            referencedRelation: "pinterest_article_campaigns"
            referencedColumns: ["article_url"]
          },
          {
            foreignKeyName: "pinterest_article_jobs_pin_id_fkey"
            columns: ["pin_id"]
            isOneToOne: false
            referencedRelation: "pinterest_pins"
            referencedColumns: ["id"]
          },
        ]
      }
      pinterest_generation_state: {
        Row: {
          id: string
          lease_token: string | null
          lease_until: string | null
          paused_reason: string | null
          resume_after: string | null
        }
        Insert: {
          id?: string
          lease_token?: string | null
          lease_until?: string | null
          paused_reason?: string | null
          resume_after?: string | null
        }
        Update: {
          id?: string
          lease_token?: string | null
          lease_until?: string | null
          paused_reason?: string | null
          resume_after?: string | null
        }
        Relationships: []
      }
      pinterest_pins: {
        Row: {
          article_url: string | null
          article_variant: number | null
          astro_context: string | null
          created_at: string
          description: string
          error_message: string | null
          id: string
          image_prompt: string | null
          image_url: string
          link_target: string
          link_url: string
          status: string
          style: string
          title: string
          topic: string | null
        }
        Insert: {
          article_url?: string | null
          article_variant?: number | null
          astro_context?: string | null
          created_at?: string
          description: string
          error_message?: string | null
          id?: string
          image_prompt?: string | null
          image_url: string
          link_target: string
          link_url: string
          status?: string
          style: string
          title: string
          topic?: string | null
        }
        Update: {
          article_url?: string | null
          article_variant?: number | null
          astro_context?: string | null
          created_at?: string
          description?: string
          error_message?: string | null
          id?: string
          image_prompt?: string | null
          image_url?: string
          link_target?: string
          link_url?: string
          status?: string
          style?: string
          title?: string
          topic?: string | null
        }
        Relationships: []
      }
      threads_competitor_posts: {
        Row: {
          collected_at: string
          engagement_rate: number | null
          external_id: string | null
          id: string
          language: string | null
          likes: number
          media_type: string | null
          permalink: string | null
          posted_at: string | null
          quotes: number
          replies: number
          reposts: number
          segment: string | null
          source_keyword: string | null
          text: string
          username: string | null
          views: number
        }
        Insert: {
          collected_at?: string
          engagement_rate?: number | null
          external_id?: string | null
          id?: string
          language?: string | null
          likes?: number
          media_type?: string | null
          permalink?: string | null
          posted_at?: string | null
          quotes?: number
          replies?: number
          reposts?: number
          segment?: string | null
          source_keyword?: string | null
          text: string
          username?: string | null
          views?: number
        }
        Update: {
          collected_at?: string
          engagement_rate?: number | null
          external_id?: string | null
          id?: string
          language?: string | null
          likes?: number
          media_type?: string | null
          permalink?: string | null
          posted_at?: string | null
          quotes?: number
          replies?: number
          reposts?: number
          segment?: string | null
          source_keyword?: string | null
          text?: string
          username?: string | null
          views?: number
        }
        Relationships: []
      }
      threads_formats: {
        Row: {
          active: boolean
          created_at: string
          description: string
          id: string
          is_thread: boolean
          name: string
          template: string | null
          weight: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description: string
          id: string
          is_thread?: boolean
          name: string
          template?: string | null
          weight?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          id?: string
          is_thread?: boolean
          name?: string
          template?: string | null
          weight?: number
        }
        Relationships: []
      }
      threads_keywords: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          keyword: string
          language: string
          segment: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          keyword: string
          language?: string
          segment?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          keyword?: string
          language?: string
          segment?: string
        }
        Relationships: []
      }
      threads_posts: {
        Row: {
          created_at: string
          engagement_rate: number | null
          error_message: string | null
          format_id: string | null
          hook: string | null
          id: string
          length_bucket: string | null
          likes: number
          link_target: string
          link_url: string
          metrics_updated_at: string | null
          parent_post_id: string | null
          pattern_ids: string[] | null
          permalink: string | null
          posted_at: string | null
          predicted_score: number | null
          quotes: number
          replies: number
          reply_index: number | null
          reposts: number
          status: string
          text: string
          thread_id: string | null
          topic: string | null
          views: number
        }
        Insert: {
          created_at?: string
          engagement_rate?: number | null
          error_message?: string | null
          format_id?: string | null
          hook?: string | null
          id?: string
          length_bucket?: string | null
          likes?: number
          link_target?: string
          link_url: string
          metrics_updated_at?: string | null
          parent_post_id?: string | null
          pattern_ids?: string[] | null
          permalink?: string | null
          posted_at?: string | null
          predicted_score?: number | null
          quotes?: number
          replies?: number
          reply_index?: number | null
          reposts?: number
          status?: string
          text: string
          thread_id?: string | null
          topic?: string | null
          views?: number
        }
        Update: {
          created_at?: string
          engagement_rate?: number | null
          error_message?: string | null
          format_id?: string | null
          hook?: string | null
          id?: string
          length_bucket?: string | null
          likes?: number
          link_target?: string
          link_url?: string
          metrics_updated_at?: string | null
          parent_post_id?: string | null
          pattern_ids?: string[] | null
          permalink?: string | null
          posted_at?: string | null
          predicted_score?: number | null
          quotes?: number
          replies?: number
          reply_index?: number | null
          reposts?: number
          status?: string
          text?: string
          thread_id?: string | null
          topic?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "threads_posts_format_id_fkey"
            columns: ["format_id"]
            isOneToOne: false
            referencedRelation: "threads_formats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_posts_parent_post_id_fkey"
            columns: ["parent_post_id"]
            isOneToOne: false
            referencedRelation: "threads_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      threads_virality_patterns: {
        Row: {
          active: boolean
          avg_engagement: number | null
          created_at: string
          description: string
          example: string | null
          id: string
          name: string
          pattern_type: string
          sample_size: number | null
          segment: string | null
          updated_at: string
          weight: number
        }
        Insert: {
          active?: boolean
          avg_engagement?: number | null
          created_at?: string
          description: string
          example?: string | null
          id?: string
          name: string
          pattern_type: string
          sample_size?: number | null
          segment?: string | null
          updated_at?: string
          weight?: number
        }
        Update: {
          active?: boolean
          avg_engagement?: number | null
          created_at?: string
          description?: string
          example?: string | null
          id?: string
          name?: string
          pattern_type?: string
          sample_size?: number | null
          segment?: string | null
          updated_at?: string
          weight?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize_blog_scheduler: { Args: { p_secret: string }; Returns: boolean }
      blog_schedule_hour: { Args: { p_kind: string }; Returns: number }
      claim_blog_daily: { Args: { p_kind?: string }; Returns: Json }
      claim_pinterest_article: { Args: never; Returns: Json }
      claim_pinterest_generation: { Args: { p_slot: number }; Returns: Json }
      dispatch_pinterest_articles: { Args: never; Returns: undefined }
      enqueue_pinterest_article: {
        Args: {
          p_day: string
          p_description: string
          p_kind: string
          p_title: string
          p_url: string
        }
        Returns: undefined
      }
      finish_blog_daily: {
        Args: {
          p_article: Json
          p_commit: Json
          p_cover: string
          p_day: string
          p_html: string
          p_kind: string
          p_token: string
          p_topic: string
        }
        Returns: undefined
      }
      finish_pinterest_article: {
        Args: {
          p_content: Json
          p_day: string
          p_token: string
          p_url: string
          p_variant: number
        }
        Returns: string
      }
      pinterest_daily_limit: { Args: never; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
