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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      quiz_answers_backup: {
        Row: {
          answer_id: string | null
          answer_text: string | null
          answer_value: string | null
          answered_at: string | null
          created_at: string | null
          id: string | null
          question_id: string | null
          quiz_id: string | null
        }
        Insert: {
          answer_id?: string | null
          answer_text?: string | null
          answer_value?: string | null
          answered_at?: string | null
          created_at?: string | null
          id?: string | null
          question_id?: string | null
          quiz_id?: string | null
        }
        Update: {
          answer_id?: string | null
          answer_text?: string | null
          answer_value?: string | null
          answered_at?: string | null
          created_at?: string | null
          id?: string | null
          question_id?: string | null
          quiz_id?: string | null
        }
        Relationships: []
      }
      quiz_manifestation_backup: {
        Row: {
          bemob_click_id: string | null
          conversion_event_fired: boolean | null
          created_at: string | null
          device_type: string | null
          email: string | null
          email_screen_reached_at: string | null
          facebook_pixel_id: string | null
          id: string | null
          last_question_reached: number | null
          main_block: string | null
          manifestation_frequency: string | null
          manifestation_profile: string | null
          name: string | null
          page_viewed_at: string | null
          primary_desire: string | null
          questions_progress: Json | null
          quiz_completed_at: string | null
          quiz_started_at: string | null
          readiness_score: number | null
          referrer: string | null
          result_viewed_at: string | null
          user_agent: string | null
          user_ip: unknown | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          vsl_click_count: number | null
          vsl_clicked_at: string | null
        }
        Insert: {
          bemob_click_id?: string | null
          conversion_event_fired?: boolean | null
          created_at?: string | null
          device_type?: string | null
          email?: string | null
          email_screen_reached_at?: string | null
          facebook_pixel_id?: string | null
          id?: string | null
          last_question_reached?: number | null
          main_block?: string | null
          manifestation_frequency?: string | null
          manifestation_profile?: string | null
          name?: string | null
          page_viewed_at?: string | null
          primary_desire?: string | null
          questions_progress?: Json | null
          quiz_completed_at?: string | null
          quiz_started_at?: string | null
          readiness_score?: number | null
          referrer?: string | null
          result_viewed_at?: string | null
          user_agent?: string | null
          user_ip?: unknown | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vsl_click_count?: number | null
          vsl_clicked_at?: string | null
        }
        Update: {
          bemob_click_id?: string | null
          conversion_event_fired?: boolean | null
          created_at?: string | null
          device_type?: string | null
          email?: string | null
          email_screen_reached_at?: string | null
          facebook_pixel_id?: string | null
          id?: string | null
          last_question_reached?: number | null
          main_block?: string | null
          manifestation_frequency?: string | null
          manifestation_profile?: string | null
          name?: string | null
          page_viewed_at?: string | null
          primary_desire?: string | null
          questions_progress?: Json | null
          quiz_completed_at?: string | null
          quiz_started_at?: string | null
          readiness_score?: number | null
          referrer?: string | null
          result_viewed_at?: string | null
          user_agent?: string | null
          user_ip?: unknown | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vsl_click_count?: number | null
          vsl_clicked_at?: string | null
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          answers: Json | null
          bemob_click_id: string | null
          created_at: string | null
          current_question: number | null
          email: string | null
          email_submitted_at: string | null
          facebook_pixel_id: string | null
          id: string
          main_block: string | null
          manifestation_frequency: string | null
          manifestation_profile: string | null
          name: string | null
          primary_desire: string | null
          questions_completed: number | null
          quiz_completed: boolean | null
          quiz_completed_at: string | null
          quiz_started_at: string | null
          readiness_score: number | null
          referrer: string | null
          result_viewed_at: string | null
          session_id: string | null
          user_agent: string | null
          user_ip: unknown | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          vsl_click_count: number | null
          vsl_clicked_at: string | null
        }
        Insert: {
          answers?: Json | null
          bemob_click_id?: string | null
          created_at?: string | null
          current_question?: number | null
          email?: string | null
          email_submitted_at?: string | null
          facebook_pixel_id?: string | null
          id?: string
          main_block?: string | null
          manifestation_frequency?: string | null
          manifestation_profile?: string | null
          name?: string | null
          primary_desire?: string | null
          questions_completed?: number | null
          quiz_completed?: boolean | null
          quiz_completed_at?: string | null
          quiz_started_at?: string | null
          readiness_score?: number | null
          referrer?: string | null
          result_viewed_at?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_ip?: unknown | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vsl_click_count?: number | null
          vsl_clicked_at?: string | null
        }
        Update: {
          answers?: Json | null
          bemob_click_id?: string | null
          created_at?: string | null
          current_question?: number | null
          email?: string | null
          email_submitted_at?: string | null
          facebook_pixel_id?: string | null
          id?: string
          main_block?: string | null
          manifestation_frequency?: string | null
          manifestation_profile?: string | null
          name?: string | null
          primary_desire?: string | null
          questions_completed?: number | null
          quiz_completed?: boolean | null
          quiz_completed_at?: string | null
          quiz_started_at?: string | null
          readiness_score?: number | null
          referrer?: string | null
          result_viewed_at?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_ip?: unknown | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          vsl_click_count?: number | null
          vsl_clicked_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
