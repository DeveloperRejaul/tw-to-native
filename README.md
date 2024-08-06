# TailwindToNativeStyle

A utility library to convert Tailwind CSS classes to React Native stylesheets.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install the library, use npm or yarn:

```sh
npm install tw-to-native
# or
yarn add tw-to-native
```

## Usage

```javascript
import {native} 'tw-to-native';

(async()=>{
    await native.init();
    native.generate('profile-profile.ts: flex flex-1 justify-center items-center');
})()

```
