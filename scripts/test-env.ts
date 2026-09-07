import 'dotenv/config'

console.log('Testing environment variable loading...')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing')
console.log('SUPER_ADMIN_EMAIL:', process.env.SUPER_ADMIN_EMAIL ? '✅ Set' : '❌ Missing')
console.log('SUPER_ADMIN_PASSWORD:', process.env.SUPER_ADMIN_PASSWORD ? '✅ Set' : '❌ Missing')
