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
