## Node

Node en modo Fork

```bash
node start index.js
```

Node en modo Cluster

```bash
node index.js -m cluster
```

## Forever

Forever en Fork sin watch
```bash
forever start index.js
```

Forver con Watch
```bash
forever -w start index.js
```

Forever en modo cluster 
```bash
forever start index.js -m cluster
```

## PM2

PM2 en modo Fork
```bash
pm2 start index.js --name="Fork"
```
PM2 en modo Fork con watch
```bash
pm2 start index.js --name="Fork2" --watch ```

PM2 en modo Cluster
```bash
pm2 start index.js -i <numero de instancias>
```

PM2 en otro puerto
```bash
pm2 start index.js --name="Fork" -- --port=8081
```