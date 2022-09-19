## Bookmarks

### Modules

1. bookmarks_database
2. bookmarks_frontend
3. bookmarks_backend

### Running

```bash
make start
```

NOTE: On Windows it requires administrative access


### Troubleshooting

Sometimes Docker under Windows can complain about busy port. In order to resolve that issue, do the following (in administrative console):

```bash
net stop winnat
net start winnat
```