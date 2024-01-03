export async function handler() {
  await fetch('/api/health')
  console.log('--- cron job ---')
}
