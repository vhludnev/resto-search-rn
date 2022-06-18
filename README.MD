## Restaurant Search mobile app

- React Native (v.0.68),
- Expo (sdk v.45),
- Yelp api,
- Context API,
- Adaptive styles (for portrait and landscape views),
- Android and IOS friendly,


<br/><br/>

## Installation & deploy

The app requires [Node.js](https://nodejs.org/) v16+ and expo sli to run.

Install the dependencies and devDependencies first. _Example:_

```sh
npm i
npm i -g expo-cli
expo init `App project name`
expo login
expo publish
expo build:android -t apk `or` expo build:android -t app-bundle (*)
expo fetch:android:keystore (*)
expo upload:android (*)
expo build:ios (**)
expo upload:ios (**)

```

(*) - _for android_
<br/>
(**) - _for ios_ -->