/**
 * Seed script to create initial super admin user
 * Run with: npx tsx scripts/seed-super-admin.ts
 */

import dotenv from 'dotenv'
import path from 'path'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function seedSuperAdmin() {
  console.log('🌱 Seeding super admin user...')

  const email = process.env.SUPER_ADMIN_EMAIL || 'superadmin@pos-system.com'
  const password = process.env.SUPER_ADMIN_PASSWORD || 'ChangeMe123!'

  if (!password || password.length < 12) {
    console.error('❌ Password must be at least 12 characters long')
    process.exit(1)
  }

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 12)

    // Check if super admin already exists
    const { data: existingAdmin } = await supabase
      .from('super_admins')
      .select('id')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      console.log('⚠️  Super admin already exists. Updating password...')
      
      const { error: updateError } = await supabase
        .from('super_admins')
        .update({
          password_hash: passwordHash,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)

      if (updateError) {
        console.error('❌ Failed to update super admin:', updateError)
        process.exit(1)
      }

      console.log('✅ Super admin password updated successfully')
    } else {
      // Create new super admin
      const { error: insertError } = await supabase
        .from('super_admins')
        .insert({
          email,
          password_hash: passwordHash,
          is_active: true,
          failed_login_attempts: 0
        })

      if (insertError) {
        console.error('❌ Failed to create super admin:', insertError)
        process.exit(1)
      }

      console.log('✅ Super admin created successfully')
    }

    console.log('\n📋 Super Admin Credentials:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${password}`)
    console.log('\n⚠️  Please store these credentials securely and change the password in production!')

    // Log the seeding action
    await supabase.rpc('log_admin_action', {
      p_admin_id: null,
      p_action: 'SEED_SUPER_ADMIN',
      p_resource: 'super_admin',
      p_details: { email },
      p_ip_address: 'localhost',
      p_user_agent: 'seed-script',
      p_success: true
    })

    console.log('✅ Audit log created')

  } catch (error) {
    console.error('❌ Error seeding super admin:', error)
    process.exit(1)
  }
}

seedSuperAdmin()
