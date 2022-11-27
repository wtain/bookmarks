## Bookmarks

### Modules

1. bookmarks_database
2. bookmarks_frontend
3. bookmarks_server


### Setup

Modules ``bookmarks_server``and ``bookmarks_frontend``require Typescript. 
Runn following commands in those modules' directories.

```bash
npm install typescript --save-dev
```

Add following to ``/etc/hosts``:

```
host.docker.internal 127.0.0.1
```

For server it is also necessary to install Nodemon:

```bash
npm install nodemon
npm install -g ts-node@latest
```


That helped last time:
```bash
npm install ts-node-dev@latest ts-node@latest
```

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