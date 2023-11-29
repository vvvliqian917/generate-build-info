#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const cwd = process.cwd();

const { execSync } = child_process;
const { writeFileSync } = fs;
const { resolve } = path;
// 读取package.json
const packageJsonPath = resolve(cwd, "./package.json");
const packageJson = require(packageJsonPath);

// 获取命令行参数 --dir=dist --name=xxx
type TGetParams = {
  dir: string;
  [key: string]: string | undefined;
};
function getParams(): TGetParams {
  const argv = process.argv.slice(2);
  const argvObj = argv.reduce((prev, cur) => {
    const [key, value] = cur.split("=");
    prev[key.replace("--", "")] = value;
    return prev;
  }, {} as TGetParams);
  return argvObj;
}

function getGitCommit() {
  try {
    const commit = execSync(
      'git log -5 --oneline --pretty=format:"%h/n%s/n%cn/n%cd"'
    )
      .toString()
      .trim();
    const arr: string[] = commit.split("\n");
    const commitArr = arr.map((item) => {
      const [commitId, commitMessage, commitName, commitTime] =
        item.split("/n");
      return {
        commitId,
        commitMessage,
        commitName,
        commitTime,
      };
    });
    return commitArr;
  } catch (e) {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "warning: can't get git commit info, please init git first!"
    );
    return null;
  }
}
function getCurrentBranch() {
  try {
    const branch = execSync("git symbolic-ref --short -q HEAD")
      .toString()
      .trim();
    return branch;
  } catch (e) {
    console.warn(
      "\x1b[33m%s\x1b[0m",
      "warning: can't get git branch, please init git first!"
    );
    return null;
  }
}

function prepareOutputInfo() {
  // 获取当前时间
  const now = new Date();
  const nowTime = now.toLocaleString();

  // 获取当前分支
  const branch = getCurrentBranch();
  // 获取最近五次commit信息,包含commit id 和 commit message
  const commit = getGitCommit();
  // 获取使用的script 命令
  const script = process.env.npm_lifecycle_event;

  // 生成json
  const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    script,
    buildTime: nowTime,
    git: {
      branch,
      commit,
    },
  };
  return buildInfo;
}

function generateJsonFile() {
  const { dir } = getParams();
  const dirPath = resolve(cwd, dir || "");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const buildInfoPath = resolve(dirPath, "./buildInfo.json");
  writeFileSync(buildInfoPath, JSON.stringify(prepareOutputInfo(), null, 2));
  // 打印绿色的log 提示生成 success
  console.log("\x1b[32m%s\x1b[0m", "---generate buildInfo.json success!");
}
generateJsonFile();
