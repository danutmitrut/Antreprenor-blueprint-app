import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Simple health check endpoint to keep Supabase active
// This endpoint will be pinged periodically by UptimeRobot/Cron-job.org
export async function GET() {
  try {
    // Check if Supabase env vars are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Supabase not configured',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    // Simple query to keep database active
    // Just count rows in users table (or any table that exists)
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })

    if (error) {
      // If users table doesn't exist, try rate_limits table
      const { error: altError } = await supabase
        .from('rate_limits')
        .select('count', { count: 'exact', head: true })

      if (altError) {
        return NextResponse.json(
          {
            status: 'error',
            message: 'Database query failed',
            error: altError.message,
            timestamp: new Date().toISOString()
          },
          { status: 500 }
        )
      }
    }

    // Success response
    return NextResponse.json({
      status: 'ok',
      message: 'Supabase is active',
      timestamp: new Date().toISOString(),
      database: 'connected'
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
