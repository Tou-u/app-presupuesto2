import fetch from 'node-fetch'

export async function handler() {
  await fetch('https://d3224yb3f2wh9l.cloudfront.net/api/health')
  console.log('--- cron job ---')
}
