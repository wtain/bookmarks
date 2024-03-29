## Bookmarks

### Modules

1. bookmarks_database
2. bookmarks_frontend
3. bookmarks_server

Checkout modules

```bash
git submodule add git@github.com:wtain/bookmarks_server.git
git submodule add git@github.com:wtain/bookmarks_database.git
git submodule add git@github.com:wtain/bookmarks_frontend.git
```


### Setup

Modules ``bookmarks_server``and ``bookmarks_frontend``require Typescript. 
Run following commands in those modules' directories.

```bash
cd bookmarks_frontend
npm install typescript --save-dev
```

Add following to ``/etc/hosts``:

```
host.docker.internal 127.0.0.1
```

For server it is also necessary to install Nodemon:

```bash
cd bookmarks_server
npm install nodemon --save
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