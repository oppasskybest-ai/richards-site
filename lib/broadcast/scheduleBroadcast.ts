import { supabaseAdmin } from '@/lib/supabase/server'

export type BroadcastSourceType = 'book' | 'article' | 'event'
export type PreferenceColumn = 'wants_book_updates' | 'wants_article_updates' | 'wants_event_updates'

export const DEFAULT_DELAY_MINUTES = 30
export const MIN_DELAY_MINUTES = 5
export const MAX_DELAY_MINUTES = 7 * 24 * 60 // 7 days

export function clampDelayMinutes(minutes: unknown): number {
  const n = Number(minutes)
  if (!Number.isFinite(n)) return DEFAULT_DELAY_MINUTES
  return Math.min(MAX_DELAY_MINUTES, Math.max(MIN_DELAY_MINUTES, Math.round(n)))
}

/**
 * Queues an auto-broadcast for a newly-created (or newly-published) book,
 * article, or event. Idempotent per source: if a scheduled_broadcasts row
 * already exists for this exact source (pending, sent, or cancelled), this
 * does nothing — prevents duplicate notifications if a post is edited
 * multiple times after its first publish.
 */
export async function scheduleAutoBroadcast(opts: {
  sourceType: BroadcastSourceType
  sourceId: string
  subject: string
  body: string
  preferenceColumn: PreferenceColumn
  delayMinutes?: number
}) {
  const { sourceType, sourceId, subject, body, preferenceColumn } = opts
  const delayMinutes = clampDelayMinutes(opts.delayMinutes ?? DEFAULT_DELAY_MINUTES)

  const { data: existing } = await supabaseAdmin
    .from('scheduled_broadcasts')
    .select('id')
    .eq('source_type', sourceType)
    .eq('source_id', sourceId)
    .maybeSingle()

  if (existing) return // already scheduled/sent/cancelled once for this source — don't duplicate

  const scheduledFor = new Date(Date.now() + delayMinutes * 60_000).toISOString()

  await supabaseAdmin.from('scheduled_broadcasts').insert({
    source_type: sourceType,
    source_id: sourceId,
    subject,
    body,
    preference_column: preferenceColumn,
    scheduled_for: scheduledFor,
    status: 'pending',
  })
}

/**
 * Cancels a pending auto-broadcast for a given source — used when the
 * underlying book/article/event is deleted, or an article is unpublished,
 * before its delay elapses. No-op if nothing pending exists (already sent
 * or already cancelled).
 */
export async function cancelScheduledBroadcast(sourceType: BroadcastSourceType, sourceId: string) {
  await supabaseAdmin
    .from('scheduled_broadcasts')
    .update({ status: 'cancelled' })
    .eq('source_type', sourceType)
    .eq('source_id', sourceId)
    .eq('status', 'pending')
}
