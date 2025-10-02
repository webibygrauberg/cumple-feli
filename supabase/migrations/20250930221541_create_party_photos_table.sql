/*
  # Create party photos table for guest uploads

  1. New Tables
    - `party_photos`
      - `id` (uuid, primary key) - Unique identifier for each photo
      - `guest_name` (text) - Name of the guest who uploaded the photo
      - `photo_url` (text) - URL of the uploaded photo
      - `caption` (text, optional) - Optional caption for the photo
      - `created_at` (timestamptz) - When the photo was uploaded

  2. Security
    - Enable RLS on `party_photos` table
    - Add policy for anyone to upload photos (public party)
    - Add policy for anyone to view photos

  3. Storage
    - Create a public storage bucket for party photos
*/

CREATE TABLE IF NOT EXISTS party_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  photo_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE party_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upload party photos"
  ON party_photos
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view party photos"
  ON party_photos
  FOR SELECT
  TO anon
  USING (true);

-- Create storage bucket for party photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('party-photos', 'party-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload photos
CREATE POLICY "Anyone can upload party photos to storage"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'party-photos');

-- Allow anyone to read photos
CREATE POLICY "Anyone can view party photos in storage"
  ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'party-photos');