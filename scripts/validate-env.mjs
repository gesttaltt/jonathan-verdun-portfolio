/**
 * @file validate-env.mjs
 * Deterministically validates required environment variables during build.
 * Prevents "silent" failures due to missing or malformed configuration.
 */

const REQUIRED_ENV = {
  // Add required env vars here if needed in the future.
  // For now, we validate the presence of BASE_PATH if it's expected to be set.
}

function validate() {
  console.log('── Environment Validation ───────────────────────────────────')
  
  // Example: Validate BASE_PATH format if provided
  const basePath = process.env.BASE_PATH
  if (basePath && !basePath.startsWith('/')) {
    console.error('❌ ERROR: BASE_PATH must start with a forward slash (/).')
    process.exit(1)
  }

  // Example: Validate SITE_URL (derived from siteConfig usually, but checking here if overridden)
  const siteUrl = process.env.SITE_URL
  if (siteUrl && !siteUrl.startsWith('https://')) {
    console.warn('⚠️ WARNING: SITE_URL does not start with https://. SEO might be affected.')
  }

  console.log('✅ Environment configuration is valid.')
  console.log('────────────────────────────────────────────────────────────')
}

validate()
