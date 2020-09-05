## Writer

This is my first full-stack website and my first MERN stack website. Users create accounts on the site and write posts on the subjects they're interested in.

#### Required Environment Variables

```
mongoURI
jwtSecret
```
`mongoURI` is the URI string needed to connect to [MongoDB](https://www.mongodb.com/). `jwtSecret` is a string needed to generate [JSON Web Tokens](https://jwt.io/).

#### Installation (Mac)

```
git clone https://github.com/SirIsaacNeutron/writer
cd writer/client
npm install
cd ..
npm install
```

#### Running (Mac)
```npm run dev```

Make sure you're in the `writer` directory (**not** the `client` directory within `writer`) and that the required environment variables are defined before running the above command.