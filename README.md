# exblog

## Letöltés

```cmd
git clone https://github.com/oktat/exblog.git
cd exblog
```

## Beállított REST API URL-ek

Az app.js fájlban két URL érhető el. Egy helyben egy a typecode.com webhelyen.

A jsonplaceholder.typecode.com eléréshez írjon 0-át a [ ] közzé:

```javascript
    url: [
        'https://jsonplaceholder.typicode.com/posts',
        'http://localhost:8000/posts'
    ][0],
```

A helyi json-server eléréshez írjon 1-et a [ ] közzé:

```javascript
    url: [
        'https://jsonplaceholder.typicode.com/posts',
        'http://localhost:8000/posts'
    ][1],
```

### Függőségek telepítése

A helyi REST API json-server és a helyi fejlesztői HTTP szerver használatához telepítse a függőségeket:

```cmd
npm install
```

### A helyi hai-server indítása

```cmd
npm run api
```

### A helyi fejlesztői HTTP szerver indítása

```cmd
npm start
```
