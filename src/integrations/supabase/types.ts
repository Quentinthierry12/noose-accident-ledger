export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      dhs_activity_logs: {
        Row: {
          author_email: string
          author_id: string | null
          created_at: string
          details: Json | null
          id: string
          role: string
          type: string
        }
        Insert: {
          author_email: string
          author_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          role: string
          type: string
        }
        Update: {
          author_email?: string
          author_id?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          role?: string
          type?: string
        }
        Relationships: []
      }
      dhs_agencies: {
        Row: {
          acronym: string
          created_at: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
        }
        Insert: {
          acronym: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          acronym?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhs_agent_logins: {
        Row: {
          agent_id: string
          badge_number: string
          created_at: string
          id: string
          is_active: boolean
          last_login: string | null
          password: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          badge_number: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          badge_number?: string
          created_at?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_agent_logins_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_agent_specialties: {
        Row: {
          agent_id: string
          assigned_by: string
          assigned_date: string
          created_at: string
          id: string
          is_active: boolean
          specialty_id: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          assigned_by: string
          assigned_date?: string
          created_at?: string
          id?: string
          is_active?: boolean
          specialty_id: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          assigned_by?: string
          assigned_date?: string
          created_at?: string
          id?: string
          is_active?: boolean
          specialty_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_agent_specialties_agent"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agent_specialties_specialty"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "dhs_specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_agent_trainings: {
        Row: {
          agent_id: string
          assigned_by: string | null
          assigned_date: string | null
          completed_modules: string[] | null
          completion_date: string
          created_at: string
          id: string
          score: number | null
          status: string | null
          training_id: string
          updated_at: string
          validated_by: string
        }
        Insert: {
          agent_id: string
          assigned_by?: string | null
          assigned_date?: string | null
          completed_modules?: string[] | null
          completion_date: string
          created_at?: string
          id?: string
          score?: number | null
          status?: string | null
          training_id: string
          updated_at?: string
          validated_by: string
        }
        Update: {
          agent_id?: string
          assigned_by?: string | null
          assigned_date?: string | null
          completed_modules?: string[] | null
          completion_date?: string
          created_at?: string
          id?: string
          score?: number | null
          status?: string | null
          training_id?: string
          updated_at?: string
          validated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_agent_trainings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_agent_trainings_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "dhs_specialized_trainings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agent_trainings_agent"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agent_trainings_training"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "dhs_specialized_trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_application_forms: {
        Row: {
          created_at: string
          created_by: string
          description: string
          fields: Json
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          fields: Json
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          fields?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhs_applications: {
        Row: {
          applicant_name: string
          created_at: string
          form_id: string
          form_name: string
          id: string
          max_possible_score: number | null
          responses: Json
          reviewed_by: string | null
          reviewer_comment: string | null
          server_id: string
          status: string
          total_score: number | null
          updated_at: string
        }
        Insert: {
          applicant_name: string
          created_at?: string
          form_id: string
          form_name: string
          id?: string
          max_possible_score?: number | null
          responses: Json
          reviewed_by?: string | null
          reviewer_comment?: string | null
          server_id: string
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Update: {
          applicant_name?: string
          created_at?: string
          form_id?: string
          form_name?: string
          id?: string
          max_possible_score?: number | null
          responses?: Json
          reviewed_by?: string | null
          reviewer_comment?: string | null
          server_id?: string
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_applications_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "dhs_application_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_candidates: {
        Row: {
          certification_date: string | null
          certified_by: string | null
          class_ids: string[] | null
          created_at: string
          id: string
          is_certified: boolean | null
          name: string
          server_id: string
          updated_at: string
        }
        Insert: {
          certification_date?: string | null
          certified_by?: string | null
          class_ids?: string[] | null
          created_at?: string
          id?: string
          is_certified?: boolean | null
          name: string
          server_id: string
          updated_at?: string
        }
        Update: {
          certification_date?: string | null
          certified_by?: string | null
          class_ids?: string[] | null
          created_at?: string
          id?: string
          is_certified?: boolean | null
          name?: string
          server_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhs_classes: {
        Row: {
          candidate_ids: string[] | null
          created_at: string
          id: string
          instructor_name: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          candidate_ids?: string[] | null
          created_at?: string
          id?: string
          instructor_name: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          candidate_ids?: string[] | null
          created_at?: string
          id?: string
          instructor_name?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dhs_competition_invitations: {
        Row: {
          candidate_email: string | null
          candidate_name: string
          competition_id: string
          created_at: string
          id: string
          login_identifier: string
          login_password: string
          status: string
          used_at: string | null
        }
        Insert: {
          candidate_email?: string | null
          candidate_name: string
          competition_id: string
          created_at?: string
          id?: string
          login_identifier: string
          login_password: string
          status?: string
          used_at?: string | null
        }
        Update: {
          candidate_email?: string | null
          candidate_name?: string
          competition_id?: string
          created_at?: string
          id?: string
          login_identifier?: string
          login_password?: string
          status?: string
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dhs_competition_invitations_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "dhs_competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_competition_participations: {
        Row: {
          answers: Json
          comment: string | null
          competition_id: string
          id: string
          max_possible_score: number
          participant_name: string
          participant_rio: string | null
          status: string | null
          submitted_at: string
          total_score: number
        }
        Insert: {
          answers: Json
          comment?: string | null
          competition_id: string
          id?: string
          max_possible_score?: number
          participant_name: string
          participant_rio?: string | null
          status?: string | null
          submitted_at?: string
          total_score?: number
        }
        Update: {
          answers?: Json
          comment?: string | null
          competition_id?: string
          id?: string
          max_possible_score?: number
          participant_name?: string
          participant_rio?: string | null
          status?: string | null
          submitted_at?: string
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "dhs_competition_participations_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "dhs_competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_competition_questions: {
        Row: {
          competition_id: string
          correct_answer: string | null
          created_at: string
          id: string
          max_points: number | null
          options: Json | null
          order_number: number
          question: string
          type: string
        }
        Insert: {
          competition_id: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          max_points?: number | null
          options?: Json | null
          order_number: number
          question: string
          type: string
        }
        Update: {
          competition_id?: string
          correct_answer?: string | null
          created_at?: string
          id?: string
          max_points?: number | null
          options?: Json | null
          order_number?: number
          question?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_competition_questions_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "dhs_competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_competitions: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          is_entry_test: boolean | null
          max_score: number
          specialty: string | null
          start_date: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_entry_test?: boolean | null
          max_score?: number
          specialty?: string | null
          start_date?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          is_entry_test?: boolean | null
          max_score?: number
          specialty?: string | null
          start_date?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhs_disciplinary_records: {
        Row: {
          agent_id: string
          created_at: string
          date: string
          id: string
          issued_at: string | null
          issued_by: string
          reason: string
          type: string
          updated_at: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          date: string
          id?: string
          issued_at?: string | null
          issued_by: string
          reason: string
          type: string
          updated_at?: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          date?: string
          id?: string
          issued_at?: string | null
          issued_by?: string
          reason?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_disciplinary_records_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_disciplinary_templates: {
        Row: {
          agency_id: string | null
          content: string
          created_at: string
          created_by: string
          id: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          content: string
          created_at?: string
          created_by: string
          id?: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_disciplinary_templates_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_grades: {
        Row: {
          agency_id: string
          authority_level: number | null
          created_at: string
          id: string
          name: string
          order_number: number
          updated_at: string
        }
        Insert: {
          agency_id: string
          authority_level?: number | null
          created_at?: string
          id?: string
          name: string
          order_number: number
          updated_at?: string
        }
        Update: {
          agency_id?: string
          authority_level?: number | null
          created_at?: string
          id?: string
          name?: string
          order_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_grades_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_internal_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_group_message: boolean | null
          mailing_list_id: string | null
          read_by: string[] | null
          recipient_emails: string[]
          sender_email: string
          sender_id: string | null
          sent_at: string
          subject: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_group_message?: boolean | null
          mailing_list_id?: string | null
          read_by?: string[] | null
          recipient_emails: string[]
          sender_email: string
          sender_id?: string | null
          sent_at?: string
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_group_message?: boolean | null
          mailing_list_id?: string | null
          read_by?: string[] | null
          recipient_emails?: string[]
          sender_email?: string
          sender_id?: string | null
          sent_at?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_internal_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "dhs_police_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_mailing_lists: {
        Row: {
          agency_id: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          member_emails: string[]
          name: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          member_emails?: string[]
          name: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          member_emails?: string[]
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_mailing_lists_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_modules: {
        Row: {
          created_at: string
          description: string | null
          id: string
          instructor_in_charge: string | null
          name: string
          order_number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_in_charge?: string | null
          name: string
          order_number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          instructor_in_charge?: string | null
          name?: string
          order_number?: number
          updated_at?: string
        }
        Relationships: []
      }
      dhs_police_agents: {
        Row: {
          address: string | null
          agency_id: string
          badge_number: string
          candidate_id: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          grade_id: string
          id: string
          name: string
          phone_number: string | null
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          agency_id: string
          badge_number: string
          candidate_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          grade_id: string
          id?: string
          name: string
          phone_number?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          agency_id?: string
          badge_number?: string
          candidate_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          grade_id?: string
          id?: string
          name?: string
          phone_number?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_police_agents_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_police_agents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "dhs_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_police_agents_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "dhs_grades"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_quiz_attempts: {
        Row: {
          answers: Json
          candidate_id: string | null
          completed_at: string | null
          created_at: string
          external_login: string | null
          id: string
          is_completed: boolean
          max_possible_score: number
          participant_name: string
          percentage: number
          quiz_id: string
          score: number
          started_at: string
        }
        Insert: {
          answers?: Json
          candidate_id?: string | null
          completed_at?: string | null
          created_at?: string
          external_login?: string | null
          id?: string
          is_completed?: boolean
          max_possible_score: number
          participant_name: string
          percentage?: number
          quiz_id: string
          score?: number
          started_at?: string
        }
        Update: {
          answers?: Json
          candidate_id?: string | null
          completed_at?: string | null
          created_at?: string
          external_login?: string | null
          id?: string
          is_completed?: boolean
          max_possible_score?: number
          participant_name?: string
          percentage?: number
          quiz_id?: string
          score?: number
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_quiz_attempts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "dhs_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "dhs_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_quiz_participants: {
        Row: {
          candidate_id: string | null
          created_at: string
          external_login: string | null
          external_password: string | null
          id: string
          is_completed: boolean
          quiz_id: string
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string
          external_login?: string | null
          external_password?: string | null
          id?: string
          is_completed?: boolean
          quiz_id: string
        }
        Update: {
          candidate_id?: string | null
          created_at?: string
          external_login?: string | null
          external_password?: string | null
          id?: string
          is_completed?: boolean
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_quiz_participants_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "dhs_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_quiz_participants_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "dhs_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string
          id: string
          options: Json | null
          order_number: number
          points: number
          question: string
          quiz_id: string
          type: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          id?: string
          options?: Json | null
          order_number: number
          points?: number
          question: string
          quiz_id: string
          type?: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          id?: string
          options?: Json | null
          order_number?: number
          points?: number
          question?: string
          quiz_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "dhs_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_quizzes: {
        Row: {
          allow_retakes: boolean
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_active: boolean
          max_score: number
          module_id: string | null
          sub_module_id: string | null
          time_limit: number | null
          title: string
          updated_at: string
        }
        Insert: {
          allow_retakes?: boolean
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_score?: number
          module_id?: string | null
          sub_module_id?: string | null
          time_limit?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          allow_retakes?: boolean
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_score?: number
          module_id?: string | null
          sub_module_id?: string | null
          time_limit?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_quizzes_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "dhs_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_quizzes_sub_module_id_fkey"
            columns: ["sub_module_id"]
            isOneToOne: false
            referencedRelation: "dhs_sub_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_resources: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      dhs_specialized_trainings: {
        Row: {
          agency_id: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_specialized_trainings_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_specialties: {
        Row: {
          agency_id: string
          competition_ids: string[] | null
          created_at: string
          description: string | null
          id: string
          module_ids: string[] | null
          name: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          competition_ids?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          module_ids?: string[] | null
          name: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          competition_ids?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          module_ids?: string[] | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_specialties_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_sub_module_appreciations: {
        Row: {
          appreciation: string | null
          candidate_id: string
          created_at: string | null
          id: string
          instructor_id: string | null
          sub_module_id: string
          updated_at: string | null
        }
        Insert: {
          appreciation?: string | null
          candidate_id: string
          created_at?: string | null
          id?: string
          instructor_id?: string | null
          sub_module_id: string
          updated_at?: string | null
        }
        Update: {
          appreciation?: string | null
          candidate_id?: string
          created_at?: string | null
          id?: string
          instructor_id?: string | null
          sub_module_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      dhs_sub_module_scores: {
        Row: {
          candidate_id: string
          comment: string | null
          id: string
          instructor_id: string | null
          max_score: number
          score: number
          sub_module_id: string
          timestamp: string
        }
        Insert: {
          candidate_id: string
          comment?: string | null
          id?: string
          instructor_id?: string | null
          max_score?: number
          score?: number
          sub_module_id: string
          timestamp?: string
        }
        Update: {
          candidate_id?: string
          comment?: string | null
          id?: string
          instructor_id?: string | null
          max_score?: number
          score?: number
          sub_module_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_sub_module_scores_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "dhs_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dhs_sub_module_scores_sub_module_id_fkey"
            columns: ["sub_module_id"]
            isOneToOne: false
            referencedRelation: "dhs_sub_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_sub_modules: {
        Row: {
          appreciation: string | null
          created_at: string
          id: string
          is_optional: boolean | null
          max_score: number
          module_id: string
          name: string
          order_number: number
          updated_at: string
        }
        Insert: {
          appreciation?: string | null
          created_at?: string
          id?: string
          is_optional?: boolean | null
          max_score?: number
          module_id: string
          name: string
          order_number: number
          updated_at?: string
        }
        Update: {
          appreciation?: string | null
          created_at?: string
          id?: string
          is_optional?: boolean | null
          max_score?: number
          module_id?: string
          name?: string
          order_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_sub_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "dhs_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_training_modules: {
        Row: {
          created_at: string
          description: string | null
          id: string
          max_score: number | null
          order_number: number
          title: string
          training_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          max_score?: number | null
          order_number: number
          title: string
          training_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          max_score?: number | null
          order_number?: number
          title?: string
          training_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_training_modules_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "dhs_specialized_trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_uniforms: {
        Row: {
          agency_id: string | null
          badges_logos: string | null
          bags_parachutes: number | null
          body_armor_accessories: number | null
          created_at: string
          created_by: string
          description: string | null
          hands_upper_body: number | null
          hats_helmets: number | null
          id: string
          image_url: string | null
          legs_pants: number | null
          mask_facial_hair: number | null
          name: string
          neck_scarfs: number | null
          shirt_accessories: number | null
          shirt_overlay_jackets: number | null
          shoes: number | null
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          badges_logos?: string | null
          bags_parachutes?: number | null
          body_armor_accessories?: number | null
          created_at?: string
          created_by: string
          description?: string | null
          hands_upper_body?: number | null
          hats_helmets?: number | null
          id?: string
          image_url?: string | null
          legs_pants?: number | null
          mask_facial_hair?: number | null
          name: string
          neck_scarfs?: number | null
          shirt_accessories?: number | null
          shirt_overlay_jackets?: number | null
          shoes?: number | null
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          badges_logos?: string | null
          bags_parachutes?: number | null
          body_armor_accessories?: number | null
          created_at?: string
          created_by?: string
          description?: string | null
          hands_upper_body?: number | null
          hats_helmets?: number | null
          id?: string
          image_url?: string | null
          legs_pants?: number | null
          mask_facial_hair?: number | null
          name?: string
          neck_scarfs?: number | null
          shirt_accessories?: number | null
          shirt_overlay_jackets?: number | null
          shoes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dhs_uniforms_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "dhs_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      dhs_users: {
        Row: {
          active: boolean | null
          created_at: string
          email: string
          id: string
          identifiant: string
          last_login: string | null
          nom: string
          password: string
          prenom: string
          role: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          email: string
          id?: string
          identifiant: string
          last_login?: string | null
          nom: string
          password?: string
          prenom: string
          role?: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          email?: string
          id?: string
          identifiant?: string
          last_login?: string | null
          nom?: string
          password?: string
          prenom?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      dhs_webhook_config: {
        Row: {
          class_creation_url: string | null
          config: Json | null
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          class_creation_url?: string | null
          config?: Json | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          class_creation_url?: string | null
          config?: Json | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      noose_accidents: {
        Row: {
          added_by: string
          cost: number
          created_at: string
          date: string
          description: string
          id: string
          updated_at: string
        }
        Insert: {
          added_by: string
          cost?: number
          created_at?: string
          date?: string
          description: string
          id?: string
          updated_at?: string
        }
        Update: {
          added_by?: string
          cost?: number
          created_at?: string
          date?: string
          description?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      noose_colleague_profile: {
        Row: {
          created_at: string
          id: string
          name: string
          nickname: string | null
          photo_url: string | null
          surname: string
          total_accidents: number
          total_cost: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          nickname?: string | null
          photo_url?: string | null
          surname: string
          total_accidents?: number
          total_cost?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          nickname?: string | null
          photo_url?: string | null
          surname?: string
          total_accidents?: number
          total_cost?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dhs_authenticate_user: {
        Args: { p_identifier: string; p_password: string }
        Returns: {
          active: boolean | null
          created_at: string
          email: string
          id: string
          identifiant: string
          last_login: string | null
          nom: string
          password: string
          prenom: string
          role: string
          updated_at: string
        }[]
      }
      dhs_check_user_active: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      dhs_log_activity: {
        Args: {
          activity_type: string
          author_email: string
          author_role: string
          activity_details?: Json
        }
        Returns: undefined
      }
      dhs_update_user_last_login: {
        Args: { user_id: string; login_time: string }
        Returns: undefined
      }
      generate_agent_email: {
        Args: { agent_name: string }
        Returns: string
      }
      generate_secure_password: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_unique_login_identifier: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
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
