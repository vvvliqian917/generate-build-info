### 安装

```
yarn add  @vvvliqian/generate-build-info
```

### Usage
use in package.json
```
 "scripts": { 
   "build": "vite build & generate-build-info --dir=dist",
   "generate":"generate-build-info"
 }
```
use in commmand line
```
   npx generate-build-info
```

it will generate a json file, file content as follow

```
{
  "name": "vite-project",
  "version": "0.0.0",
  "buildTime": "11/28/2023, 10:04:45 AM",
  "git": {
    "branch": "dev",
    "script": "build",
    "commit": [
      {
        "commitId": "2eff788",
        "commitMessage": "feat: tree",
        "commitName": "xxxx",
        "commitTime": "Sun Aug 27 20:02:46 2023 +0800"
      },
      {
        "commitId": "5350a39",
        "commitMessage": "feat: dd1",
        "commitName": "xxxx",
        "commitTime": "Sat Aug 26 16:24:46 2023 +0800"
      },
      {
        "commitId": "6c58273",
        "commitMessage": "feat: ui",
        "commitName": "xxxxx",
        "commitTime": "Mon Aug 8 14:15:46 2022 +0800"
      },
      {
        "commitId": "28b6b45",
        "commitMessage": "feat:test",
        "commitName": "xxxx",
        "commitTime": "Thu Jul 21 16:23:19 2022 +0800"
      },
      {
        "commitId": "4a17316",
        "commitMessage": "init",
        "commitName": "xxxxx",
        "commitTime": "Thu Apr 7 20:48:26 2022 +0800"
      }
    ]
  },
  
}

```

This module will help you check
1. whether the build command executed is correct
2. whether the branch used for build is correct
3. build time
4. this last 5 git commits information

### parameter

| name | description | required               |defaultValue
| ---- | -------- | -------------------- |-------------------|
| dir  | output derectory    |fasle | current working directory of the Node.js process |

