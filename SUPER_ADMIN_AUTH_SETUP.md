# Super Admin Authentication Setup Guide

## Overview
A secure super admin authentication system has been implemented with the following features:

### Security Features Implemented
- ✅ Server-side password verification with bcrypt hashing
- ✅ Rate limiting (5 attempts per 15 minutes per IP)
- ✅ Account lockout after 5 failed attempts (15 minute lockout)
- ✅ httpOnly, secure cookies for session management
- ✅ Session timeout (30 minutes)
- ✅ Audit logging for all admin actions
- ✅ Middleware protection for admin routes
- ✅ Removed hardcoded credentials from client-side code

## Files Created/Modified

### Database Migrations
- `supabase/migrations/004_super_admins.sql` - Super admins table with security fields
- `supabase/migrations/005_audit_logs.sql` - Audit logs table for tracking actions

### API Routes
- `app/api/auth/super-admin/login/route.ts` - Secure login endpoint
- `app/api/auth/super-admin/logout/route.ts` - Logout endpoint
- `app/api/auth/super-admin/validate/route.ts` - Session validation endpoint

### Middleware
- `middleware.ts` - Route protection for `/admin/*` paths

### Client-Side Updates
- `lib/auth.ts` - Updated to use API routes instead of localStorage
- `app/(auth)/super-admin-login/page.tsx` - Updated to call secure API
- `components/admin/layout/admin-sidebar.tsx` - Updated logout function

### Utilities
- `scripts/seed-super-admin.ts` - Script to create initial super admin
- `.env.example` - Environment variables template

## Setup Instructions

### 1. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (from dashboard)
- `SUPER_ADMIN_EMAIL` - Email for super admin account
- `SUPER_ADMIN_PASSWORD` - Strong password (min 12 characters)

### 2. Run Database Migrations

Apply the migrations to your Supabase database:

```bash
# Using Supabase CLI (recommended)
supabase db push

# Or manually run the SQL files in Supabase Dashboard
# 1. Go to Supabase Dashboard > SQL Editor
# 2. Run supabase/migrations/004_super_admins.sql
# 3. Run supabase/migrations/005_audit_logs.sql
```

### 3. Seed Initial Super Admin

Run the seed script to create the initial super admin user:

```bash
npx tsx scripts/seed-super-admin.ts
```

This will:
- Hash the password using bcrypt
- Create/update the super admin in the database
- Log the seeding action in audit logs
- Display the credentials (save them securely!)

### 4. Test the Implementation

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/super-admin-login`

3. Login with the credentials from the seed script

4. Verify you're redirected to `/admin/dashboard`

5. Try accessing admin routes without logging in (should redirect to login)

## Security Best Practices

### Production Deployment
- Use strong, unique passwords
- Enable HTTPS
- Set `NODE_ENV=production`
- Use environment-specific secrets
- Implement IP whitelisting if possible
- Consider adding MFA (TOTP) for additional security

### Password Requirements
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and special characters
- Change default password immediately after first login

### Session Management
- Sessions expire after 30 minutes of inactivity
- Cookies are httpOnly and secure in production
- Session tokens are validated on every admin request

### Audit Logging
All admin actions are logged including:
- Login attempts (success/failure)
- Logout
- Account changes
- IP addresses and user agents
- Timestamps

## API Endpoints

### POST `/api/auth/super-admin/login`
Authenticates super admin credentials.

**Request:**
```json
{
  "email": "superadmin@pos-system.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": "uuid",
    "email": "superadmin@pos-system.com",
    "role": "super_admin"
  }
}
```

### POST `/api/auth/super-admin/logout`
Logs out the current super admin.

**Response:**
```json
{
  "success": true
}
```

### GET `/api/auth/super-admin/validate`
Validates the current session.

**Response:**
```json
{
  "valid": true,
  "admin": {
    "id": "uuid",
    "email": "superadmin@pos-system.com",
    "role": "super_admin"
  }
}
```

## Troubleshooting

### Login Fails
- Check database migrations were applied
- Verify super admin exists in database
- Check Supabase connection credentials
- Review rate limiting (wait 15 minutes if locked out)

### Middleware Redirects to Login
- Check if session cookie is set
- Verify cookie is not expired
- Check browser console for errors

### Seed Script Fails
- Verify environment variables are set
- Check Supabase service role key permissions
- Ensure database migrations are applied

## Next Steps (Optional Enhancements)

1. **JWT Implementation**: Replace base64 tokens with proper JWT
2. **MFA Support**: Add TOTP-based two-factor authentication
3. **Redis Rate Limiting**: Use Redis for distributed rate limiting
4. **IP Whitelisting**: Restrict admin access to specific IPs
5. **Email Notifications**: Send alerts for suspicious activity
6. **Password Reset**: Implement secure password reset flow
7. **Session Management UI**: Allow admins to view/revoke sessions
8. **Role-Based Permissions**: Implement granular permissions system

## Migration from Old System

The old localStorage-based authentication has been deprecated but kept for backward compatibility. Legacy functions will log warnings but will not function. Update any code using:
- `validateSuperAdmin()` → `loginSuperAdmin()`
- `setSuperAdminSession()` → (handled by API)
- `getSuperAdminSession()` → `validateSuperAdminSession()`
- `isSuperAdminLoggedIn()` → `validateSuperAdminSession()`
- `clearSuperAdminSession()` → `logoutSuperAdmin()`
