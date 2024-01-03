import type { SSTConfig } from 'sst'
import { Cron, SvelteKitSite } from 'sst/constructs'

export default {
  config() {
    return {
      name: 'app-presupuesto',
      region: 'us-east-1'
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new SvelteKitSite(stack, 'site')
      stack.addOutputs({
        url: site.url
      })
      new Cron(stack, 'cron', {
        schedule: 'rate(1 day)',
        job: {
          function: {
            handler: 'src/routes/api/health/server.GET'
          }
        }
      })
    })
  }
} satisfies SSTConfig
