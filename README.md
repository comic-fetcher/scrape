## Housekeeping

[![CircleCI](https://circleci.com/gh/comic-fetcher/scrape.svg?style=svg)](https://circleci.com/gh/comic-fetcher/scrape)
[![codecov](https://codecov.io/gh/comic-fetcher/scrape/branch/develop/graph/badge.svg)](https://codecov.io/gh/comic-fetcher/scrape)

## Setup

### Snapshot

```bash
curl https://comic-walker.com/contents/calendar/ > src/comicwalker/snapshot/calendar.html
```

### Environment Variables

See `.env.example`. All envirnment variables for TypeORM must be prefixed `CF_`

```env
CF_TYPEORM_CONNECTION="mysql"
CF_TYPEORM_HOST="localhost"
CF_TYPEORM_PORT=3306
CF_TYPEORM_USERNAME="test"
CF_TYPEORM_PASSWORD="test"
CF_TYPEORM_DATABASE="db"
```

https://typeorm.io/#/using-ormconfig/which-configuration-file-is-used-by-typeorm
