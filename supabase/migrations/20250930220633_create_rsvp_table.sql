/*
  # Create RSVP table for birthday invitation

  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key) - Unique identifier for each RSVP
      - `guest_name` (text) - Name of the guest
      - `will_attend` (boolean) - Whether the guest will attend
      - `created_at` (timestamptz) - When the RSVP was submitted
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `rsvps` table
    - Add policy for anyone to insert RSVPs (public event)
    - Add policy for anyone to view RSVPs
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  will_attend boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view RSVPs"
  ON rsvps
  FOR SELECT
  TO anon
  USING (true);