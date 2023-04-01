export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artist: {
        Row: {
          info: string | null
          name: string
          slug: string
        }
        Insert: {
          info?: string | null
          name: string
          slug: string
        }
        Update: {
          info?: string | null
          name?: string
          slug?: string
        }
      }
      game: {
        Row: {
          info: string | null
          slug: string
          title: string
        }
        Insert: {
          info?: string | null
          slug: string
          title: string
        }
        Update: {
          info?: string | null
          slug?: string
          title?: string
        }
      }
      igdb_game: {
        Row: {
          data: Json
          game_slug: string
          igdb_id: number
        }
        Insert: {
          data: Json
          game_slug: string
          igdb_id: number
        }
        Update: {
          data?: Json
          game_slug?: string
          igdb_id?: number
        }
      }
      track: {
        Row: {
          artists: string[] | null
          banned: boolean | null
          file: string
          game: string | null
          info: string | null
          length: number
          slug: string
          tags: string[] | null
          title: string
        }
        Insert: {
          artists?: string[] | null
          banned?: boolean | null
          file: string
          game?: string | null
          info?: string | null
          length: number
          slug: string
          tags?: string[] | null
          title: string
        }
        Update: {
          artists?: string[] | null
          banned?: boolean | null
          file?: string
          game?: string | null
          info?: string | null
          length?: number
          slug?: string
          tags?: string[] | null
          title?: string
        }
      }
    }
    Views: {
      tracks_view: {
        Row: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }
      }
      vgmusic_random_track: {
        Row: {
          artists: string[] | null
          file: string | null
          game_title: string | null
          igdb_image_id: Json | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }
      }
    }
    Functions: {
      get_track_info: {
        Args: {
          track_slug: string
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_artists: {
        Args: {
          track_artists: string[]
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_artists_paginated: {
        Args: {
          track_artists: string[]
          page_number: number
          page_size?: number
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_game: {
        Args: {
          track_game: string
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_game_paginated: {
        Args: {
          track_game: string
          page_number: number
          page_size?: number
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_some_tags: {
        Args: {
          track_tags: string[]
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_some_tags_paginated: {
        Args: {
          track_tags: string[]
          page_number: number
          page_size?: number
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_tags: {
        Args: {
          track_tags: string[]
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      get_tracks_by_tags_paginated: {
        Args: {
          track_tags: string[]
          page_number: number
          page_size?: number
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
      }
      insert_artist: {
        Args: {
          artist_slug: string
          artist_name: string
          artist_info?: string
        }
        Returns: {
          info: string | null
          name: string
          slug: string
        }
      }
      insert_game: {
        Args: {
          game_slug: string
          game_title: string
          game_info?: string
        }
        Returns: {
          info: string | null
          slug: string
          title: string
        }
      }
      insert_track: {
        Args: {
          track_slug: string
          track_title: string
          track_tags: string[]
          track_artists: string[]
          track_game: string
          track_file: string
          track_length: number
          track_info: string
        }
        Returns: {
          artists: string[] | null
          banned: boolean | null
          file: string | null
          game_slug: string | null
          game_title: string | null
          info: string | null
          length: number | null
          slug: string | null
          tags: string[] | null
          title: string | null
        }[]
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
