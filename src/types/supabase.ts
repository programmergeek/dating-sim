export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      respondants: {
        Row: {
          age: number
          correct_choices: number
          gender: string
          id: number
          incorrect_choices: number
        }
        Insert: {
          age: number
          correct_choices: number
          gender: string
          id?: number
          incorrect_choices: number
        }
        Update: {
          age?: number
          correct_choices?: number
          gender?: string
          id?: number
          incorrect_choices?: number
        }
        Relationships: []
      }
      responses: {
        Row: {
          category: string
          character: string
          id: number
          match: boolean | null
        }
        Insert: {
          category: string
          character: string
          id?: number
          match?: boolean | null
        }
        Update: {
          category?: string
          character?: string
          id?: number
          match?: boolean | null
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
