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
          gender: string
          id: number
          score: number
        }
        Insert: {
          age: number
          gender: string
          id?: number
          score: number
        }
        Update: {
          age?: number
          gender?: string
          id?: number
          score?: number
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
